import service from "../utils/service";
export default {
  accommodations () {
    return service.get("/accommodations");
  },
  psychologicalPlatform () {
    return service.get("/platforms/psychological");
  },
  medicalPlatform () {
    return service.get("/platforms/medical");
  },
  supplies () {
    return service.get("/hospital/supplies");
  },
  reportIncorrect ({ type, cause, content }) {
    return service.post("/report", { type, cause, content });
  },
  submitSupplies (data) {
    return service.post("/supplies", data);
  },
  async realTimeMsgs (data) {
    return {
      data: [{
        id: 1,
        contributor: 'Hugo',
        createdTime: "2020/1/31 20:29:00",
        category: "民众发布",
        title: "武汉金银潭医院20位患者集体出院", content: "环球网：今天下午5点左右，武汉市金银潭医院共有20名新型冠状病毒肺炎患者集体出院，其中，最大年龄64岁，最小年龄15岁。这是疫情发生以来同时出院人数最多一次。截至目前，武汉市金银潭医院累计出院确诊患者72例。(湖北台记者罗冰 通讯员李洁)",
        source: "https://baijiahao.baidu.com/s?id=1657247051764869841&wfr=spider&for=pc&isFailFlag=1"
      }, {
        id: 2,
        contributor: "Galaxee",
        createdTime: "2020/2/2 14:58:48",
        category: "疫情发布",
        title: "哈尔滨公布两起家庭聚集性疫情典型案例，一场聚会4人确诊",
        content: "典型案例1：一武汉理工大学学生返哈后与其同学李某（化名）聚餐，李某回家后未出行。1月24日李某参加9人家庭聚会，1月30日李某确诊为新冠肺炎，聚会成员有4人确诊感染。典型案例2：1月24日吕某（化名）参加7人家庭聚会，25日参加10人聚会。1月27日吕某于发热门诊就诊，1月30日确诊。密切接触者中，参加聚餐的丈夫与外孙女相继确诊，其他参与24日聚餐家庭成员出现4例疑似。",
        source: "https://mp.weixin.qq.com/s/CF1NgkiTfC3TYv1C1GwmWA"
      }, {
        id: 3,
        contributor: "Galaxee",
        createdTime: "2020/2/2 15:05:17",
        category: "物资捐赠渠道",
        title: "我国国内口罩产能恢复至60%左右",
        content: "工信部2日新闻发布会：（1）目前全国口罩产能恢复至60 %，仍有较大需求缺口；将全力组织复产复工，同时紧急协调按国际标准生产的物资，加大国际采购，竭力保障物资供应。（2）到2月1日防护服日产已达2万件，相比1月28日0.87万增幅明显；目前实施统一管理调拨，正加紧生产，加大国际标准转换、扩大国际采购用于国内，竭力保障需求。",
        source: "https://mp.weixin.qq.com/s/Aaj0oUOK1bD0D5UNHq3ESQ"
      }, {
        id: 4,
        contributor: "Galaxee",
        createdTime: "2020/2/2 16:03:31",
        category: "物流信息",
        title: "在日侨胞疑似发病就诊建议",
        content: "新型肺炎已被日本政府认定为“指定传染病”，包括外籍游客在内的确诊患者均可接受公费治疗，拒绝配合治疗的患者将被依法强制住院。如您怀疑自己已经发病，请拨打24小时游客咨询热线：050-3816-2787（可讲中文）。就诊前事先电话联系附近的大型医疗机构，确定就医时间后佩戴口罩前往，勿隐瞒病情和国内接触史。可在日本观光厅医疗服务中文网站查询附近的医院信息。日本急救电话：119。",
        source: "http://osaka.china-consulate.org/chn/xwdt/t1738955.htm"
      }, {
        id: 5,
        contributor: "Galaxee",
        createdTime: "2020/2/2 16:09:58",
        category: "疫情发布",
        title: "在日湖北籍游客回国事项",
        content: "受航班取消、健康情况不佳等客观因素影响滞留日本的湖北籍游客，可向所在地附近的日本出入国在留管理局申请签证延期，延期结果以日方相关部门判断为准。由于协调包机手续复杂、无法提前公布准确日期，建议目前仍在日本的湖北籍游客尽快改签国内其他城市航班回国。此外，受国内条件所限，目前所有返回湖北的包机都计划降落武汉，请湖北其他地区的游客理解。",
        source: "http://osaka.china-consulate.org/chn/xwdt/t1738955.htm"
      }, {
        id: 6,
        contributor: "Galaxee",
        createdTime: "2020/2/2 16:50:23",
        category: "疫情发布",
        title: "新加坡领事服务大厅加强防范新型冠状病毒感染的肺炎",
        content: "如无紧急事项，申请人可推迟来我馆办理业务。申请人可在办理护照/旅行证预约时间之后3个月内工作日上午9:00-12:00前来办理，无需重新预约。对于有发热或其他呼吸道疾病症状的申请人，或与上述症状病患有密切接触的，如确有紧急事项，请事先联系我馆领事证件咨询电话：65-64712117，65-62581795（上午9:00-12:00，下午1:30-4:30）。",
        source: "http://www.chinaembassy.org.sg/chn/gdxw/t1736718.htm"
      }, {
        id: 7,
        contributor: "Galaxee",
        createdTime: "2020/2/2 16:56:42",
        category: "疫情发布",
        title: "韩国防范新型肺炎疫情入境相关措施",
        content: "1月27日，韩国保健福祉部把针对新型冠状病毒的警报级别从“注意”上调至“警戒”。韩国检疫部门要求从中国入境韩国的所有旅客填写健康状态问卷并接受体温检查。入境时请配合体温检测。如有咳嗽发烧等症状或正在服用止咳药、退烧药，应主动、如实向检疫官员申报，并配合检查。",
        source: "http://kr.china-embassy.org/chn/sgxx/t1737009.htm"
      }, {
        id: 8,
        contributor: "Galaxee",
        createdTime: "2020/2/2 16:58:12",
        category: "疫情发布",
        title: "在韩侨胞疑似发病就诊建议",
        content: "出现发热、咳嗽等疑似症状时，请拨打韩国疾病管理本部电话1339咨询，配合韩方疫情筛查工作，切勿隐瞒病情或国内接触史。",
        source: "http://kr.china-embassy.org/chn/sgxx/t1737009.htm"
      }, {
        id: 9,
        contributor: "Galaxee",
        createdTime: "2020/2/2 16:59:13",
        category: "疫情发布",
        title: "澳州将给予新冠肺炎患者免费治疗",
        content: "1月25日，澳大利亚新南威尔士州卫生部表示将给予新型冠状病毒肺炎患者免费治疗，无论他们是否有澳洲医疗保险。在具体就诊流程方面，呼吁疑似病患提前打电话给全科医生或急诊科，如果全科医生认为有需要进行新型冠状病毒测试，患者会被转移到急症室进行测试。",
        source: "https://www.sinovision.net/politics/202001/00474519.htm"
      }, {
        id: 10,
        contributor: "Galaxee",
        createdTime: "2020/2/2 17:17:17",
        category: "疫情发布",
        title: "中国驻德国使馆加强防范新型冠状病毒肺炎疫情",
        content: "1月29日起，所有前来使馆领侨处办理业务的申请人均须接受体温测量。如超过37.2摄氏度或有咳嗽症状，使馆建议当事人立即前去就医，暂缓办理相关申请。建议近期（两周内）去过湖北等地的申请人，暂时居家自我隔离观察，暂勿来馆办证。",
        source: "http://www.china-botschaft.de/chn/sgyw/t1737112.htm"
      }, {
        id: 11,
        contributor: "Galaxee",
        createdTime: "2020/2/2 17:21:06",
        category: "疫情发布",
        title: "在德侨胞疑似发病就诊建议",
        content: "到访过武汉、回德国后14天内出现发烧或呼吸道问题的人员，应尽快就医。请注意：就医之前电话告知医生曾去过武汉及出现的症状，避免可能传染他人。旅德公民如出现发烧、咳嗽等症状，建议拨打德国冠状病毒热线电话（Coronavirus - Hotline）咨询或立刻就医: 030 - 9028 2828（柏林）、09131 - 6808 5101（巴伐利亚）、069 - 21277400（法兰克福）或者0800 8484 111。",
        source: "http://www.china-botschaft.de/chn/sgyw/t1737112.htm"
      }]
    }; // service.post("/wiki/stream", data);
  },
};
