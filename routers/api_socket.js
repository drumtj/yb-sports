const {v4:uuidv4} = require('uuid');

module.exports = MD=>{
  let {
    argv,
    io,
    redisClient,
    mongoose,
    sendDataToMain,
    sendDataToBg,
    sendDataToBet365,
    emitToMember,
    emitToAdmin,
    emitToProgram,
    emitToProgramPromise,
    socketResolveList,
    config,
    comma,
    router,
    User,
    Program,
    Browser,
    Log,
    Account,
    Option,
    Approval,
    Event,
    DepositLog,
    authAdmin,
    authMaster,
    task,
    deposit,
    approvalTask,
    refreshMoney,
    updateBet365Money,
    updateBet365TotalMoney,
    MoneyManager
  } = MD;

  // let chekerSocket;
  // let chekerBid;

  io.on('connection', socket=>{
    console.log("socket connected", socket.id);
    // console.log("socket clients", io.sockets.sockets.keys());
    console.log("socket clients count", io.engine.clientsCount);


    // console.log(io);
    // console.log("socket session", socket.handshake.session);

    function emit(...rest){
      let ctx = io.to(socket._email);
      if(socket._remoteEmail){
        ctx = ctx.to(socket._remoteEmail);
      }
      ctx.emit.apply(ctx, rest);
    }

    socket.on("init", async data=>{
      console.log("init", data);
      let session = socket.handshake.session;
      let email;
      if(!session.user && data.link !== "__program__"){
        console.log("no have session. disconnect socket", socket.id);
        socket.disconnect(true);
        return;
      }

      // console.log("SOCKET SESSION", session);
      session.socketId = socket.id;

      if(session.user){
        email = session.user.email;
      }else{
        let user = await User.findOne({programs:{$in:[data.pid]}});
        if(!user){
          console.error("프로그램 연결중 pid를 가진 user를 찾지못함.");
          emit("email", null);
          return;
        }
        email = user.email;
        // email = data.email;
        // let user = await User.findOne({email:email});//.select(["email", "allowed", "authority", "master"]);
        session = {
          user: user,
          admin: !!user.authority || user.master,
          onlyadmin: !!user.authority && !user.master,
          master: user.master
        }
      }



      if(email){
        socket._email = email;
        // await io.$.join(email, socket, true);
        // await io.$.join(session.user._id, socket, true);

        socket.join(email);
        socket.join(session.user._id);

        // console.error("socket session", session);
        if(session.admin && data.link !== "__program__"){
          // console.log("@@ join socket admin group");
          // await io.$.join('admin', socket);
          socket.join('admin');
          if(session.onlyadmin){
            socket.join('onlyadmin');
            // await io.$.join('onlyadmin', socket);
          }
          if(session.master){
            socket.join('master');
            // await io.$.join('master', socket);
          }
        }else if(data.link == "__program__"){
          socket.join("__program__");
          // await io.$.join('__program__', socket);
          // console.error("####", await io.$.list('__program__'));
          socket.emit("email", email);
          // console.error("program connected", data);
          // console.error("@!@!@!", socket.id, io.to(socket.id).sockets.sockets.get(socket.id) === socket);
          if(Array.isArray(data.groups)){
            data.groups.forEach(group=>{
              socket.join(group);
              // io.$.join(group, socket);
            })
          }
        }

        // console.error("###", email, await io.$.list('admin'), socket.id);
        // socket.join([email, data.pageCode]);
      }else{
        console.error("socket init no email");
        return;
      }

      function emitToDashboard(...args){
        let context = io.to(email + "/dashboard");
        context.emit.apply(context, args);

        // io.$.emit(email + "/dashboard", ...args);
      }

      function emitToDashboardPromise(...args){
        let context = io.to(email + "/dashboard");
        let uuid = uuidv4();
        args.push(uuid);
        context.emit.apply(context, args);

        // io.$.emit(email + "/dashboard", ...args);
        return new Promise(resolve=>{
          socketResolveList[uuid] = resolve;
        })
      }

      function emitToPrograms(...args){
        let context = io.to(email + "__program__");
        context.emit.apply(context, args);

        // io.$.emit(email + "__program__", ...args);
      }

      function emitToAllPrograms(...args){
        let context = io.to("__program__");
        context.emit.apply(context, args);

        // io.$.emit("__program__", ...args);
      }

      function emitPromise(com, data){
        let uuid = uuidv4();
        emit(com, data, uuid);
        return new Promise(resolve=>{
          socketResolveList[uuid] = resolve;
        })
      }

      socket.join(email+data.link);
      // await io.$.join(email + data.link, socket);


      if(session.admin){
        // console.error("@@ listen adminDelivery")
        socket.on("adminDelivery", obj=>{
          console.log("adminDelivery", obj);
          // let {com, data} = obj;
          // console.log(`delivery`, data);
          // io.to(pid).emit(data.com, data.data);
          emitToAdmin(obj.com, obj.data);
        })
      }

      socket.on("resolve", (data, uuid)=>{
        if(socketResolveList[uuid]){
          socketResolveList[uuid](data);
          delete socketResolveList[uuid];
        }
      })

      socket.on("memberDelivery", obj=>{
        console.log("memberDelivery", obj);
        emitToMember(obj.email, obj.com, obj.data);
      })


      if(data.link == "__program__"){
        console.log("program socket init");
        socket._pid = data.pid;
        // programSockets[data.pid] = socket;
        socket.join(data.pid);
        // await io.$.join(data.pid, socket, true);

        setTimeout(async ()=>{
          // console.error("####", await io.$.list(data.pid));
          emitToDashboard("connectedProgram", data.pid);
        }, 100)

        socket.on("joinChecker", async (bid)=>{
          // console.log("@@@has chekerSocket", !!chekerSocket)
          console.log("##joinChecker");
          socket.join("__checker__");

          // if(chekerSocket == socket){
          //   if(chekerBid !== bid){
          //     chekerSocket.emit("closeBrowser", chekerBid);
          //     console.log("prev cheker close");
          //   }
          //   chekerBid = bid;
          // }else{
          //   if(chekerSocket){
          //     chekerSocket.leave("__checker__");
          //     // await io.$.leave("__checker__", chekerSocket);
          //     chekerSocket.emit("closeBrowser", chekerBid);
          //     console.log("prev cheker close");
          //   }
          //   socket.join("__checker__");
          //   // await io.$.join("__checker__", socket);
          //   chekerSocket = socket;
          //   chekerBid = bid;
          // }
        })

        socket.on("joinDataReceiver", abid=>{
          console.log("####joinDataReceiver");
          socket.join("__data_receiver__");
          // io.$.join("__data_receiver__", socket);
        })

        socket.on("joinDataReceiver2", bid=>{
          console.log("####joinDataReceiver2");
          socket.join("__data_receiver2__");
          // io.$.join("__data_receiver2__", socket);
        })

        socket.on("leaveDataReceiver", bid=>{
          console.log("####leaveDataReceiver");
          socket.leave("__data_receiver__");
          // io.$.leave("__data_receiver__", socket);
        })

        socket.on("leaveDataReceiver2", bid=>{
          console.log("####leaveDataReceiver2");
          socket.leave("__data_receiver2__");
          // io.$.leave("__data_receiver2__", socket);
        })

        socket.on("log", async (data, bid)=>{
          emitToDashboard("log", data, socket._pid, bid);
          // io.to(email + "/dashboard").emit("log", data, socket._pid, bid);



          // let browser = await Browser.findOne({_id:bid}).select("logs");
          // if(browser){
          //   await browser.log(data);
          // }

          let browser = await Browser.findOne({_id:bid})
          .populate({
            path: "account",
            model: Account,
            options: {
              select: "id"
            }
          }).lean();

          if(!browser){
            console.error("log기록중, browser를 못찾음", bid);
            return;
          }

          let c_log;
          if(data.isSame){
            c_log = await Log.findOne({browser: bid}).sort({$natural:-1});//{'created_at' : -1 });
            // c_log = await Log.find({browser: bid, bet365Id: browser.account?browser.account.id:"unknown"}).limit(1).sort({$natural:-1});
            // c_log = c_log[0];
            c_log.data = data;
            await c_log.save();
          }

          if(!c_log){
            c_log = await Log.create({
              browser: bid,
              bet365Id: browser.account?browser.account.id:"unknown",
              data: data
            });
          }
        })

        socket.on("delivery", async (obj, bid, uuid)=>{
          // let {com, data, bid} = obj;
          let {com, data} = obj;
          // console.log(`delivery ${event}`, data);
          // io.to(email + ":dashboard").emit(com, data, socket._pid, bid);
          if(uuid){
            let r = await emitToDashboardPromise(com, data, socket._pid, bid);
            emit("resolve", r, uuid);
          }else{
            emitToDashboard(com, data, socket._pid, bid);
          }
        })

        // 유저가 배팅한 게임정보를 기록해야 한다.
        // socket.on("betData", obj=>{
        //   obj.user = session.user._id;
        //   // console.log("receive betData", obj);
        //   BetData.create(obj);
        // })

        socket.on("inputGameUrl", obj=>{
          console.log("inputGameUrl");
          let room = "__data_receiver2__";
          // console.log(io.sockets.clients(room));
          io.to(room).emit("gameurl", obj);
        })

        //정재된 매칭 게임데이터
        socket.on("inputGameData", async obj=>{
          //if(argv[0] == "master"){
          console.log("inputGameData");
          // let event;
          // try{
          //   event = await Event.create(obj);
          // }catch(e){
          //   console.error("이벤트 저장 오류");
          //   console.error(e);
          // }
          //
          // if(event){
          //   io.to("__data_receiver2__").emit("gamedata2", event);
          // }

          if(typeof obj.pitcher1MustStart === "string"){
            obj.pitcher1MustStart = obj.pitcher1MustStart.toLowerCase() == "true";
          }
          if(typeof obj.pitcher2MustStart === "string"){
            obj.pitcher2MustStart = obj.pitcher2MustStart.toLowerCase() == "true";
          }
          if(typeof obj.isLive === "string"){
            obj.isLive = obj.isLive.toLowerCase() == "true";
          }



          await Event.create(obj);
          // .catch(e=>{
          //   console.error("이벤트 저장 오류");
          //   console.error(e);
          // })

          let room = "__data_receiver2__";
          // console.log(io.sockets.clients(room));
          io.to(room).emit("gamedata2", obj);
          // io.$.emit(room, "gamedata2", obj);

          // emitToAllPrograms("gamedata2", obj);
          // try{
            // Event.create({
            //   peId: obj.pinnacle.id,
            //   beId: obj.bet365.id,
            //   matchId: obj.pinnacle.id + ':' + obj.bet365.id,
            //   data: obj
            // })

          // }catch(e){
          //   console.error("이벤트 저장 오류");
          //   console.error(e);
          // }
        })

        socket.on("disconnect", async ()=>{
          console.log("disconnect program socket", socket._pid);

          socket.leave("__checker__");

          // if(chekerSocket === socket){
          //   chekerSocket.leave("__checker__");
          //   // await io.$.leave("__checker__", chekerSocket);
          //   chekerSocket = null;
          //   chekerBid = null;
          // }
          // io.to(email+':dashboard').emit("receiveLivingBrowsers", {pid:socket._pid, bids:[]});
          emitToDashboard("receiveLivingBrowsers", {
            pid:socket._pid,
            exit: true,
            browsers: null
          });
        })



        // from extension bg
        // let updateMoneyCallTimes = redisClient.get('updateMoneyCallTimes');

        socket.on("updateMoney", async (money, bid)=>{
          let updateMoneyCallTimes = redisClient.get('updateMoneyCallTimes')||{};
          // console.log("@@@@@11updateMoney", money);
          // extension으로 부터 호출되기 때문에.
          // 잘못된 코드로 반복호출되는 상황을 고려하여 안전장치를 둠.
          // 각 브라우져별로 1초 이내에 재호출된 머니갱신 신호는 무시함.
          // (벳삼머니가 갱신되는것은 한 경기를 깐뒤일거니까, 1초도 짦게설정한거다.)
          if(updateMoneyCallTimes[bid] === undefined){
            updateMoneyCallTimes[bid] = 0;
          }
          let t = Date.now();
          if(t - updateMoneyCallTimes[bid] < 1000){
            return;
          }
          updateMoneyCallTimes[bid] = t;
          redisClient.set('updateMoneyCallTimes', updateMoneyCallTimes);
          // console.log("@@@@@22updateMoney", money);
          // let account = await Account.findOne({browser:bid, trash:false, removed:false})
          // console.log("updateMoney", money, bid);
          let browser = await Browser.findOne({_id:bid, account:{$ne:null}})
          // .select("-logs")
          .populate([
            {
              path: "account",
              model: Account
            }
            // {
            //   path: "user",
            //   model: User
            // }
          ]);

          if(browser){
            // browser.account.money = money;
            // await browser.account.save();

            // console.log("@@@@1", browser.account.id);
            // console.log("@@@@2", browser.user.email);

            await updateBet365Money(browser.account, money, true);
            await updateBet365TotalMoney(browser.user, true);
          }
        })
      }else{
        /////////////////////////////////////////////////////////////
        //////////////////////// site socket events /////////////////
        /////////////////////////////////////////////////////////////

        // socket.on("bet365InitData", data=>{
        //   let {money, limited} = data;
        //   console.log("bet365InitData", data);
        // })

        socket.on("remoteDashboardLogin", email=>{
          if(!socket._remoteKeyList) socket._remoteKeyList = [];
          socket._remoteKeyList.forEach(key=>{
            socket.leave(key);
          })
          socket._remoteKeyList = [];
          socket._remoteEmail = "";

          if(email){
            socket._remoteKeyList = [
              email,
              email + "/dashboard"
            ]
            socket._remoteKeyList.forEach(key=>{
              socket.join(key);
            })
          }
          socket._remoteEmail = email;
        })

        socket.on("updateBet365MoneyFromSite", async ({money, aid, uid})=>{
          // let account = await Account.findOne({_id:aid}).select(["user"]);
          console.log("updateBet365MoneyFromSite", money);
          await updateBet365Money(aid, money, true);
          await updateBet365TotalMoney(uid, true);
        })

        socket.on("setProgramName", ({pid, name})=>{
          Program.findOne({_id:pid}).then(program=>{
            // console.error("!", program);
            program.name = name;
            program.save();
          }).catch(e=>{
            console.error("e", e);
          })
        })

        socket.on("delivery", async (obj, uuid)=>{
          let {data, pid} = obj;
          // console.log(`delivery`, data);
          // io.to(pid).emit(data.com, data.data);
          if(!uuid){
            emitToProgram(pid, data.com, data.data);
          }else{
            // console.log(`delivery promise`, obj, uuid);
            let r = await emitToProgramPromise(pid, data.com, data.data);
            emit("resolve", r, uuid);
          }
        })

        // function emitWithOne(email, ...rest){
        //   socket.emit.apply(socket, rest);
        //   if(email && socket._email != email){
        //     let ctx = io.to(email);
        //     ctx.emit.apply(ctx, rest);
        //   }
        // }

        socket.on("addProgram", async ()=>{
          try{
            let em = email;
            console.log('receive addProgram', em);
            let user = await User.findOne({email:em});
            if(user.programs.length < user.programCount){
              // console.log('found user', user);
              let program = await user.addProgram();
              // console.log('added program', program);
              emit("addProgram", program);
              // 파라메터로 대상 email이 들어오고 현재 소켓접속 유저와 다르면 파라메터 이메일의 주인에게도 emit
              // emitWithOne(targetEmail, "addProgram", program);
            }else{
              emit("modal", {
              //emitWithOne(targetEmail, "modal", {
                title: "알림",
                body: `프로그램 생성 수량 ${user.programCount}을(를) 초과합니다. 제한 수량을 늘리려면 관리자에게 문의해주세요`
              });
            }
          }catch(e){
            console.error(e);
          }
        })

        socket.on("removeProgram", async (pid)=>{
          let user;
          try{
            let em = email;
            console.log('receive removeProgram', em, pid);
            user = await User.findOne({email:em});
            await user.removeProgram(pid);
            // io.to(pid).emit("exit");
            emitToProgram(pid, "exit");
            emit("removeProgram", pid);
            // emitWithOne(targetEmail, "removeProgram", pid)
          }catch(e){
            console.error(e);
          }
        })

        socket.on("addBrowser", async (pid)=>{
          try{
            let em = email;
            console.log('receive addBrowser', em, pid);
            let user = await User.findOne({email:em}).select("email browserCount");
            // .populate([
            //   {
            //     path: 'programs',
            //     model: Program,
            //     match: {
            //       _id: pid
            //     }
            //   }
            // ]);
            //console.error("??", user);
            let program = await Program.findOne({_id:pid});
            // let program = user.programs[0];
            // console.log("program", program);
            if(program){
              if(program.browsers.length < user.browserCount){
                let browser = await program.addBrowser();
                browser = await Browser.findOne({_id: browser._id}).sort({$natural:-1});
                // console.log("???", browser);
                // browser.test();
                if(browser){
                  emit("addBrowser", pid, browser);
                  // emitWithOne(targetEmail, "addBrowser", pid, browser);
                }
              }else{
                emit("modal", {
                // emitWithOne(targetEmail, "modal", {
                  title: "알림",
                  body: `브라우져 생성 수량 ${user.browserCount}을(를) 초과합니다. 제한 수량을 늘리려면 관리자에게 문의해주세요`
                });
              }
            }
          }catch(e){
            console.error(e);
          }
        })

        socket.on("removeBrowser", async (pid, _bid)=>{
          let program;
          try{
            let em = email;
            console.log('receive removeBrowser', em, pid, _bid);
            program = await Program.findOne({_id:pid});
            await program.removeBrowser(_bid);
            // io.to(pid).emit("closeBrowser", _bid);
            // emitToProgram(pid, "closeBrowser", _bid);
            closeBrowser(pid, _bid);
            emit("removeBrowser", pid, _bid);
            // emitWithOne(targetEmail, "removeBrowser", pid, _bid);
          }catch(e){
            console.error(e);
          }
        })

        function closeBrowser(pid, bid){
          socket.leave("__checker__");

          // if(chekerSocket === socket){
          //   socket.leave("__checker__");
          //   // io.$.leave("__checker__", socket);
          //   chekerSocket = null;
          //   chekerBid = null;
          // }
          emitToProgram(pid, "closeBrowser", bid);
        }

        socket.on("openBrowser", async (pid, _bid, index)=>{//, isChecker)=>{
          // console.log("targetEmail", targetEmail);
          let browser = await Browser.findOneAndUpdate(
            {
              _id:_bid,
              account:{$ne:null},
              option:{$ne:null}
            },
            {
              used: true
            },
            {
              new: true
            }
          ).populate([
            {
              path: "option",
              model: Option
            },
            {
              path: "account",
              model: Account,
              options: {
                select: "id pw limited died country money"
              }
            }
          ])
          //.select("-logs")
          .lean();
          // let exists = await Browser.exists({_id:_bid, account:{$ne:null}, option:{$ne:null}});
          if(!browser){
            emit("modal", {
            // emitWithOne(targetEmail, "modal", {
              title: "알림",
              body: `브라우져의 계정연결, 옵션연결을 확인해주세요`
            });
          }else{
            // console.error(session);
            // emitToProgram(pid, "openBrowser", _bid, isChecker&&session.admin);
            emitToProgram(pid, "openBrowser", _bid, browser, index);
          }
        })

        socket.on("openBrowserFail", msg=>{
          emit("modal", {
            title: "알림",
            body: `브라우져의 계정연결, 옵션연결을 확인해주세요`
          });
        })

        socket.on("closeBrowser", (pid, _bid)=>{
          // io.to(pid).emit("closeBrowser", _bid);
          // emitToProgram(pid, "closeBrowser", _bid);
          closeBrowser(pid, _bid);
        })
      }

      switch(data.link){
        case "/dashboard":

          // emitToPrograms("getLivingBrowsers");

        break;

        case "__program__":



          // socket.on("receiveLivingBrowsers", data=>{
          //   // data.pid
          //   // data.bids
          //   console.log("receiveLivingBrowsers", socket.id, data);
          //   // 열린 브라우져 목록을 받을 때 마다, 사이트에 갱신을 요구하자.
          //   io.to(email + ":dashboard").emit("receiveLivingBrowsers", data);
          // })


          // socket.on("closedBrowser", (pid, bid)=>{
          //   console.log("closedBrowser", pid, bid);
          //   io.to(email + ":dashboard").emit("closedBrowser", pid, bid);
          // })
          //
          // socket.on("openedBrowser", (pid, bid)=>{
          //   console.log("openedBrowser", pid, bid);
          //   io.to(email + ":dashboard").emit("openedBrowser", pid, bid);
          // })
        break;
          // let testData = [
          //   {
          //     id: "SDFSEG#$%",
          //     browsers: [
          //       {
          //         bet365Id: "b3 accout",
          //         logs: [
          //           '11111',
          //           '22222'
          //         ]
          //       }
          //     ]
          //   }
          // ]
          // socket.emit("receiveProgramList", testData);
      }
    })
    //   socket.join(data.email);
    //   // console.log(socket.adapter.rooms);
    //   socket._email = data.email;
    //   io.to(data.email).emit("join", socket.id);
    //   // io.to(data.email).emit("money", 1111);
    // })

    socket.on("disconnect", async ()=>{
      console.log("user is disconnect", socket.id, socket._email);
      // socket.leave(socket._email);
      // await io.$.leave(socket._email, socket);
      // await io.$.leave(socket._email+'__program__', socket);
      // await io.$.leave(socket._email+'/dashboard', socket);
      // await io.$.leave('admin', socket);
      // await io.$.leave('onlyadmin', socket);
      // await io.$.leave('master', socket);
      // await io.$.leave('__program__', socket);
      // await io.$.leave('__checker__', socket);
    })
  })
}
