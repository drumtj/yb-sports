console.log("adminOptionManager.js");
let exchangeContryCodeList = [{"name":"------","value":""}, {"name":"CFA 프랑 (BCEAO)(XOF)","value":"BCEAO"},{"name":"CFA 프랑 (BEAC)(XAF)","value":"BEAC"},{"name":"CFP 프랑(XPF)","value":"XPF"},{"name":"가나 세디(GHS)","value":"GHS"},{"name":"가이아나 달러(GYD)","value":"GYD"},{"name":"감비아 달라시(GMD)","value":"GMD"},{"name":"과테말라 퀘찰(GTQ)","value":"GTQ"},{"name":"기니 프랑(GNF)","value":"GNF"},{"name":"나미비아 달러(NAD)","value":"NAD"},{"name":"나이지리아 나이라(NGN)","value":"NGN"},{"name":"남아프리카 공화국 랜드(ZAR)","value":"ZAR"},{"name":"네덜란드령 안틸레스 굴덴(ANG)","value":"ANG"},{"name":"네팔 루피(NPR)","value":"NPR"},{"name":"노르웨이 크로네(NOK)","value":"NOK"},{"name":"뉴질랜드 달러(NZD)","value":"NZD"},{"name":"니카라과 코르도바(NIO)","value":"NIO"},{"name":"대만 달러(TWD)","value":"TWD"},{"name":"대한민국 원(KRW)","value":"KRW"},{"name":"덴마크 크로네(DKK)","value":"DKK"},{"name":"도미니카 공화국 페소 (DOP)","value":"DOP"},{"name":"동카리브 달러(XCD)","value":"XCD"},{"name":"러시아 루블(RUB)","value":"RUB"},{"name":"루마니아 레우(RON)","value":"RON"},{"name":"르완다 프랑(RWF)","value":"RWF"},{"name":"마카오 파타카(MOP)","value":"MOP"},{"name":"마케도니아 디나르(MKD)","value":"MKD"},{"name":"말라위 콰차(MWK)","value":"MWK"},{"name":"말레이시아 링깃(MYR)","value":"MYR"},{"name":"멕시코 페소(MXN)","value":"MXN"},{"name":"모로코 디르함(MAD)","value":"MAD"},{"name":"모리셔스 루피(MUR)","value":"MUR"},{"name":"모리타니 우기야(MRO)","value":"MRO"},{"name":"몰도바 레우(MDL)","value":"MDL"},{"name":"몰디브 루피야(MVR)","value":"MVR"},{"name":"몽골 투그릭(MNT)","value":"MNT"},{"name":"미국 달러(USD)","value":"USD"},{"name":"미얀마 차트(MMK)","value":"MMK"},{"name":"바누아투 바투(VUV)","value":"VUV"},{"name":"바레인 디나르(BHD)","value":"BHD"},{"name":"바베이도스 달러(BBD)","value":"BBD"},{"name":"바하마 달러(BSD)","value":"BSD"},{"name":"방글라데시 타카(BDT)","value":"BDT"},{"name":"버뮤다 달러(BMD)","value":"BMD"},{"name":"베트남 동(VND)","value":"VND"},{"name":"벨라루스 루블(BYR)","value":"BYR"},{"name":"벨리즈 달러(BZD)","value":"BZD"},{"name":"보츠와나 풀라(BWP)","value":"BWP"},{"name":"볼리바르 후에르떼(VEF)","value":"VEF"},{"name":"볼리비아노(BOB)","value":"BOB"},{"name":"부룬디 프랑(BIF)","value":"BIF"},{"name":"부탄 눌트럼(BTN)","value":"BTN"},{"name":"불가리아 레프(BGN)","value":"BGN"},{"name":"브라질 레알(BRL)","value":"BRL"},{"name":"브루나이 달러(BND)","value":"BND"},{"name":"사모아 탈라(WST)","value":"WST"},{"name":"사우디아라비아 리얄(SAR)","value":"SAR"},{"name":"상투메 도브라(STD)","value":"STD"},{"name":"세이셸 루피(SCR)","value":"SCR"},{"name":"세인트헬레나 파운드(SHP)","value":"SHP"},{"name":"소말리아 실링(SOS)","value":"SOS"},{"name":"솔로몬 제도 달러(SBD)","value":"SBD"},{"name":"수단 파운드(SDG)","value":"SDG"},{"name":"스리랑카 루피(LKR)","value":"LKR"},{"name":"스와질란드 릴랑게니(SZL)","value":"SZL"},{"name":"스웨덴 크로나(SEK)","value":"SEK"},{"name":"스위스 프랑(CHF)","value":"CHF"},{"name":"슬로바키아 코루나(SKK)","value":"SKK"},{"name":"시리아 파운드(SYP)","value":"SYP"},{"name":"시에라리온 레온(SLL)","value":"SLL"},{"name":"싱가폴 달러(SGD)","value":"SGD"},{"name":"아랍에미리트 디르함(AED)","value":"AED"},{"name":"아루바 플로린(AWG)","value":"AWG"},{"name":"아르헨티나 페소(ARS)","value":"ARS"},{"name":"아이슬란드 크로네(ISK)","value":"ISK"},{"name":"아이티 구르드 (HTG)","value":"HTG"},{"name":"알바니아 렉(ALL)","value":"ALL"},{"name":"알제리 디나르(DZD)","value":"DZD"},{"name":"에스토니아 크룬(EEK)","value":"EEK"},{"name":"에티오피아 비르(ETB)","value":"ETB"},{"name":"엘살바도르 콜론(SVC)","value":"SVC"},{"name":"영국 파운드(GBP)","value":"GBP"},{"name":"예멘 리알(YER)","value":"YER"},{"name":"오만 리알(OMR)","value":"OMR"},{"name":"온두라스 렘피라(HNL)","value":"HNL"},{"name":"요르단 디나르(JOD)","value":"JOD"},{"name":"우간다 실링(UGX)","value":"UGX"},{"name":"우루과이 페소(UYU)","value":"UYU"},{"name":"우즈베크 솜(UZS)","value":"UZS"},{"name":"우크라이나 흐리브냐(UAH)","value":"UAH"},{"name":"유로(EUR)","value":"EUR"},{"name":"이라크 디나르(IQD)","value":"IQD"},{"name":"이란 리알(IRR)","value":"IRR"},{"name":"이스라엘 셰켈(ILS)","value":"ILS"},{"name":"이집트 파운드(EGP)","value":"EGP"},{"name":"인도 루피(INR)","value":"INR"},{"name":"인도네시아 루피아(IDR)","value":"IDR"},{"name":"일본 엔(JPY)","value":"JPY"},{"name":"잠비아 콰차(ZMK)","value":"ZMK"},{"name":"조선민주주의인민공화국 원(KPW)","value":"KPW"},{"name":"중국 위안(CNY)","value":"CNY"},{"name":"지부티 프랑(DJF)","value":"DJF"},{"name":"체코 코루나(CZK)","value":"CZK"},{"name":"칠레 페소(CLP)","value":"CLP"},{"name":"카보베르데 에스쿠도(CVE)","value":"CVE"},{"name":"카자흐스탄 텡게(KZT)","value":"KZT"},{"name":"카타르 리알(QAR)","value":"QAR"},{"name":"캄보디아 리엘(KHR)","value":"KHR"},{"name":"캐나다 달러(CAD)","value":"CAD"},{"name":"케냐 실링(KES)","value":"KES"},{"name":"케이맨 제도 달러(KYD)","value":"KYD"},{"name":"코모로 프랑(KMF)","value":"KMF"},{"name":"코스타리카 콜론(CRC)","value":"CRC"},{"name":"콜롬비아 페소(COP)","value":"COP"},{"name":"쿠바 페소(CUP)","value":"CUP"},{"name":"쿠웨이트 디나르(KWD)","value":"KWD"},{"name":"크로아티아 쿠나(HRK)","value":"HRK"},{"name":"키르기스스탄 솜(KGS)","value":"KGS"},{"name":"탄자니아 실링(TZS)","value":"TZS"},{"name":"태국 바트(THB)","value":"THB"},{"name":"터키어 리라(TRY)","value":"TRY"},{"name":"통가 팡가(TOP)","value":"TOP"},{"name":"튀니지 디나르(TND)","value":"TND"},{"name":"트리니다드 토바고 달러(TTD)","value":"TTD"},{"name":"파나마 발보아(PAB)","value":"PAB"},{"name":"파라과이 과라니(PYG)","value":"PYG"},{"name":"파키스탄 루피(PKR)","value":"PKR"},{"name":"파푸아 뉴기니 키나(PGK)","value":"PGK"},{"name":"페루 누에보솔(PEN)","value":"PEN"},{"name":"포클랜드 제도 파운드(FKP)","value":"FKP"},{"name":"폴란드 즈워티(PLN)","value":"PLN"},{"name":"피지 달러(FJD)","value":"FJD"},{"name":"필리핀 페소(PHP)","value":"PHP"},{"name":"헝가리 포린트(HUF)","value":"HUF"},{"name":"호주 달러(AUD)","value":"AUD"},{"name":"홍콩 달러(HKD)","value":"HKD"}];
let Vapp;
(async ()=>{
  let optionDataFormat = [
    {
      name: "사용권한",
      key: "permission",
      value: "all",
      list: [
        {
          name: "전체",
          value: "all"
        },
        {
          name: "관리자",
          value: "admin"
        }
      ],
      type: "select"
    },
    {
      name: "데이터 타입",
      key: "dataType",
      value: "betmax",
      list: [
        {
          name: "벳맥스",
          value: "betmax"
        },
        {
          name: "벳버거",
          value: "betburger"
        }
      ],
      type: "select"
    },
    {
      name: "동작",
      key: "action",
      value: "yb",
      list: [
        {
          name: "벳맥스 체크 (데이터 수집기)",
          value: "checkBetmax"
        },
        {
          name: "양빵",
          value: "yb"
        },
        {
          name: "벨류",
          value: "vl"
        }
      ],
      type: "select"
    },
    {
      type: "hr"
    },
    {
      name: "벳삼 환율배팅 사용여부",
      key: "useExchange",
      list: ['y', 'n'],
      value: "y",
      type: "radio"
    },
    {
      name: "환율 시작 통화",
      key: "exchangeCode1",
      value: "USD",
      list: exchangeContryCodeList,
      type: "select"
    },
    {
      name: "환율 끝 통화",
      key: "exchangeCode2",
      value: "USD",
      list: exchangeContryCodeList,
      type: "select"
    },
    {
      type: "hr"
    },
    {
      name: "벨류 고정 betmax",
      key: "customBetmax",
      value: 20,
      type: "number",
      prepend: "$"
    },
    {
      name: "betmax 제한",
      key: "maxBetmax",
      value: 20,
      type: "number",
      // help: "체크기 옵션",
      prepend: "$"
    },
    // {
    //   name: "betmax 적용%",
    //   key: "betmaxRatio",
    //   value: 80,
    //   type: "number",
    //   help: "체크기 옵션",
    //   append: "%"
    // },
    {
      name: "최소 수익률",
      key: "minProfitP",
      value: 1,
      type: "number",
      append: "%"
    },
    {
      name: "최대 수익률",
      key: "maxProfitP",
      value: 15,
      type: "number",
      append: "%"
    },
    {
      name: "최소 수익달러",
      key: "minProfit",
      value: 1,
      type: "number",
      prepend: "$"
    },
    {
      name: "최대 수익달러",
      key: "maxProfit",
      value: 10,
      type: "number",
      prepend: "$"
    },
    {
      name: "최소 벳365 배당",
      key: "minOddsForBet365",
      value: 1.2,
      append: "이하 패스",
      type: "number"
    }
    // {
    //   name: "최소 수익달러",
    //   key: "profit",
    //   value: 1,
    //   type: "number",
    //   prepend: "$"
    // }
    // {
    //   name: "테스트1",
    //   key: "test1",
    //   value: "t1",
    //   placeholder: "테스트1 입력하세요",
    //   help: "help text",
    //   type: "text"
    // },
    // {
    //   name: "테스트2",
    //   key: "test2",
    //   value: "t1",
    //   list: [
    //     {
    //       name: "티1",
    //       value: "t1"
    //     },{
    //       name: "티2",
    //       value: "t2"
    //     },{
    //       name: "티3",
    //       value: "t3"
    //     }
    //   ],
    //   type: "select"
    // },
    // {
    //   name: "테스트3",
    //   key: "test3",
    //   list: ["t1", "t2", "t3"],
    //   value: {
    //     "t1": false,
    //     "t2": false,
    //     "t3": false
    //   },
    //   type: "checkbox"
    // },
    // {
    //   name: "테스트4",
    //   key: "test4",
    //   list: ["t1", "t2", "t3"],
    //   value: "t1",
    //   type: "radio"
    // }
  ]

  // list가 문자열로 된 것들을 오브젝트형태로 통일하자.
  optionDataFormat.forEach(obj=>{
    if(Array.isArray(obj.list)){
      obj.list.forEach((item, i, arr)=>{
        if(typeof item !== "object"){
          arr[i] = {
            name: item,
            value: item
          }
        }
      })
    }
  })

  let defaultOption = {
    _id: "",
    name: "",
    data: optionDataFormat.reduce((r, form)=>{
      r[form.key] = form.value;
      return r;
    }, {})
  }

  // console.log("defaultOption", defaultOption);

  Vapp = new Vue({
    el: "#app",
    data: {
      optionId: "",
      optionName: "",
      options: [],
      forms: []
    },
    async created(){
      console.log("wait socketReady");
      await socketReady;

      let options;

      let res = await api.getOptionList();
      if(res.status == "success"){
        options = res.data;
      }else{
        modal("오류", res.message)
        return;
      }

      // console.log("load option list", options);

      if(options){
        this.options = options;
      }

      this.forms = JSON.parse(JSON.stringify(optionDataFormat));
      this.formsMap = this.forms.reduce((r,form)=>{
        if(form.key){
          r[form.key] = form;
        }
        return r;
      }, {});

      $(this.$el).removeClass("pre-hide");

      this.$nextTick(function() {
        this.$form = $(".option-form").remove();
        appMountedResolve();
      })
    },
    async mounted(){
    },
    methods: {
      // async getOptionFormat(){
      //   return optionDataFormat;
      // },

      optionNameValidationReset(){
        $("#optionName").removeClass('is-invalid');
        $("#optionNameValidMessage").hide();
      },

      optionNameValidation(){
        if(!this.optionName){
          $("#optionName").addClass('is-invalid');
          $("#optionNameValidMessage").show();
          return false;
        }else{
          this.optionNameValidationReset();
          return true;
        }
      },

      getOptionForm(){
        this.optionNameValidationReset();
        return this.$form;
      },

      async openOptionRegistModal(){
        this.setOptionData(defaultOption);
        let result = await modal("옵션등록", this.getOptionForm(), {
          buttons:['취소', '등록'],
          lock:true,
          size:'lg',
          validation: this.optionNameValidation
        })

        if(result){
          let option = this.getOptionData();
          // console.error("regist option", JSON.parse(JSON.stringify(option)));
          let res = await api.registOption(option);
          if(res.status == "success"){
            // modal("알림", `옵션 ${option.name} 등록 성공`);
            option._id = res.data;
            this.options.push(option);
          }else{
            modal("알림", res.message);
          }
        }
      },

      update(event){
        let key = event.target.id.split('_');
        let value = event.target.value;

        // console.error(key, value, this.formsMap[key[0]]);
        if(key[0] == "optionName"){
          this.optionName = value;
          this.optionNameValidation();
        }else{
          let form = this.formsMap[key[0]];
          if(form){
            if(form.type == 'checkbox'){
              // console.log(event.target.checked);
              form.value[key[1]] = event.target.checked;
            }else if(form.type == 'radio'){
              if(event.target.checked){
                form.value = key[1];
              }
            }else{
              form.value = value;
            }
          }
        }
        // console.log(key, value, this.formsMap, this.forms);
      },

      getOptionData(){
        let opt = {};
        for(let key in this.formsMap){
          opt[key] = this.formsMap[key].value;
        }
        return {
          _id: this.optionId,
          name: this.optionName,
          permission: opt.permission,
          data: JSON.parse(JSON.stringify(opt))
        }
      },

      setOptionData(option){
        option = JSON.parse(JSON.stringify(option));
        this.optionName = option.name;
        this.optionId = option._id;
        // console.log(option);
        for(let key in this.formsMap){
          // console.log(key, this.formsMap[key], option.data[key]);
          if(this.formsMap[key]){
            this.formsMap[key].value = option.data[key] || "";
          }
        }
        // this.$forceUpdate();
      },
      // async registOption(option){
      //   // 옵션 데이터 추출
      //   // 서버전달
      //   // 응답 처리
      //   // let option = getOptionData();
      //   let res = await api.registOption(option);
      //   if(res.status == "success"){
      //     this.options.push(option);
      //     modal("알림", `옵션 [${option.name}] 등록 완료`);
      //   }else{
      //     modal("옵션등록 실패", res.message);
      //   }
      // },

      async removeOption(id){
        let index;
        let option = this.options.find((opt,i)=>{
          let f = opt._id==id;
          if(f){
            index = i;
          }
          return f;
        });
        if(!option){
          modal("알림", `${id} 옵션을 찾을 수 없습니다.`);
          return;
        }
        if(!(await modal("옵션제거", `옵션 '${option.name}'을 제거하시겠습니까?`, {buttons:["취소", "제거"]}))) return;

        let res = await api.removeOption(id);
        if(res.status == "success"){
          this.options.splice(index, 1);
          // modal("알림", `옵션 '${option.name}' 을 제거했습니다`);
        }else{
          modal("알림", `옵션제거 실패.<br>${res.message}`);
        }
      },

      async openOptionModal(id){
        let res = await api.getOptions([id]);
        let option;
        // console.error(res);
        if(res.status == "success"){
          option = res.data[0];
          // console.error("open option", id, option);
        }else{
          modal("알림", `옵션(${id}) 로딩 실패<br>${res.message}`);
          return;
        }
        this.setOptionData(option);
        let result = await modal("옵션수정", this.getOptionForm(), {
          buttons:['취소', '저장', '새 이름으로 저장'],
          lock:true,
          size:'lg',
          validation: this.optionNameValidation
        });

        if(result){
          option = this.getOptionData();
          if(result == 2){
            option.name = prompt(`'${option.name}'의 새 이름을 입력하세요`);
            res = await api.registOption(option);
          }else{
            res = await api.updateOption(option._id, option);
          }
          if(res.status == "success"){
            if(result == 2){
              option._id = res.data;
              this.options.push(option);
            }else{
              let originOption = this.options.find(opt=>opt._id==option._id);
              if(originOption){
                originOption.name = option.name;
                // modal("알림", `옵션 '${option.name}'이 저장됐습니다.`)
              }else{
                modal("알림", `옵션저장 실패<br>${option._id} 옵션을 찾을 수 없습니다. `);
              }
            }
          }else{
            modal("알림", `옵션저장 실패<br>${res.message}`);
          }
        }
      }
    }
  })//end Vapp

  appReadyResolve();
})()
