let api = (()=>{
  let net = axios.create({
    baseURL: "/api"
    // ,
    // ,headers: {
    //   // 'Authorization': EMAIL
    //   'cache-control': 'no-cache, must-revalidate, post-check=0, pre-check=0'
    // }
  })

  function setBaseUrl(url){
    net.defaults.baseURL = url;
  }

  let itv;
  function rvStopLoading(){
    itv = setTimeout(stopLoading, 100);
  }

  function rmStartLoding(){
    clearTimeout(itv);
    startLoading();
  }

  function ax(url, data, method='GET', headers, noCover){
    if(!noCover){
      rmStartLoding();
    }
    return net({method, url, data, headers})
    .then(res=>{
      if(!noCover){
        rvStopLoading();
      }
      return success(res)
    })
    .catch(e=>{
      if(!noCover){
        rvStopLoading();
      }
      return err(e)
    });
  }

  function success(res){
    if(res.data.status == "success"){
      return res.data;
    }else if(res.data.status == "fail"){
      return res.data;
    }else{
      return {
        status: 'fail',
        data: res.data
      }
    }
  }

  function err(e){
    // console.dir(e);
    if(e.response){
      if(e.response.data && e.response.data.status == "fail"){
        return e.response.data;
      }else{
        return {
          status: 'fail',
          message: e.response.statusText
        }
      }
    }else{
      return {
        status: 'fail',
        message: 'empty response'
      }
    }
  }

  return {
    setBaseUrl,

    getCountryList(){
      return ax('/get_country_list');
    },

    getSetting(fields){
      return ax('/get_setting/' + fields);
    },

    setSetting(data){
      return ax('/set_setting', data, "POST");
    },

    balance(){
      return ax('/balance');
    },

    getPIDs(){
      return ax('/get_pids');
    },

    checkPID(pid){
      return ax('/check_pid/' + pid);
    },

    loadProgram(pid){
      return ax('/load_program/' + pid);
    },

    loadBrowser(bid){
      return ax('/load_browser/' + bid);
    },

    getDepositHistory(opt){
      opt = Object.assign({
        deposit: true,
        offset: undefined,
        limit: undefined,
        curPage: undefined,
        // 요청자인데, 0level의 요청자는 일반유저인것을 참고
        user: undefined,
      }, opt||{})

      return ax("/get_deposit_history", opt, "POST");
    },

    //for master
    getApprovals(opt){
      opt = Object.assign({
        level: 0,
        populateChild: false,
        ids: undefined,
        offset: undefined,
        limit: undefined,
        curPage: undefined,
        email: undefined,
        // 요청자인데, 0level의 요청자는 일반유저인것을 참고
        user: undefined,
        type: undefined,
        status: undefined
      }, opt||{})

      return ax("/get_approvals", opt, "POST");
    },

    // admin, master 권한이 있는 계정만 결과를 받을 수 있는 api
    // getAccounts(ids=undefined, used=undefined, withSkrill=undefined){
    getAccounts(opt){
      opt = Object.assign({
        ids: undefined,
        used: undefined,
        withSkrill: undefined,
        trash: undefined,
        firstCharged: undefined,
        offset: undefined,
        limit: undefined,
        curPage: undefined,
        email: undefined
      }, opt||{})
      // console.log("!!!", opt);
      // used == undefined -> all
      // used == true -> used account
      // used == false -> no used account
      // withSkrill == true -> with skrill info

      return ax("/get_accounts", opt, "POST");
    },

    updateAccount(id, account){
      return ax("/update_account/" + id, account, "POST");
    },

    requestDepositAccount(id, money){
      return ax("/request_deposit_account/" + id, {money}, "POST");
    },

    rejectRequestDepositAccount(id){
      return ax("/reject_request_deposit_account/" + id, null, "POST");
    },

    cancelDepositAccount(id){
      return ax("/cancel_deposit_account/" + id, null, "POST");
    },

    okApproval(id){
      return ax("/ok_approval/" + id, null, "POST");
    },

    rejectApproval(id){
      return ax("/reject_approval/" + id, null, "POST");
    },

    depositAccount(id, money){
      return ax("/deposit_account/" + id, {money}, "POST");
    },

    // 현재 회원과 연결된 계정을 가져옴
    getLinkedAccounts(email){
      return ax("/get_linked_accounts", {email}, "POST");
    },

    getStoreAccounts(){
      return ax("/get_store_accounts");
    },

    registAccount(payload){
      return ax("/regist_account", payload, "POST");
    },

    removeAccount(id){
      return ax("/remove_account/" + id);
    },

    removeAccountUser(id){
      return ax("/remove_account_user/" + id);
    },

    buyAccount(id){
      return ax("/buy_account/" + id);
    },

    trashAccount(id){
      return ax("/trash_account/" + id);
    },

    restoreAccount(id){
      return ax("/restore_account/" + id);
    },

    chargeAccount(id, money){
      return ax("/charge_account/" + id, {money}, "POST");
    },

    getUser(email){
      return ax("/get_user", {email}, "POST");
    },

    // for admin
    getEmailList(){
      return ax("/get_user_email_list", null, "GET");
    },

    // master 권한만
    getUsers(opt){
      opt = Object.assign({
        ids: undefined,
        offset: undefined,
        limit: undefined,
        curPage: undefined,
        email: undefined,
        allowed: undefined,
        admin: undefined,
        accountCounting: undefined
      }, opt||{})

      return ax("/get_users", opt, "POST");
    },

    updateMoney(id, data){
      return ax("/update_money/" + id, data, "POST");
    },

    addMoney(id, data){
      return ax("/add_money/" + id, data, "POST");
    },

    refreshMoney(){
      return ax("/refreshMoney");
    },

    updateUser(id, user){
      return ax("/update_user/" + id, user, "POST");
    },

    removeUser(id){
      return ax("/remove_user/" + id);
    },

    registOption(payload){
      return ax("/regist_option", payload, "POST");
    },

    getOptions(ids){
      return ax("/get_options", {ids}, "POST");
    },

    getOptionList(){
      return ax("/get_option_list");
    },

    updateOption(id, option){
      return ax("/update_option/" + id, {option}, "POST");
    },

    removeOption(id){
      return ax("/remove_option/" + id);
    },

    updateBrowser(bid, browser){
      return ax("/update_browser/" + bid, {browser}, "POST");
    },

    getBets(opt){
      opt = Object.assign({
        ids: undefined,
        offset: undefined,
        limit: undefined,
        curPage: undefined,
        sportName: undefined,
        accountId: undefined,
        email: undefined,
        status: undefined,
        range: undefined,
        betId: undefined
      }, opt||{})
      return ax("/get_bets", opt, "POST");
    },

    loadLogs(bid){
      return ax("/load_logs/" + bid, null, "GET", null, true);
    },

    getDeposits(opt){
      opt = Object.assign({
        ids: undefined,
        offset: undefined,
        limit: undefined,
        curPage: undefined,
        type: undefined,
        email: undefined,
        moneyName: undefined
      }, opt||{})
      return ax("/get_money_log", opt, "POST");
    },

    updateBetdata(data){
      return ax("/update_betdata", data, "POST");
    }
  };
})()
