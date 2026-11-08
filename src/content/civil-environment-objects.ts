import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilEnvironmentObjectsRevision =
  "civil-environment-objects-2026-10-23.v1";

export const civilEnvironmentObjectsSources: ContentSources = {
  "civil-environment-objects-environment1229": {
    title:
      "《民法典》第1229条、生态环境侵权责任解释第4条：污染致损与无过错责任",
    url: "https://www.court.gov.cn/zixun/xiangqing/508041.html",
    note: "2026-10-23直接核读官方原文。法释〔2026〕16号，2026-08-06发布，自2026-08-15施行；直接核读所附修正后生态环境侵权责任解释第4、17、18条及证据规定第2、4、5、6条。只考经环境介质造成私人财产损害的普通排污行为，不涉及海洋、核事故、生态技术服务连带或公益修复。排放达标和日常设备合规不自动免除已造成损害的民事责任；并非凡有损失都归附近企业。",
  },
  "civil-environment-objects-code1229": {
    title: "《民法典》第1229、1230、1233条：污染责任、举证与第三人过错",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。与现行生态环境法典第1070、1080条及2026修正解释合读。受害人自己的财产损害请求与国家生态环境修复请求分开；不存在污染者与第三人共同串通等其他连带事由。",
  },
  "civil-environment-objects-burden2026": {
    title: "生态环境侵权证据规定第2、4—6条：原告证明与被告反证",
    url: "https://www.court.gov.cn/zixun/xiangqing/508041.html",
    note: "2026-10-23直接核读官方原文。法释〔2026〕16号，2026-08-06发布，自2026-08-15施行；直接核读所附修正后生态环境侵权责任解释第4、17、18条及证据规定第2、4、5、6条。读取2026年8月15日起修正版本。原告证明污染行为、损害、请求金额及行为与损害的关联性；被告证明不存在因果关系、免责减责事由。关联性不等于要求原告先完成完整因果关系证明，也不是受害人什么都不必证明。",
  },
  "civil-environment-objects-ecocode1080": {
    title: "《生态环境法典》第1070、1080、1242条：民事衔接、举证及施行时间",
    url: "https://www.mee.gov.cn/ywgz/fgbz/fl/202603/t20260313_1146496.shtml",
    note: "2026-10-23直接核读官方原文。《生态环境法典》2026-03-12通过，2026-08-15施行；直接核读1070、1080、1242条及本批所需条文。四案发生在2026年9月，适用现行规范；只取本批私人损害和举证条文，不宣称已读全法典或完成年度考纲覆盖。",
  },
  "civil-environment-objects-third2026": {
    title: "生态环境侵权责任解释第17、18条：第三人过错与污染者追偿",
    url: "https://www.court.gov.cn/zixun/xiangqing/508041.html",
    note: "2026-10-23直接核读官方原文。法释〔2026〕16号，2026-08-06发布，自2026-08-15施行；直接核读所附修正后生态环境侵权责任解释第4、17、18条及证据规定第2、4、5、6条。第一案污染企业及设施管理无过错，外部施工第三人独立挖破管线；第二案外部第三人独立破坏设施、企业无过错并已全额赔偿。第三人并非受托环保技术服务机构，避免误套法典第1067、1068条的特定连带规则；实际损失不能重复获赔。",
  },
  "civil-environment-objects-risk1239": {
    title: "《民法典》第1236、1239、1240条：高度危险物与作业责任",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。第一案强腐蚀性工业原液的性质及其泄漏致损已查明，属于占有使用危险物而非普通生活用品。第二案只考高压作业的不可抗力例外，极端地震与设施毁坏、损害之间的唯一原因及无法避免克服的技术事实已给定，不把普通雷雨、设备老化说成当然免责。核设施、航空器规则不混用。",
  },
  "civil-environment-objects-lost1241": {
    title: "《民法典》第1241条：遗失危险物与受托管理",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。危险物已交独立专业机构管理，系该机构遗失，不是盗抢或所有人自己遗失；所有人选任、交付及监督无过错有证据确认。管理人与所有人关系依本条区分，不扩成所有受托管理均由所有人连带。",
  },
  "civil-environment-objects-illegal1242": {
    title: "《民法典》第1242条：非法占有与高度注意义务",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。非法占有人自行盗取危险物，所有人兼管理人有持续保管职责，不能证明防止非法占有的高度注意义务。按第1242条连带，不用普通疏忽标准替代高度注意；不问犯罪定性。",
  },
  "civil-environment-objects-collapse1252": {
    title: "《民法典》第1252条：倒塌、质量缺陷与其他致损原因",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。第一案建设与施工单位不能证明没有质量缺陷，不要求受害人反过来先查清全部施工技术。第二案有充分鉴定排除原质量缺陷，倒塌完全由后来业主擅拆承重结构造成；未问不动产买卖违约或混合原因分担。",
  },
  "civil-environment-objects-falling1253": {
    title: "《民法典》第1253条：特定悬挂物坠落与赔后追偿",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。两案坠物来源及管理主体明确，为店铺自行安装使用的招牌，不套来源不明高空抛物补偿。第二案明确安装人过错和唯一原因，店主已赔与真实损失均为3万元，追偿不超过实际支付。",
  },
  "civil-environment-objects-high-rise1254": {
    title: "《民法典》第1254条：抛坠物、可能加害使用人及安全措施",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。两案均为楼内抛出物，不是固定外墙部件脱落。第一案已查明侵权人，不让全楼分摊；第二案到一审法庭辩论终结前仍无法查明，候选范围仅为经调查确定的相关使用人，能证明排除自身的使用人不补偿。",
  },
  "civil-environment-objects-high-rise2024": {
    title: "侵权责任编解释（一）第24、25条：已知与不明抛物人的物业责任",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-3485.html",
    note: "2026-10-23直接核读官方原文。侵权责任编解释（一），法释〔2024〕12号，2024-09-26公布页面，自2024-09-27施行。核读正式解释。已知具体侵权人时，物业未尽必要措施的过错责任为对侵权人财产强制执行后仍不能履行范围内的相应补充；仍不明时，物业负与过错相应责任，其余损害由可能加害使用人适当补偿。不能把两条顺序、赔偿与补偿混同，不设全部住户均摊。",
  },
  "civil-environment-objects-ground1258": {
    title: "《民法典》第1258条：公共施工安全与窨井管理",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。第一案公共人行道施工坑，仅有纸牌而无护栏盖板且夜间不可见；施工人须证明明显标志及安全措施，二者缺一不可。第二案窨井管理人不能证明尽到管理职责，不以先查到移走井盖者为管理人责任前提；不扩到已尽管理职责的情形。",
  },
};

export const civilEnvironmentObjectsTopics: FaultTopic[] = [
  {
    id: "civil-environment-liability",
    title: "污染致损与举证分工",
    headline:
      "污染造成损害，排放达标也不当然免赔；受害人仍要拿出污染、损害和关联性的证据。",
    goal: "青禾厂能否仅以排放达标、操作没有疏漏为由拒绝赔偿鱼塘损失？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "污染经河水、空气等环境介质损害他人财产，行为人不论有无过错都应依法负责。行政排放达标说明符合相应标准，不代表排污者可以让受害人承担已经造成的全部损失。",
      "原告要证明污染行为、自己的损害和请求金额，并提供行为与损害存在关联的证据；污染者要证明其行为与损害没有因果关系，或存在法定免责、减责事由。举证分工不是把所有证明任务都交给一方。",
    ],
    example: {
      title: "排放记录与下游鱼塘",
      facts:
        "本案为原创教学虚构，发生于2026年9月。青禾厂的废水经河流进入下游沈宁承包的鱼塘，鱼群死亡。检测、取样及鉴定已经确认该厂排放与本次死亡之间的因果关系，损失金额也已核实。厂方出示排污许可和达标监测记录，称设备一直按要求维护，事故期间没有违反行政排放标准，也没有操作疏漏。没有受害人故意、不可抗力等其他免责争议。",
      analysis:
        "不能。青禾厂的排放已经造成沈宁的鱼塘损失，应承担污染侵权责任。排放达标、操作没有疏漏，不会自动免除这项赔偿；本案污染来源、因果关系和损失都已查明。",
    },
    pitfall:
      "把达标当作免赔凭证，或把因果关系举证倒置理解成原告无需提供任何证据。",
    recall: {
      prompt: "青禾厂能否仅以排放达标、操作没有疏漏为由拒绝赔偿鱼塘损失？",
      reference:
        "污染造成损害，排放达标也不当然免赔；受害人仍要拿出污染、损害和关联性的证据。",
    },
    sources: [
      "civil-environment-objects-environment1229",
      "civil-environment-objects-code1229",
      "civil-environment-objects-ecocode1080",
      "civil-environment-objects-burden2026",
    ],
    exercises: [
      {
        caseId: "civil-environment-objects-environment-compliant-discharge",
        relatedTopicIds: ["civil-environment-liability"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾厂的废水经河流进入下游沈宁承包的鱼塘，鱼群死亡。检测、取样及鉴定已经确认该厂排放与本次死亡之间的因果关系，损失金额也已核实。厂方出示排污许可和达标监测记录，称设备一直按要求维护，事故期间没有违反行政排放标准，也没有操作疏漏。没有受害人故意、不可抗力等其他免责争议。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。青禾厂的排放已经造成沈宁的鱼塘损失，应承担污染侵权责任。排放达标、操作没有疏漏，不会自动免除这项赔偿；本案污染来源、因果关系和损失都已查明。",
        sources: [
          "civil-environment-objects-environment1229",
          "civil-environment-objects-code1229",
          "civil-environment-objects-ecocode1080",
        ],
        id: "civil-environment-objects-environment-compliant-discharge-choice",
        kind: "objective",
        choiceMode: "single",
        title: "排放记录与下游鱼塘：选择判断",
        prompt: "青禾厂能否仅以排放达标、操作没有疏漏为由拒绝赔偿鱼塘损失？",
        options: [
          {
            id: "a",
            text: "不能；达标与否不替代对已造成污染损害的民事赔偿",
            explanation: "环境污染致损适用无过错责任，达标不是当然免责事由。",
          },
          {
            id: "b",
            text: "能，持有排污许可就永远不用赔私人损失",
            explanation: "许可不免除已造成损害的民事责任。",
          },
          {
            id: "c",
            text: "能，只要没有操作疏漏，鱼塘只能自行承担",
            explanation: "忽略污染致损的无过错责任。",
          },
          {
            id: "d",
            text: "必须先证明厂方想毒死鱼，才能要求任何赔偿",
            explanation: "不要求以故意为普通污染赔偿的前提。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-environment-objects-environment-compliant-discharge",
        relatedTopicIds: ["civil-environment-liability"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾厂的废水经河流进入下游沈宁承包的鱼塘，鱼群死亡。检测、取样及鉴定已经确认该厂排放与本次死亡之间的因果关系，损失金额也已核实。厂方出示排污许可和达标监测记录，称设备一直按要求维护，事故期间没有违反行政排放标准，也没有操作疏漏。没有受害人故意、不可抗力等其他免责争议。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。青禾厂的排放已经造成沈宁的鱼塘损失，应承担污染侵权责任。排放达标、操作没有疏漏，不会自动免除这项赔偿；本案污染来源、因果关系和损失都已查明。",
        sources: [
          "civil-environment-objects-environment1229",
          "civil-environment-objects-code1229",
          "civil-environment-objects-ecocode1080",
        ],
        id: "civil-environment-objects-environment-compliant-discharge-written",
        kind: "subjective",
        title: "排放记录与下游鱼塘：写出分析",
        prompt:
          "青禾厂能否仅以排放达标、操作没有疏漏为由拒绝赔偿鱼塘损失？请结合案情说明理由。",
        criteria: [
          {
            id: "environment-compliant-duty",
            label: "达标不免除污染赔偿",
            meaning:
              "判断厂方仍应赔偿，说明污染致损不以其有过错或排放超标为前提。",
            acceptable: "说废水已经造成鱼死，达标不能成为不赔的理由即可。",
            boundary:
              "不要求受害人另证企业故意或先拿到行政处罚，也不加判惩罚性赔偿。",
          },
          {
            id: "environment-compliant-facts",
            label: "联系排放与已确认损害",
            meaning: "联系废水经河流进入鱼塘、鉴定确认致损，说明本案赔偿依据。",
            acceptable:
              "说这次鱼死已经查明是该厂排放造成，不只是工厂离鱼塘近即可。",
            boundary: "不让模型重做污染技术鉴定，不要求计算已给定的金额。",
          },
        ],
      },
      {
        caseId: "civil-environment-objects-environment-proof-division",
        relatedTopicIds: ["civil-environment-liability"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。林禾的花圃出现成片枯死。她提交沐青厂排水的监测记录、花木损毁照片及损失评估，还提交水流路线和同期污染物样本，表明厂方排水能够到达花圃，污染物与枯死症状相吻合。厂方否认因果关系，称只要林禾不能先把全部致损机理证明到底，自己就不必提交任何反证。林禾则称环境案件全部由厂方举证，自己连损失金额也不必证明。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "双方都说过头了。林禾要证明厂方排污、花圃损害和请求金额，并提供排水与枯死有关联的证据；本案的路线、样本等正是这类材料。厂方若否认因果关系，应证明其排水与损害没有因果关系，主张免责或减责也要证明相应事由，不能只要求林禾先证明所有致损机理。",
        sources: [
          "civil-environment-objects-code1229",
          "civil-environment-objects-burden2026",
          "civil-environment-objects-ecocode1080",
        ],
        id: "civil-environment-objects-environment-proof-division-choice",
        kind: "objective",
        choiceMode: "single",
        title: "起诉前收集的几份材料：选择判断",
        prompt: "双方对举证责任的说法是否正确？各自还应证明什么？",
        options: [
          {
            id: "a",
            text: "原告不必提交污染、损害或金额的任何材料",
            explanation: "原告仍负担污染行为、损害、金额和关联性的相应证明。",
          },
          {
            id: "b",
            text: "只有原告先完全证明全部因果机理，被告才负任何举证责任",
            explanation: "混淆关联性证据与由被告承担的不存在因果关系反证。",
          },
          {
            id: "c",
            text: "原告证明污染、损害、金额并提供关联证据，被告证明无因果关系及免责减责事由",
            explanation: "对应现行证据规定第2、4、5、6条的分工。",
          },
          {
            id: "d",
            text: "厂方与原告都不需提交证据，只看谁先起诉",
            explanation: "诉讼顺序不替代法定举证分工。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-environment-objects-environment-proof-division",
        relatedTopicIds: ["civil-environment-liability"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。林禾的花圃出现成片枯死。她提交沐青厂排水的监测记录、花木损毁照片及损失评估，还提交水流路线和同期污染物样本，表明厂方排水能够到达花圃，污染物与枯死症状相吻合。厂方否认因果关系，称只要林禾不能先把全部致损机理证明到底，自己就不必提交任何反证。林禾则称环境案件全部由厂方举证，自己连损失金额也不必证明。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "双方都说过头了。林禾要证明厂方排污、花圃损害和请求金额，并提供排水与枯死有关联的证据；本案的路线、样本等正是这类材料。厂方若否认因果关系，应证明其排水与损害没有因果关系，主张免责或减责也要证明相应事由，不能只要求林禾先证明所有致损机理。",
        sources: [
          "civil-environment-objects-code1229",
          "civil-environment-objects-burden2026",
          "civil-environment-objects-ecocode1080",
        ],
        id: "civil-environment-objects-environment-proof-division-written",
        kind: "subjective",
        title: "起诉前收集的几份材料：写出分析",
        prompt:
          "双方对举证责任的说法是否正确？各自还应证明什么？请结合案情说明理由。",
        criteria: [
          {
            id: "environment-proof-plaintiff",
            label: "受害人的证明任务",
            meaning:
              "说明原告须证明污染、损害、请求金额并提供关联性证据，不能什么都不证明。",
            acceptable:
              "说她要拿出排水、损失和二者联系的材料，赔多少也要有依据即可。",
            boundary:
              "不要求逐字列条号，不把关联性提升为全部因果机理的完整证明。",
          },
          {
            id: "environment-proof-defendant",
            label: "污染者的反证任务",
            meaning:
              "说明厂方对不存在因果关系以及主张的免责减责事由负举证责任。",
            acceptable:
              "说厂方不能只否认，要证明不是其排水导致或有依法免减责任的原因即可。",
            boundary: "不把任何无法认定的损失金额一律转给厂方证明。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-environment-third-party",
    title: "第三人致污染与追偿",
    headline:
      "第三人造成污染事故，受害人仍可向污染者索赔；污染者赔偿后，再依法向有过错的第三人追偿。",
    goal: "陆宁能否向沐禾厂要求赔偿，还是必须先找挖破管线的青澄公司？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "外部第三人挖破排污管线造成污染，污染者不能只说自己没有挖破就把受害人打发走。受害人依法可以向污染者请求赔偿，也可以向有过错的第三人请求赔偿。",
      "污染者赔付后，按照责任关系向第三人追偿。要区分对受害人的赔偿和双方内部最终负担，也要防止同一损失被重复赔偿；本组只练外部第三人独立造成事故的情形。",
    ],
    example: {
      title: "施工挖断的排水管",
      facts:
        "本案为原创教学虚构，发生于2026年9月。沐禾厂的排水管位于登记清楚的地下位置，厂方已完成应有检修并提前向附近施工方交付管线图。独立施工的青澄公司挖土时偏离作业范围，挖破管线，废水经河道流入陆宁的菜地造成损害。调查已经确认青澄公司的挖掘是事故原因，沐禾厂对损害发生没有过错，污染致损及损失均已确认。青澄公司不是厂方委托的环保服务机构。",
      analysis:
        "陆宁可以向沐禾厂索赔，也可以依法向有过错的青澄公司索赔，不必先把施工公司追到手再找厂方。事故虽由施工挖破管线引起，沐禾厂仍不能据此拒绝对受害人承担污染赔偿；赔偿后可向青澄公司追偿。",
    },
    pitfall:
      "把第三人的过错当作污染者对受害人的当然免责，或让受害人就同一笔损失领两份全款。",
    recall: {
      prompt: "陆宁能否向沐禾厂要求赔偿，还是必须先找挖破管线的青澄公司？",
      reference:
        "第三人造成污染事故，受害人仍可向污染者索赔；污染者赔偿后，再依法向有过错的第三人追偿。",
    },
    sources: [
      "civil-environment-objects-code1229",
      "civil-environment-objects-third2026",
      "civil-environment-objects-ecocode1080",
    ],
    exercises: [
      {
        caseId: "civil-environment-objects-environment-pipe-third",
        relatedTopicIds: ["civil-environment-third-party"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐禾厂的排水管位于登记清楚的地下位置，厂方已完成应有检修并提前向附近施工方交付管线图。独立施工的青澄公司挖土时偏离作业范围，挖破管线，废水经河道流入陆宁的菜地造成损害。调查已经确认青澄公司的挖掘是事故原因，沐禾厂对损害发生没有过错，污染致损及损失均已确认。青澄公司不是厂方委托的环保服务机构。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "陆宁可以向沐禾厂索赔，也可以依法向有过错的青澄公司索赔，不必先把施工公司追到手再找厂方。事故虽由施工挖破管线引起，沐禾厂仍不能据此拒绝对受害人承担污染赔偿；赔偿后可向青澄公司追偿。",
        sources: [
          "civil-environment-objects-code1229",
          "civil-environment-objects-third2026",
          "civil-environment-objects-ecocode1080",
        ],
        id: "civil-environment-objects-environment-pipe-third-choice",
        kind: "objective",
        choiceMode: "single",
        title: "施工挖断的排水管：选择判断",
        prompt: "陆宁能否向沐禾厂要求赔偿，还是必须先找挖破管线的青澄公司？",
        options: [
          {
            id: "a",
            text: "只能找施工公司，污染者没有挖土就永远不必负责",
            explanation: "第三人过错不排除受害人依法向污染者请求赔偿。",
          },
          {
            id: "b",
            text: "可以找厂方，不以先向施工公司追赔为前提",
            explanation: "第1233条及现行解释第17、18条区分对外赔偿与内部追偿。",
          },
          {
            id: "c",
            text: "必须先证明厂方与施工公司串通，才能起诉厂方",
            explanation: "普通污染责任不以串通故意为前提。",
          },
          {
            id: "d",
            text: "厂方和施工方各全赔一次，受害人当然拿双倍",
            explanation: "同一损失不得重复受偿。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-environment-objects-environment-pipe-third",
        relatedTopicIds: ["civil-environment-third-party"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐禾厂的排水管位于登记清楚的地下位置，厂方已完成应有检修并提前向附近施工方交付管线图。独立施工的青澄公司挖土时偏离作业范围，挖破管线，废水经河道流入陆宁的菜地造成损害。调查已经确认青澄公司的挖掘是事故原因，沐禾厂对损害发生没有过错，污染致损及损失均已确认。青澄公司不是厂方委托的环保服务机构。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "陆宁可以向沐禾厂索赔，也可以依法向有过错的青澄公司索赔，不必先把施工公司追到手再找厂方。事故虽由施工挖破管线引起，沐禾厂仍不能据此拒绝对受害人承担污染赔偿；赔偿后可向青澄公司追偿。",
        sources: [
          "civil-environment-objects-code1229",
          "civil-environment-objects-third2026",
          "civil-environment-objects-ecocode1080",
        ],
        id: "civil-environment-objects-environment-pipe-third-written",
        kind: "subjective",
        title: "施工挖断的排水管：写出分析",
        prompt:
          "陆宁能否向沐禾厂要求赔偿，还是必须先找挖破管线的青澄公司？请结合案情说明理由。",
        criteria: [
          {
            id: "environment-pipe-choice",
            label: "受害人可直接找污染者",
            meaning:
              "明确受害人可向厂方请求赔偿，不必先找施工公司，也可依法找有过错第三人。",
            acceptable: "说外面的公司挖破不影响受害人先向排污厂索赔即可。",
            boundary: "本案不要求计算两方分担比例或认定共同串通。",
          },
          {
            id: "environment-pipe-recourse",
            label: "第三人过错不等于污染者免责",
            meaning:
              "联系第三人挖破导致排污，说明厂方不能免责，赔后可向有过错施工方追偿。",
            acceptable:
              "说厂先赔受害人，再向挖破管子的公司追，不把问题甩给受害人即可。",
            boundary: "不把此处当然命名为有共同意思的共同侵权。",
          },
        ],
      },
      {
        caseId: "civil-environment-objects-environment-paid-recourse",
        relatedTopicIds: ["civil-environment-third-party"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陈禾为报复青宁厂，趁夜拆开厂区排水设施，污染水流入沈澄的养殖池。录像及调查确认损害全部由这次破坏引起，厂方检修、防护均符合要求，对本次损害没有过错；陈禾不是受托环保机构。沈澄的损失核定为6万元，青宁厂已向其全额支付6万元。厂方现要求陈禾偿还这6万元。陈禾称既然厂方依法有赔偿义务，付了钱就不得再找自己。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "青宁厂可以向陈禾追偿已赔的6万元。陈禾破坏设施造成这次污染，厂方自己没有过错；厂方先赔不代表最终必须自己负担。沈澄已经获得全部6万元赔偿，不能就同一损失再领一份6万元。",
        sources: [
          "civil-environment-objects-code1229",
          "civil-environment-objects-third2026",
          "civil-environment-objects-ecocode1080",
        ],
        id: "civil-environment-objects-environment-paid-recourse-choice",
        kind: "objective",
        choiceMode: "single",
        title: "厂方已经付出的六万元：选择判断",
        prompt:
          "青宁厂能否向陈禾追偿这6万元？沈澄还能否就同一损失再收陈禾6万元？",
        options: [
          {
            id: "a",
            text: "厂方一旦先赔，就绝对不能向破坏者追偿",
            explanation: "第1233条明确污染者赔后可向有过错第三人追偿。",
          },
          {
            id: "b",
            text: "沈澄可以向二人各收6万元，实际损失无需限制",
            explanation: "不能把同一损失重复受偿。",
          },
          {
            id: "c",
            text: "只有厂方先证明自己故意排污，才可请求追偿",
            explanation: "本案恰是厂方无过错、第三人独立造成污染。",
          },
          {
            id: "d",
            text: "厂方可向陈禾追偿6万元，沈澄不能重复获得同一损失赔偿",
            explanation: "区分受害人对外受偿与责任人之间追偿。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-environment-objects-environment-paid-recourse",
        relatedTopicIds: ["civil-environment-third-party"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陈禾为报复青宁厂，趁夜拆开厂区排水设施，污染水流入沈澄的养殖池。录像及调查确认损害全部由这次破坏引起，厂方检修、防护均符合要求，对本次损害没有过错；陈禾不是受托环保机构。沈澄的损失核定为6万元，青宁厂已向其全额支付6万元。厂方现要求陈禾偿还这6万元。陈禾称既然厂方依法有赔偿义务，付了钱就不得再找自己。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "青宁厂可以向陈禾追偿已赔的6万元。陈禾破坏设施造成这次污染，厂方自己没有过错；厂方先赔不代表最终必须自己负担。沈澄已经获得全部6万元赔偿，不能就同一损失再领一份6万元。",
        sources: [
          "civil-environment-objects-code1229",
          "civil-environment-objects-third2026",
          "civil-environment-objects-ecocode1080",
        ],
        id: "civil-environment-objects-environment-paid-recourse-written",
        kind: "subjective",
        title: "厂方已经付出的六万元：写出分析",
        prompt:
          "青宁厂能否向陈禾追偿这6万元？沈澄还能否就同一损失再收陈禾6万元？请结合案情说明理由。",
        criteria: [
          {
            id: "environment-paid-right",
            label: "厂方可以追偿已赔款",
            meaning: "明确厂方向有过错且独立造成损害的陈禾追偿已付6万元。",
            acceptable: "说破坏的人最终要承担，厂已赔的钱能向他要回即可。",
            boundary: "不再要求证明已给定的厂方无过错，不增加惩罚性金额。",
          },
          {
            id: "environment-paid-once",
            label: "同一损失不重复受偿",
            meaning: "说明受害人已经全部获赔，不能再就同一损失收第二份6万元。",
            acceptable: "说沈澄不能拿双份，陈禾的付款应给先赔的厂方即可。",
            boundary: "未问新的独立损害或惩罚性赔偿，不扩出新请求。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-high-risk-liability",
    title: "高度危险责任与法定免责",
    headline:
      "高度危险物或高压作业致损，不能只用已经尽力来免责；法定免责条件成立时，再按对应条文处理。",
    goal: "青澄公司能否仅凭未查出管理疏漏，就拒绝赔偿货物损失？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "占有、使用强腐蚀性等高度危险物，或者从事高空、高压等活动致人损害，适用高度危险责任。没有日常管理疏漏，并不当然免赔；先确认具体危险类型和责任主体。",
      "高度危险物、高压等活动的条文规定了受害人故意、不可抗力等免责情形，受害人重大过失则可减轻。不同危险类型的例外并不完全相同，不把这份清单机械套到民用核设施或航空器。",
    ],
    example: {
      title: "仓库里的工业原液",
      facts:
        "本案为原创教学虚构，发生于2026年9月。青澄公司占有并使用一批强腐蚀性工业原液。储存罐接口突然泄漏，原液直接损坏相邻库房内陆宁的货物；原液性质、来源和本次致损关系均已确认，本题不按经环境介质扩散的污染案件处理。公司提交完整的合规采购、定期检修和当班检查记录，称没有查出员工操作疏漏，所以不应赔。没有不可抗力、受害人故意或重大过失等其他争议。",
      analysis:
        "不能。青澄公司占有、使用的强腐蚀性原液属于高度危险物，泄漏已经造成陆宁货物损失，应承担相应赔偿。管理记录齐全不等于自动免责；本案也没有给出受害人故意、不可抗力等法定免责事由。",
    },
    pitfall:
      "把没有过错当作通用免责理由，或反过来认为高度危险责任完全没有法定例外。",
    recall: {
      prompt: "青澄公司能否仅凭未查出管理疏漏，就拒绝赔偿货物损失？",
      reference:
        "高度危险物或高压作业致损，不能只用已经尽力来免责；法定免责条件成立时，再按对应条文处理。",
    },
    sources: ["civil-environment-objects-risk1239"],
    exercises: [
      {
        caseId: "civil-environment-objects-risk-corrosive-store",
        relatedTopicIds: ["civil-high-risk-liability"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青澄公司占有并使用一批强腐蚀性工业原液。储存罐接口突然泄漏，原液直接损坏相邻库房内陆宁的货物；原液性质、来源和本次致损关系均已确认，本题不按经环境介质扩散的污染案件处理。公司提交完整的合规采购、定期检修和当班检查记录，称没有查出员工操作疏漏，所以不应赔。没有不可抗力、受害人故意或重大过失等其他争议。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。青澄公司占有、使用的强腐蚀性原液属于高度危险物，泄漏已经造成陆宁货物损失，应承担相应赔偿。管理记录齐全不等于自动免责；本案也没有给出受害人故意、不可抗力等法定免责事由。",
        sources: ["civil-environment-objects-risk1239"],
        id: "civil-environment-objects-risk-corrosive-store-choice",
        kind: "objective",
        choiceMode: "single",
        title: "仓库里的工业原液：选择判断",
        prompt: "青澄公司能否仅凭未查出管理疏漏，就拒绝赔偿货物损失？",
        options: [
          {
            id: "a",
            text: "不能；作为占有使用人，应对本次高度危险物致损承担责任",
            explanation: "第1239条适用，现有事实没有法定免责事由。",
          },
          {
            id: "b",
            text: "只能找生产原液的工人，使用原液的公司一律不负责",
            explanation: "本问是危险物占有使用人的责任，不是只按制造环节归责。",
          },
          {
            id: "c",
            text: "必须先证明公司想毁坏货物，才能要求赔偿",
            explanation: "把故意误列成普通赔偿前提。",
          },
          {
            id: "d",
            text: "能，任何危险物只要有检查记录就不用赔",
            explanation: "高度危险物致损责任不以管理人有过错为必要前提。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-environment-objects-risk-corrosive-store",
        relatedTopicIds: ["civil-high-risk-liability"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青澄公司占有并使用一批强腐蚀性工业原液。储存罐接口突然泄漏，原液直接损坏相邻库房内陆宁的货物；原液性质、来源和本次致损关系均已确认，本题不按经环境介质扩散的污染案件处理。公司提交完整的合规采购、定期检修和当班检查记录，称没有查出员工操作疏漏，所以不应赔。没有不可抗力、受害人故意或重大过失等其他争议。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。青澄公司占有、使用的强腐蚀性原液属于高度危险物，泄漏已经造成陆宁货物损失，应承担相应赔偿。管理记录齐全不等于自动免责；本案也没有给出受害人故意、不可抗力等法定免责事由。",
        sources: ["civil-environment-objects-risk1239"],
        id: "civil-environment-objects-risk-corrosive-store-written",
        kind: "subjective",
        title: "仓库里的工业原液：写出分析",
        prompt:
          "青澄公司能否仅凭未查出管理疏漏，就拒绝赔偿货物损失？请结合案情说明理由。",
        criteria: [
          {
            id: "risk-corrosive-liable",
            label: "危险物使用人承担责任",
            meaning:
              "明确青澄公司不能仅凭管理无疏漏免责，作为危险物占有使用人应赔偿。",
            acceptable:
              "说公司用这种高危险原液造成货损，尽到日常管理也不等于不用赔即可。",
            boundary: "不要求受害人另证员工故意或过失，不改套普通产品缺陷。",
          },
          {
            id: "risk-corrosive-link",
            label: "结合危险性质与致损事实",
            meaning: "联系强腐蚀性原液泄漏直接损坏货物，且无本案法定免责事由。",
            acceptable: "把原液泄漏与这次货损联系清楚即可，不需要背免责清单。",
            boundary: "不要求计算未给金额或另作化学鉴定。",
          },
        ],
      },
      {
        caseId: "civil-environment-objects-risk-voltage-quake",
        relatedTopicIds: ["civil-high-risk-liability"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐青公司经营一处高压设施。一次超出既有可合理预见范围的突发强震直接毁坏设施，电流外泄损坏陆宁财物。鉴定及现场资料确认：设施在震前符合应有建设维护要求，强震是本次损害的唯一原因，即使采取当时合理可行的措施也无法避免或克服该次毁坏及损害。不存在设备老化、处置迟延等其他原因。受害人主张高压活动一律不准援用不可抗力。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可以。本案突发强震具有不能预见、不能避免且不能克服的特征，又是本次损害的唯一原因，沐青公司可依高压活动责任条款主张不可抗力免责。高度危险责任不等于没有例外；如果只是普通天气或设备失修，不能照搬本案结论。",
        sources: ["civil-environment-objects-risk1239"],
        id: "civil-environment-objects-risk-voltage-quake-choice",
        kind: "objective",
        choiceMode: "single",
        title: "地震中的高压设备：选择判断",
        prompt: "按题中已经查明的事实，沐青公司能否主张不可抗力免责？",
        options: [
          {
            id: "a",
            text: "不能，高压作业在任何不可抗力下都必须赔",
            explanation: "第1240条明确保留不可抗力免责。",
          },
          {
            id: "b",
            text: "只要当天发生地震，任何设备失修造成的损害也自动免责",
            explanation: "仍须查清不可抗力与损害的关系，不能忽略其他致损原因。",
          },
          {
            id: "c",
            text: "可以；现有事实证明不可抗力是唯一致损原因",
            explanation: "依本案已确定事实适用第1240条例外。",
          },
          {
            id: "d",
            text: "只有受害人先签免责书，才可能适用不可抗力",
            explanation: "法定免责不以此类事前签字为前提。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-environment-objects-risk-voltage-quake",
        relatedTopicIds: ["civil-high-risk-liability"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐青公司经营一处高压设施。一次超出既有可合理预见范围的突发强震直接毁坏设施，电流外泄损坏陆宁财物。鉴定及现场资料确认：设施在震前符合应有建设维护要求，强震是本次损害的唯一原因，即使采取当时合理可行的措施也无法避免或克服该次毁坏及损害。不存在设备老化、处置迟延等其他原因。受害人主张高压活动一律不准援用不可抗力。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可以。本案突发强震具有不能预见、不能避免且不能克服的特征，又是本次损害的唯一原因，沐青公司可依高压活动责任条款主张不可抗力免责。高度危险责任不等于没有例外；如果只是普通天气或设备失修，不能照搬本案结论。",
        sources: ["civil-environment-objects-risk1239"],
        id: "civil-environment-objects-risk-voltage-quake-written",
        kind: "subjective",
        title: "地震中的高压设备：写出分析",
        prompt:
          "按题中已经查明的事实，沐青公司能否主张不可抗力免责？请结合案情说明理由。",
        criteria: [
          {
            id: "risk-quake-exception",
            label: "高压活动允许不可抗力免责",
            meaning:
              "明确第1240条下可以依法主张不可抗力，而非所有高度危险活动一概无例外。",
            acceptable: "说本案可以免责，高压活动也有不可抗力例外即可。",
            boundary: "不把高压活动例外扩大成核事故或航空器统一规则。",
          },
          {
            id: "risk-quake-cause",
            label: "联系强震及唯一致损原因",
            meaning:
              "联系突发强震无法合理预见避免克服、且是唯一致损原因，说明本案满足免责条件。",
            acceptable:
              "说震前设备合格，这次完全由无法防住的突发强震造成即可。",
            boundary: "不把任何地震、普通天气或设备失修都认定为免责。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-high-risk-possession",
    title: "遗失危险物与非法占有",
    headline:
      "受托人遗失危险物，先看管理责任；危险物被盗，另看所有人和管理人是否尽到高度注意义务。",
    goal: "应由谁承担遗失危险物的责任？能否只凭所有权要求青宁连带赔偿？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "所有人将高度危险物交给他人管理后遗失，原则上由管理人负责；所有人有过错时，才与管理人连带。不要只凭东西原来属于谁，就一概让所有人赔。",
      "盗取等非法占有危险物致损，由非法占有人负责；所有人、管理人若不能证明为防止非法占有已尽高度注意义务，也要与非法占有人承担连带责任。遗失和被盗要分别找对应规则。",
    ],
    example: {
      title: "送到专业仓储机构的容器",
      facts:
        "本案为原创教学虚构，发生于2026年9月。青宁公司把自有的强腐蚀性工业液体交由独立专业仓储机构澄禾仓储实际保管。澄禾搬运时把一只容器落在公共卸货区，没有及时发现。容器随后破裂，直接灼伤途经的陆宁，致损来源及因果关系已确认。证据确认青宁选用合格机构、交付手续完整，并履行应有监督，对遗失没有过错；没有盗取行为。青宁仅因液体属于自己，也被要求与仓储机构连带赔偿。",
      analysis:
        "应由实际受托管理并遗失危险物的澄禾仓储承担责任。青宁已经把危险物交其管理，本案也证明青宁没有相关过错，不能仅凭所有权要求青宁连带赔偿；只有所有人有过错时，才适用与管理人连带的规则。",
    },
    pitfall:
      "把所有人永远免责或永远连带当作固定答案，不区分遗失、受托管理与非法占有。",
    recall: {
      prompt: "应由谁承担遗失危险物的责任？能否只凭所有权要求青宁连带赔偿？",
      reference:
        "受托人遗失危险物，先看管理责任；危险物被盗，另看所有人和管理人是否尽到高度注意义务。",
    },
    sources: [
      "civil-environment-objects-lost1241",
      "civil-environment-objects-illegal1242",
    ],
    exercises: [
      {
        caseId: "civil-environment-objects-risk-entrusted-lost",
        relatedTopicIds: ["civil-high-risk-possession"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青宁公司把自有的强腐蚀性工业液体交由独立专业仓储机构澄禾仓储实际保管。澄禾搬运时把一只容器落在公共卸货区，没有及时发现。容器随后破裂，直接灼伤途经的陆宁，致损来源及因果关系已确认。证据确认青宁选用合格机构、交付手续完整，并履行应有监督，对遗失没有过错；没有盗取行为。青宁仅因液体属于自己，也被要求与仓储机构连带赔偿。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "应由实际受托管理并遗失危险物的澄禾仓储承担责任。青宁已经把危险物交其管理，本案也证明青宁没有相关过错，不能仅凭所有权要求青宁连带赔偿；只有所有人有过错时，才适用与管理人连带的规则。",
        sources: ["civil-environment-objects-lost1241"],
        id: "civil-environment-objects-risk-entrusted-lost-choice",
        kind: "objective",
        choiceMode: "single",
        title: "送到专业仓储机构的容器：选择判断",
        prompt: "应由谁承担遗失危险物的责任？能否只凭所有权要求青宁连带赔偿？",
        options: [
          {
            id: "a",
            text: "所有受托管理案都只能找原所有人，不能找实际管理人",
            explanation: "本案应由管理人承担危险物遗失责任。",
          },
          {
            id: "b",
            text: "澄禾仓储承担责任，青宁无相关过错不因所有权当然连带",
            explanation: "符合第1241条受托管理的分工。",
          },
          {
            id: "c",
            text: "只能由受伤路人自己承担，物品遗失后任何人都不用管",
            explanation: "危险物遗失不使责任消失。",
          },
          {
            id: "d",
            text: "青宁只要保有所有权，就必然与任何受托人连带",
            explanation: "第1241条区分受托管理责任与所有人过错。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-environment-objects-risk-entrusted-lost",
        relatedTopicIds: ["civil-high-risk-possession"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青宁公司把自有的强腐蚀性工业液体交由独立专业仓储机构澄禾仓储实际保管。澄禾搬运时把一只容器落在公共卸货区，没有及时发现。容器随后破裂，直接灼伤途经的陆宁，致损来源及因果关系已确认。证据确认青宁选用合格机构、交付手续完整，并履行应有监督，对遗失没有过错；没有盗取行为。青宁仅因液体属于自己，也被要求与仓储机构连带赔偿。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "应由实际受托管理并遗失危险物的澄禾仓储承担责任。青宁已经把危险物交其管理，本案也证明青宁没有相关过错，不能仅凭所有权要求青宁连带赔偿；只有所有人有过错时，才适用与管理人连带的规则。",
        sources: ["civil-environment-objects-lost1241"],
        id: "civil-environment-objects-risk-entrusted-lost-written",
        kind: "subjective",
        title: "送到专业仓储机构的容器：写出分析",
        prompt:
          "应由谁承担遗失危险物的责任？能否只凭所有权要求青宁连带赔偿？请结合案情说明理由。",
        criteria: [
          {
            id: "risk-lost-manager",
            label: "受托管理人承担遗失责任",
            meaning: "明确由已实际接管并遗失危险物的澄禾仓储承担侵权责任。",
            acceptable:
              "说东西交给仓储保管，是它弄丢并造成伤害，应找仓储负责即可。",
            boundary: "不按盗抢或非法占有规则处理。",
          },
          {
            id: "risk-lost-owner",
            label: "所有人连带以其有过错为条件",
            meaning: "说明青宁没有相关过错，不能只因所有权就要求连带。",
            acceptable:
              "说所有人不是一律连带，这次有证据证明无错所以不连带即可。",
            boundary: "不扩成原所有人在任何受托保管案件都免责。",
          },
        ],
      },
      {
        caseId: "civil-environment-objects-risk-stolen-store",
        relatedTopicIds: ["civil-high-risk-possession"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁进入青禾公司管理的危险品库，取走一桶强腐蚀性原液据为己有。其后陆宁搬运中打翻原液，直接灼伤路人。青禾是原液所有人和实际管理人；值守记录显示库门的锁连续坏了数周未修，危险品对外来人员没有有效隔离，青禾也拿不出其他防盗措施的证据。各方确认陆宁未获授权取走原液，损害确由该桶原液造成。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "青禾不能只用被盗两个字免责。非法占有人陆宁应承担责任；青禾作为所有人、管理人，长期不修库锁又没有有效隔离，不能证明为防止非法占有尽到高度注意义务，也应与陆宁承担连带责任。路人不必只向取走原液的人追赔。",
        sources: ["civil-environment-objects-illegal1242"],
        id: "civil-environment-objects-risk-stolen-store-choice",
        kind: "objective",
        choiceMode: "single",
        title: "没有上锁的危险品库：选择判断",
        prompt:
          "青禾能否只说原液已被盗，就完全退出赔偿？它与陆宁应承担什么责任？",
        options: [
          {
            id: "a",
            text: "能，危险物一被偷走，原管理人不论如何保管都免责",
            explanation: "忽略防止非法占有的高度注意义务。",
          },
          {
            id: "b",
            text: "只有路人先证明青禾愿意伤人，青禾才可能承担责任",
            explanation: "无需证明伤害故意才能适用本条。",
          },
          {
            id: "c",
            text: "陆宁不负责，既然物品来自公司就只能公司赔",
            explanation: "非法占有人仍承担本条规定的侵权责任。",
          },
          {
            id: "d",
            text: "不能；陆宁负责，青禾未证明高度注意义务也应承担连带责任",
            explanation:
              "第1242条明确非法占有与原所有人、管理人的高度注意义务。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-environment-objects-risk-stolen-store",
        relatedTopicIds: ["civil-high-risk-possession"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁进入青禾公司管理的危险品库，取走一桶强腐蚀性原液据为己有。其后陆宁搬运中打翻原液，直接灼伤路人。青禾是原液所有人和实际管理人；值守记录显示库门的锁连续坏了数周未修，危险品对外来人员没有有效隔离，青禾也拿不出其他防盗措施的证据。各方确认陆宁未获授权取走原液，损害确由该桶原液造成。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "青禾不能只用被盗两个字免责。非法占有人陆宁应承担责任；青禾作为所有人、管理人，长期不修库锁又没有有效隔离，不能证明为防止非法占有尽到高度注意义务，也应与陆宁承担连带责任。路人不必只向取走原液的人追赔。",
        sources: ["civil-environment-objects-illegal1242"],
        id: "civil-environment-objects-risk-stolen-store-written",
        kind: "subjective",
        title: "没有上锁的危险品库：写出分析",
        prompt:
          "青禾能否只说原液已被盗，就完全退出赔偿？它与陆宁应承担什么责任？请结合案情说明理由。",
        criteria: [
          {
            id: "risk-stolen-possessor",
            label: "非法占有人承担责任",
            meaning: "指出未经授权取走危险物的陆宁应对原液致损负责。",
            acceptable: "说拿走并占有这桶危险物的人要赔即可。",
            boundary: "不要求评判盗窃罪量刑或财产价值。",
          },
          {
            id: "risk-stolen-joint",
            label: "管理人未证高度注意应连带",
            meaning:
              "联系坏锁长期不修、没有隔离和其他证据，说明青禾未证明高度注意义务，应与陆宁连带。",
            acceptable:
              "说公司连库门都没管好，不能只说被偷就退出，要一同承担连带赔偿即可。",
            boundary:
              "不把所有危险物被盗都自动判所有人连带，须保留高度注意的证明条件。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-building-collapse",
    title: "建筑物倒塌与质量责任",
    headline:
      "建筑物倒塌先查质量和致损原因；建设、施工单位须证明没有质量缺陷，才能排除这项连带责任。",
    goal: "在题中证明状态下，两公司应如何承担倒塌责任？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "建筑物、构筑物等倒塌致人损害，建设单位与施工单位原则上连带负责；能够证明不存在质量缺陷的除外。竣工验收手续本身不一定已经证明完全没有质量缺陷。",
      "如果证据查明建筑原无质量缺陷，倒塌完全由业主后来擅拆承重结构等行为造成，应由造成倒塌的责任人承担侵权责任。不能只看谁原来建过，也不能只看谁目前持有产权。",
    ],
    example: {
      title: "刚交付的连廊",
      facts:
        "本案为原创教学虚构，发生于2026年9月。青禾公司建设、沐澄公司施工的一段商场连廊投入使用后突然坍塌，砸伤正常通行的陆宁。现场和使用记录排除后期改造、超载等其他致损原因。两公司仅提交一般竣工验收表，关于关键连接部位的质量争议没有作出解释，也不能证明该部位不存在质量缺陷。双方称应先由陆宁把具体施工错误查明，否则谁都不用赔。",
      analysis:
        "青禾公司与沐澄公司应承担连带责任。连廊倒塌已经造成损害，两公司又不能证明不存在质量缺陷，不能把查清每处施工错误的任务全部推给陆宁。一般验收表并未解决本案连接部位的质量争议。",
    },
    pitfall:
      "看到倒塌就不查原因地让所有人负责，或把一张验收表当成建设施工方的绝对免责。",
    recall: {
      prompt: "在题中证明状态下，两公司应如何承担倒塌责任？",
      reference:
        "建筑物倒塌先查质量和致损原因；建设、施工单位须证明没有质量缺陷，才能排除这项连带责任。",
    },
    sources: ["civil-environment-objects-collapse1252"],
    exercises: [
      {
        caseId: "civil-environment-objects-building-collapse-unknown-quality",
        relatedTopicIds: ["civil-building-collapse"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾公司建设、沐澄公司施工的一段商场连廊投入使用后突然坍塌，砸伤正常通行的陆宁。现场和使用记录排除后期改造、超载等其他致损原因。两公司仅提交一般竣工验收表，关于关键连接部位的质量争议没有作出解释，也不能证明该部位不存在质量缺陷。双方称应先由陆宁把具体施工错误查明，否则谁都不用赔。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "青禾公司与沐澄公司应承担连带责任。连廊倒塌已经造成损害，两公司又不能证明不存在质量缺陷，不能把查清每处施工错误的任务全部推给陆宁。一般验收表并未解决本案连接部位的质量争议。",
        sources: ["civil-environment-objects-collapse1252"],
        id: "civil-environment-objects-building-collapse-unknown-quality-choice",
        kind: "objective",
        choiceMode: "single",
        title: "刚交付的连廊：选择判断",
        prompt: "在题中证明状态下，两公司应如何承担倒塌责任？",
        options: [
          {
            id: "a",
            text: "两公司应承担连带责任，不能只要求受害人先查清全部施工错误",
            explanation: "第1252条由建设、施工单位证明无质量缺陷。",
          },
          {
            id: "b",
            text: "只要有一般验收表，即使未排除具体质量争议也一律免责",
            explanation: "本案验收表不能直接证明没有质量缺陷。",
          },
          {
            id: "c",
            text: "只有陆宁先指出哪一名工人装错零件，才可能得到赔偿",
            explanation: "不以先查明具体工人为本条责任前提。",
          },
          {
            id: "d",
            text: "两公司必定各赔全部损失两遍",
            explanation: "连带不是允许同一损失重复受偿。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-environment-objects-building-collapse-unknown-quality",
        relatedTopicIds: ["civil-building-collapse"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾公司建设、沐澄公司施工的一段商场连廊投入使用后突然坍塌，砸伤正常通行的陆宁。现场和使用记录排除后期改造、超载等其他致损原因。两公司仅提交一般竣工验收表，关于关键连接部位的质量争议没有作出解释，也不能证明该部位不存在质量缺陷。双方称应先由陆宁把具体施工错误查明，否则谁都不用赔。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "青禾公司与沐澄公司应承担连带责任。连廊倒塌已经造成损害，两公司又不能证明不存在质量缺陷，不能把查清每处施工错误的任务全部推给陆宁。一般验收表并未解决本案连接部位的质量争议。",
        sources: ["civil-environment-objects-collapse1252"],
        id: "civil-environment-objects-building-collapse-unknown-quality-written",
        kind: "subjective",
        title: "刚交付的连廊：写出分析",
        prompt:
          "在题中证明状态下，两公司应如何承担倒塌责任？请结合案情说明理由。",
        criteria: [
          {
            id: "collapse-quality-joint",
            label: "建设施工单位连带负责",
            meaning: "在不能证明无质量缺陷的情况下，判断两公司承担连带责任。",
            acceptable:
              "说受害人可依法找任一方承担全部应赔损失，两方对外连带即可。",
            boundary: "不要求虚构分摊比例，不能说各赔一遍造成双倍。",
          },
          {
            id: "collapse-quality-burden",
            label: "联系质量证明与验收材料",
            meaning:
              "说明两公司未证明无质量缺陷，一般验收手续不足以排除本案具体质量争议。",
            acceptable:
              "说他们拿不出足以排除质量问题的证据，不能要求受害人先找全施工错误即可。",
            boundary: "不把所有验收文件一概说成没有证据价值。",
          },
        ],
      },
      {
        caseId: "civil-environment-objects-building-owner-demolition",
        relatedTopicIds: ["civil-building-collapse"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁购入一处商铺后，为打通店面，未经设计复核便组织拆掉承重墙，随后楼板塌陷砸坏邻店货物。鉴定明确原建筑设计、材料及施工均不存在质量缺陷，本次塌陷完全由此次拆除承重墙引起，没有建设、施工单位其他行为的原因。陆宁主张凡是楼板塌了，都应由原建设单位与施工单位连带赔偿，自己可以退出。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能推给原建设、施工单位。本案已经证明原建筑没有质量缺陷，塌陷完全由陆宁后来拆承重墙造成，应由陆宁承担侵权责任。建筑倒塌的规则不是让原建设、施工方替所有后续改造买单。",
        sources: ["civil-environment-objects-collapse1252"],
        id: "civil-environment-objects-building-owner-demolition-choice",
        kind: "objective",
        choiceMode: "single",
        title: "交付数年后的改造：选择判断",
        prompt: "本次损害能否仍一概推给原建设、施工单位？应由谁负责？",
        options: [
          {
            id: "a",
            text: "陆宁只有卖掉商铺后才可能对拆墙行为负责",
            explanation: "是否出售不决定本次拆墙责任。",
          },
          {
            id: "b",
            text: "能，只要建筑曾由二单位建设施工，它们永远连带",
            explanation: "忽略没有质量缺陷及后来行为独立致损的事实。",
          },
          {
            id: "c",
            text: "不能；原质量已排除，应由擅拆承重墙造成塌陷的陆宁负责",
            explanation: "符合第1252条第二款的致损原因分工。",
          },
          {
            id: "d",
            text: "邻店必须自行承担，因为损害出在别人产权范围",
            explanation: "产权边界不排除擅改致损的侵权责任。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-environment-objects-building-owner-demolition",
        relatedTopicIds: ["civil-building-collapse"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁购入一处商铺后，为打通店面，未经设计复核便组织拆掉承重墙，随后楼板塌陷砸坏邻店货物。鉴定明确原建筑设计、材料及施工均不存在质量缺陷，本次塌陷完全由此次拆除承重墙引起，没有建设、施工单位其他行为的原因。陆宁主张凡是楼板塌了，都应由原建设单位与施工单位连带赔偿，自己可以退出。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能推给原建设、施工单位。本案已经证明原建筑没有质量缺陷，塌陷完全由陆宁后来拆承重墙造成，应由陆宁承担侵权责任。建筑倒塌的规则不是让原建设、施工方替所有后续改造买单。",
        sources: ["civil-environment-objects-collapse1252"],
        id: "civil-environment-objects-building-owner-demolition-written",
        kind: "subjective",
        title: "交付数年后的改造：写出分析",
        prompt:
          "本次损害能否仍一概推给原建设、施工单位？应由谁负责？请结合案情说明理由。",
        criteria: [
          {
            id: "collapse-demolition-cause",
            label: "由后来拆墙的责任人赔偿",
            meaning: "判断陆宁应承担责任，联系擅拆承重墙与本次塌陷的因果关系。",
            acceptable: "说这次就是陆宁拆墙造成，由他负责即可。",
            boundary: "不要求追加本题没有给出的设计人或其他施工者。",
          },
          {
            id: "collapse-demolition-exclusion",
            label: "不再让原建设施工方当然连带",
            meaning:
              "联系鉴定排除原质量缺陷和其他原因，说明原建设施工方不因本次倒塌当然连带。",
            acceptable:
              "说原建筑质量没问题，不能让原建造方替后来擅改赔偿即可。",
            boundary: "不扩成建设施工单位在任何交付后的倒塌案件都免责。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-building-falling",
    title: "悬挂物坠落与追偿",
    headline:
      "招牌等特定物件坠落，所有人、管理人或使用人要证明自己没有过错；赔后可向实际责任人追偿。",
    goal: "店主能否以陆宁未查清具体安装错误为由拒赔，并要求整栋楼住户共同分摊？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "来源明确的店铺招牌脱落伤人，先按悬挂物坠落规则确定责任主体。对自己没有过错的证明，不能简单倒给受害人；也不把这类案件改成整栋楼住户一起补偿。",
      "店主先向受害人赔偿，不妨碍依法向安装错误等实际责任人追偿。先有已赔款，再看他人的责任和追偿范围，不能把追偿理解为让受害人拿双倍。",
    ],
    example: {
      title: "门口脱落的店招",
      facts:
        "本案为原创教学虚构，发生于2026年9月。青禾店自行安装并独自管理、使用的店招从门头脱落，砸伤陆宁。录像、招牌标识均能确认来源，不涉及来源不明的楼上抛物。店主拿不出安装检查或后续维护记录，也无证据证明自己没有过错，只要求陆宁先找出具体是哪颗螺丝由谁装坏。",
      analysis:
        "不能。来源明确的店招由青禾店自行安装管理，店主不能证明自己没有过错，应承担坠落致损责任。陆宁不必先查出每颗螺丝是谁装的；这也不是来源不明的高空抛物，不能让整栋楼住户替店主分摊。",
    },
    pitfall:
      "混淆已知招牌来源与来源不明的高空抛物，或认为谁先赔谁就永远不能追偿。",
    recall: {
      prompt:
        "店主能否以陆宁未查清具体安装错误为由拒赔，并要求整栋楼住户共同分摊？",
      reference:
        "招牌等特定物件坠落，所有人、管理人或使用人要证明自己没有过错；赔后可向实际责任人追偿。",
    },
    sources: ["civil-environment-objects-falling1253"],
    exercises: [
      {
        caseId: "civil-environment-objects-building-sign-fall",
        relatedTopicIds: ["civil-building-falling"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾店自行安装并独自管理、使用的店招从门头脱落，砸伤陆宁。录像、招牌标识均能确认来源，不涉及来源不明的楼上抛物。店主拿不出安装检查或后续维护记录，也无证据证明自己没有过错，只要求陆宁先找出具体是哪颗螺丝由谁装坏。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。来源明确的店招由青禾店自行安装管理，店主不能证明自己没有过错，应承担坠落致损责任。陆宁不必先查出每颗螺丝是谁装的；这也不是来源不明的高空抛物，不能让整栋楼住户替店主分摊。",
        sources: ["civil-environment-objects-falling1253"],
        id: "civil-environment-objects-building-sign-fall-choice",
        kind: "objective",
        choiceMode: "single",
        title: "门口脱落的店招：选择判断",
        prompt:
          "店主能否以陆宁未查清具体安装错误为由拒赔，并要求整栋楼住户共同分摊？",
        options: [
          {
            id: "a",
            text: "店招在外墙，所以任何人都不负维护责任",
            explanation: "外墙位置不消灭具体所有、管理或使用者责任。",
          },
          {
            id: "b",
            text: "店主应负责，不因受害人没查出具体螺丝错误而免责",
            explanation: "第1253条要求相应责任主体证明自己没有过错。",
          },
          {
            id: "c",
            text: "来源已确定也必须让所有住户先均摊",
            explanation: "已知来源的招牌坠落不适用全楼补偿。",
          },
          {
            id: "d",
            text: "受害人必须先证明店主想让招牌掉下来",
            explanation: "无需以故意伤人为责任前提。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-environment-objects-building-sign-fall",
        relatedTopicIds: ["civil-building-falling"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾店自行安装并独自管理、使用的店招从门头脱落，砸伤陆宁。录像、招牌标识均能确认来源，不涉及来源不明的楼上抛物。店主拿不出安装检查或后续维护记录，也无证据证明自己没有过错，只要求陆宁先找出具体是哪颗螺丝由谁装坏。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。来源明确的店招由青禾店自行安装管理，店主不能证明自己没有过错，应承担坠落致损责任。陆宁不必先查出每颗螺丝是谁装的；这也不是来源不明的高空抛物，不能让整栋楼住户替店主分摊。",
        sources: ["civil-environment-objects-falling1253"],
        id: "civil-environment-objects-building-sign-fall-written",
        kind: "subjective",
        title: "门口脱落的店招：写出分析",
        prompt:
          "店主能否以陆宁未查清具体安装错误为由拒赔，并要求整栋楼住户共同分摊？请结合案情说明理由。",
        criteria: [
          {
            id: "sign-fall-shop",
            label: "店主不能证明无过错应负责",
            meaning:
              "明确店主应赔，联系自行安装管理且未证明无过错，而非要求受害人查全安装错误。",
            acceptable:
              "说自己的店招掉下来，店主拿不出无过错证明，不能把责任推开即可。",
            boundary: "不把招牌坠落写成无论能否证明无过错都绝对赔。",
          },
          {
            id: "sign-fall-known",
            label: "不适用来源不明住户补偿",
            meaning: "指出坠物来源明确，不由整栋楼住户共同补偿。",
            acceptable: "说已知是该店招牌，不该让别的住户出钱即可。",
            boundary: "不要求分析本题没有事实支持的物业安全措施。",
          },
        ],
      },
      {
        caseId: "civil-environment-objects-building-sign-recourse",
        relatedTopicIds: ["civil-building-falling"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐禾安装公司为陆宁的店铺安装门头招牌，因使用不合规格的固定件，招牌脱落砸坏沈澄财物。鉴定确认安装错误是本次坠落的唯一原因，损失为3万元；店主已依法向沈澄赔付全部3万元。店主据此要求沐禾安装公司偿还该3万元，安装公司称赔款一付，受害人已无损失，任何人都不得再索款。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可以。店主已经为招牌坠落赔付3万元，而安装公司的错误固定是本次损害的原因，店主有权向安装公司追偿这笔已付款。受害人获赔结束的是其同一损失的受偿，并没有消灭实际责任人对先赔者的追偿责任。",
        sources: ["civil-environment-objects-falling1253"],
        id: "civil-environment-objects-building-sign-recourse-choice",
        kind: "objective",
        choiceMode: "single",
        title: "店主先付出的赔款：选择判断",
        prompt: "店主能否向安装公司追偿已付的3万元？",
        options: [
          {
            id: "a",
            text: "可以无条件要回30万元，不受损失和已赔金额约束",
            explanation: "本题追偿已付3万元，没有其他金额依据。",
          },
          {
            id: "b",
            text: "不能，受害人已经收到钱，实际安装责任也自动消失",
            explanation: "混淆对受害人的赔偿与责任人之间的追偿。",
          },
          {
            id: "c",
            text: "可以，但只能由受害人再拿第二份3万元",
            explanation: "本次是已赔店主追偿，不是受害人重复索赔。",
          },
          {
            id: "d",
            text: "可以；店主可向安装错误的实际责任人追偿已赔3万元",
            explanation: "第1253条允许赔后向其他责任人追偿。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-environment-objects-building-sign-recourse",
        relatedTopicIds: ["civil-building-falling"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐禾安装公司为陆宁的店铺安装门头招牌，因使用不合规格的固定件，招牌脱落砸坏沈澄财物。鉴定确认安装错误是本次坠落的唯一原因，损失为3万元；店主已依法向沈澄赔付全部3万元。店主据此要求沐禾安装公司偿还该3万元，安装公司称赔款一付，受害人已无损失，任何人都不得再索款。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可以。店主已经为招牌坠落赔付3万元，而安装公司的错误固定是本次损害的原因，店主有权向安装公司追偿这笔已付款。受害人获赔结束的是其同一损失的受偿，并没有消灭实际责任人对先赔者的追偿责任。",
        sources: ["civil-environment-objects-falling1253"],
        id: "civil-environment-objects-building-sign-recourse-written",
        kind: "subjective",
        title: "店主先付出的赔款：写出分析",
        prompt: "店主能否向安装公司追偿已付的3万元？请结合案情说明理由。",
        criteria: [
          {
            id: "sign-recourse-right",
            label: "赔后向安装责任人追偿",
            meaning: "判断店主可依法向安装公司追偿，联系固定件错误导致坠落。",
            acceptable:
              "说先赔不代表最终自己承担，装错的人应把这笔赔款付给店主即可。",
            boundary: "不再要求受害人重新起诉或返还已收合理赔款。",
          },
          {
            id: "sign-recourse-sum",
            label: "以已赔的3万元为本题范围",
            meaning: "明确本题追偿已付3万元，区分与受害人重复获赔。",
            acceptable:
              "说3万元由安装公司还给已赔的店主，不是让受害人领两遍即可。",
            boundary: "不增加惩罚性、精神损害或未给出的费用。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-high-rise-throw",
    title: "高空抛物与物业责任",
    headline:
      "查到谁抛的就依法找谁；物业失职另按相应规则负责。查不到时，也不是全楼住户一律均摊。",
    goal: "物业应与陆宁一律连带赔偿，还是按什么顺序和范围负责？其他住户是否当然分摊？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "抛物人已经查明，由其承担侵权责任。物业没有采取必要安全措施的，在依法强制执行该侵权人财产后仍不能履行的范围内，承担与其过错相应的补充责任。不是物业和抛物人当然连带。",
      "经调查到一审法庭辩论终结前仍不明时，失职物业承担与过错相应的责任，其余损害由可能加害的建筑物使用人适当补偿。能够证明自己不是侵权人的使用人可以排除；事后查明具体侵权人，还可依法追偿。",
    ],
    example: {
      title: "录像拍到的一个瓶子",
      facts:
        "本案为原创教学虚构，发生于2026年9月。陆宁从自住公寓窗口抛出玻璃瓶，砸伤楼下沈澄，录像及其本人陈述已经查清。此前该楼多次发生类似抛物，物业收到记录后仍未采取已明确需要且可实施的危险区域防护、警示等措施。审理中已查明物业因此未尽必要安全保障义务，与本次损害有相应联系。沈澄一并起诉陆宁与物业。本题不定具体过错比例。",
      analysis:
        "陆宁作为已经查明的抛物人，应承担侵权责任。失职物业承担的是相应补充责任：依法强制执行陆宁财产后仍不能履行的部分，再按物业过错确定其承担范围，不是一律连带。抛物人已经查清，不能让其他住户当然分摊。",
    },
    pitfall:
      "把已知抛物人与始终不明的两种规则混用，或认为住在同一栋楼就必须出钱。",
    recall: {
      prompt:
        "物业应与陆宁一律连带赔偿，还是按什么顺序和范围负责？其他住户是否当然分摊？",
      reference:
        "查到谁抛的就依法找谁；物业失职另按相应规则负责。查不到时，也不是全楼住户一律均摊。",
    },
    sources: [
      "civil-environment-objects-high-rise1254",
      "civil-environment-objects-high-rise2024",
    ],
    exercises: [
      {
        caseId: "civil-environment-objects-high-rise-known-thrower",
        relatedTopicIds: ["civil-high-rise-throw"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁从自住公寓窗口抛出玻璃瓶，砸伤楼下沈澄，录像及其本人陈述已经查清。此前该楼多次发生类似抛物，物业收到记录后仍未采取已明确需要且可实施的危险区域防护、警示等措施。审理中已查明物业因此未尽必要安全保障义务，与本次损害有相应联系。沈澄一并起诉陆宁与物业。本题不定具体过错比例。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "陆宁作为已经查明的抛物人，应承担侵权责任。失职物业承担的是相应补充责任：依法强制执行陆宁财产后仍不能履行的部分，再按物业过错确定其承担范围，不是一律连带。抛物人已经查清，不能让其他住户当然分摊。",
        sources: [
          "civil-environment-objects-high-rise1254",
          "civil-environment-objects-high-rise2024",
        ],
        id: "civil-environment-objects-high-rise-known-thrower-choice",
        kind: "objective",
        choiceMode: "single",
        title: "录像拍到的一个瓶子：选择判断",
        prompt:
          "物业应与陆宁一律连带赔偿，还是按什么顺序和范围负责？其他住户是否当然分摊？",
        options: [
          {
            id: "a",
            text: "物业负相应补充责任，先依法执行陆宁财产，其他住户不当然分摊",
            explanation: "解释第24条规定具体侵权人已知时的顺序与范围。",
          },
          {
            id: "b",
            text: "只要同楼居住，每户不论能否排除都必须等额出钱",
            explanation: "已查清具体抛物人，不适用不明责任人补偿规则。",
          },
          {
            id: "c",
            text: "物业与陆宁任何情况下都各赔全部损失一次",
            explanation: "既不当然连带，也不得重复受偿。",
          },
          {
            id: "d",
            text: "物业有失职也永远不负责任，所有损失只能找住户均摊",
            explanation: "忽略物业必要安全措施义务及已知侵权人的责任。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-environment-objects-high-rise-known-thrower",
        relatedTopicIds: ["civil-high-rise-throw"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁从自住公寓窗口抛出玻璃瓶，砸伤楼下沈澄，录像及其本人陈述已经查清。此前该楼多次发生类似抛物，物业收到记录后仍未采取已明确需要且可实施的危险区域防护、警示等措施。审理中已查明物业因此未尽必要安全保障义务，与本次损害有相应联系。沈澄一并起诉陆宁与物业。本题不定具体过错比例。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "陆宁作为已经查明的抛物人，应承担侵权责任。失职物业承担的是相应补充责任：依法强制执行陆宁财产后仍不能履行的部分，再按物业过错确定其承担范围，不是一律连带。抛物人已经查清，不能让其他住户当然分摊。",
        sources: [
          "civil-environment-objects-high-rise1254",
          "civil-environment-objects-high-rise2024",
        ],
        id: "civil-environment-objects-high-rise-known-thrower-written",
        kind: "subjective",
        title: "录像拍到的一个瓶子：写出分析",
        prompt:
          "物业应与陆宁一律连带赔偿，还是按什么顺序和范围负责？其他住户是否当然分摊？请结合案情说明理由。",
        criteria: [
          {
            id: "high-known-order",
            label: "失职物业承担相应补充责任",
            meaning:
              "明确陆宁先承担，物业在强制执行其财产后不足范围内按过错补充，而非一律连带。",
            acceptable:
              "说先依法追抛瓶者，执行还不够的部分物业再按自己的失职承担即可。",
            boundary:
              "不能把物业说成无条件补足全部，也不必指定法院未给的金额。",
          },
          {
            id: "high-known-residents",
            label: "具体侵权人已明不向全楼摊派",
            meaning: "指出抛物人已经查明，其他住户无需因同楼身份当然补偿。",
            acceptable: "说不是不明来源，不能让其他邻居替抛物人分摊即可。",
            boundary: "不要求另列刑事处罚或物业是否有保险。",
          },
        ],
      },
      {
        caseId: "civil-environment-objects-high-rise-unknown-users",
        relatedTopicIds: ["civil-high-rise-throw"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。一只玻璃瓶从公寓楼上抛下砸伤沈澄。经公安等调查，可能来源限于四户正在使用的房屋，但到一审法庭辩论终结前仍无法确定具体抛物人。其中丁户提供事故前已将全部临街窗封闭、无人能够从该方向抛物的连续影像与勘查记录，足以证明自己不是侵权人；其余三户不能排除。物业未采取必要防护措施的过错及其与损害的联系已查明。本题不核比例。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "物业先承担与其失职过错相应的责任，沈澄其余损害再由可能加害的房屋使用人适当补偿，不是整栋楼等额摊派。丁户已经证明自己不是侵权人，应予排除；调查范围内其余三户不能只凭没有查到自己，就一概退出补偿。",
        sources: [
          "civil-environment-objects-high-rise1254",
          "civil-environment-objects-high-rise2024",
        ],
        id: "civil-environment-objects-high-rise-unknown-users-choice",
        kind: "objective",
        choiceMode: "single",
        title: "来源楼层的四户：选择判断",
        prompt:
          "物业与相关使用人应如何承担责任？能否把丁户也一律列入等额补偿？",
        options: [
          {
            id: "a",
            text: "所有人均按已确定的共同抛物侵权人承担连带责任",
            explanation: "可能加害使用人的补偿不是已证明共同侵权。",
          },
          {
            id: "b",
            text: "丁户即使已充分排除自身，也必须与全楼等额补偿",
            explanation: "第1254条允许证明自己不是侵权人的使用人排除。",
          },
          {
            id: "c",
            text: "物业失职责任与可能加害使用人的适当补偿应区分，丁户可以排除",
            explanation: "解释第25条与民法典共同确定责任与补偿范围。",
          },
          {
            id: "d",
            text: "只要暂未找出抛物人，已查明物业失职也完全不用承担",
            explanation: "不能把责任人不明当作物业失职免责。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-environment-objects-high-rise-unknown-users",
        relatedTopicIds: ["civil-high-rise-throw"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。一只玻璃瓶从公寓楼上抛下砸伤沈澄。经公安等调查，可能来源限于四户正在使用的房屋，但到一审法庭辩论终结前仍无法确定具体抛物人。其中丁户提供事故前已将全部临街窗封闭、无人能够从该方向抛物的连续影像与勘查记录，足以证明自己不是侵权人；其余三户不能排除。物业未采取必要防护措施的过错及其与损害的联系已查明。本题不核比例。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "物业先承担与其失职过错相应的责任，沈澄其余损害再由可能加害的房屋使用人适当补偿，不是整栋楼等额摊派。丁户已经证明自己不是侵权人，应予排除；调查范围内其余三户不能只凭没有查到自己，就一概退出补偿。",
        sources: [
          "civil-environment-objects-high-rise1254",
          "civil-environment-objects-high-rise2024",
        ],
        id: "civil-environment-objects-high-rise-unknown-users-written",
        kind: "subjective",
        title: "来源楼层的四户：写出分析",
        prompt:
          "物业与相关使用人应如何承担责任？能否把丁户也一律列入等额补偿？请结合案情说明理由。",
        criteria: [
          {
            id: "high-unknown-division",
            label: "物业过错责任与其余补偿分开",
            meaning:
              "明确物业负相应过错责任，其余由可能加害使用人适当补偿，而非当作所有人连带侵权。",
            acceptable:
              "说物业按失职负责，剩余再看可能抛物的住户适当补偿即可。",
            boundary:
              "本案始终不明，不照搬已知抛物人先强制执行的顺序，也不要求计算比例。",
          },
          {
            id: "high-unknown-exclusion",
            label: "排除有充分证明的丁户",
            meaning:
              "指出丁户已证明不是侵权人，应排除；不把全楼或已排除者等额摊派。",
            acceptable: "说证据证明这户不可能抛就不让它补偿，不能一锅端即可。",
            boundary: "不要求所有使用人先查出真正抛物人才能排除自身。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-road-underground",
    title: "公共施工与窨井管理",
    headline:
      "公共道路施工要有明显标志和安全措施；窨井致损，看管理人能否证明尽到管理职责。",
    goal: "施工队能否凭曾经放过纸牌就免除本次责任？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "公共场所或道路上挖坑、修缮地下设施致损，施工人要证明已经设置明显标志并采取安全措施。白天放一块牌子，不当然足以证明夜间已做好防护。",
      "窨井等地下设施致损，管理人要证明尽到管理职责。不能只要求受害人先找出谁拿走井盖，再决定是否履行自己的管理责任；管理人确已履职的案件，则要按相应事实另行判断。",
    ],
    example: {
      title: "夜间的人行道施工坑",
      facts:
        "本案为原创教学虚构，发生于2026年9月。青禾施工队在公共人行道挖坑修地下管线，收工后只在地上放了一张白天能看到的小纸牌。坑边没有护栏、盖板或夜间灯光，纸牌入夜后无法辨认，现场留给行人的路线也未隔离。陆宁按正常路线步行时跌入坑中受伤，现场录像和检查记录确认上述情况。施工队称既然放过一张牌，就已经完成全部安全义务。",
      analysis:
        "不能。公共人行道挖坑，施工队既要设置明显标志，也要采取安全措施。本案夜间纸牌不可辨，坑口又没有护栏、盖板等有效防护，不能证明已经履行这两项要求，应对本次跌伤承担责任。",
    },
    pitfall: "把警示牌等同于所有防护措施，或把井盖被人移动当作管理人自动免责。",
    recall: {
      prompt: "施工队能否凭曾经放过纸牌就免除本次责任？",
      reference:
        "公共道路施工要有明显标志和安全措施；窨井致损，看管理人能否证明尽到管理职责。",
    },
    sources: ["civil-environment-objects-ground1258"],
    exercises: [
      {
        caseId: "civil-environment-objects-road-pit-warning",
        relatedTopicIds: ["civil-road-underground"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾施工队在公共人行道挖坑修地下管线，收工后只在地上放了一张白天能看到的小纸牌。坑边没有护栏、盖板或夜间灯光，纸牌入夜后无法辨认，现场留给行人的路线也未隔离。陆宁按正常路线步行时跌入坑中受伤，现场录像和检查记录确认上述情况。施工队称既然放过一张牌，就已经完成全部安全义务。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。公共人行道挖坑，施工队既要设置明显标志，也要采取安全措施。本案夜间纸牌不可辨，坑口又没有护栏、盖板等有效防护，不能证明已经履行这两项要求，应对本次跌伤承担责任。",
        sources: ["civil-environment-objects-ground1258"],
        id: "civil-environment-objects-road-pit-warning-choice",
        kind: "objective",
        choiceMode: "single",
        title: "夜间的人行道施工坑：选择判断",
        prompt: "施工队能否凭曾经放过纸牌就免除本次责任？",
        options: [
          {
            id: "a",
            text: "必须先证明施工队故意挖坑伤人，才有任何赔偿",
            explanation: "本条不以故意致害为必要条件。",
          },
          {
            id: "b",
            text: "不能；夜间标志不明且缺少防护，未证明已履行法定要求",
            explanation: "符合第1258条第一款的标志和安全措施要求。",
          },
          {
            id: "c",
            text: "只要白天放过任何一块牌子，夜间防护一律无需考虑",
            explanation: "明显标志与安全措施要结合实际通行条件判断。",
          },
          {
            id: "d",
            text: "行人只要走到施工附近，无论如何都自行承担",
            explanation: "正常通行不排除施工人的法定安全责任。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-environment-objects-road-pit-warning",
        relatedTopicIds: ["civil-road-underground"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾施工队在公共人行道挖坑修地下管线，收工后只在地上放了一张白天能看到的小纸牌。坑边没有护栏、盖板或夜间灯光，纸牌入夜后无法辨认，现场留给行人的路线也未隔离。陆宁按正常路线步行时跌入坑中受伤，现场录像和检查记录确认上述情况。施工队称既然放过一张牌，就已经完成全部安全义务。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。公共人行道挖坑，施工队既要设置明显标志，也要采取安全措施。本案夜间纸牌不可辨，坑口又没有护栏、盖板等有效防护，不能证明已经履行这两项要求，应对本次跌伤承担责任。",
        sources: ["civil-environment-objects-ground1258"],
        id: "civil-environment-objects-road-pit-warning-written",
        kind: "subjective",
        title: "夜间的人行道施工坑：写出分析",
        prompt: "施工队能否凭曾经放过纸牌就免除本次责任？请结合案情说明理由。",
        criteria: [
          {
            id: "road-pit-duty",
            label: "明显标志和安全措施均须具备",
            meaning:
              "说明不能只凭放牌免责，公共施工应有明显标志并采取安全措施。",
            acceptable: "说提醒与防护都得做，不是摆个牌就完事即可。",
            boundary: "不强求固定设施名称，只要说明本案有效防护缺失。",
          },
          {
            id: "road-pit-night",
            label: "联系夜间不可辨及无防护",
            meaning:
              "联系纸牌入夜不可辨、坑口无护栏盖板等事实，判断施工队应承担责任。",
            acceptable:
              "说当时夜里看不见警示又没有挡住坑，造成正常行人跌伤，应赔即可。",
            boundary: "不把是否有纸牌单独当作唯一标准，不要求量化过错比例。",
          },
        ],
      },
      {
        caseId: "civil-environment-objects-manhole-missing-cover",
        relatedTopicIds: ["civil-road-underground"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐青公司管理的公共窨井缺盖，陆宁正常走过时坠入受伤。事发前多名居民通过报修系统反映该井盖缺失，公司既没有巡查记录，也没有派人处置、围护或警示的证据。尚未查明是谁移走井盖。公司仅说可能有人偷盖，要求陆宁先找到那个人，自己在此之前不负任何责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。沐青公司是窨井管理人，收到缺盖报修后仍无检查、围护或处置证据，不能证明已经尽到管理职责，应承担本次窨井致损责任。是否另有人移走井盖可以继续查，不能用这个未知情况代替自己的履职证明。",
        sources: ["civil-environment-objects-ground1258"],
        id: "civil-environment-objects-manhole-missing-cover-choice",
        kind: "objective",
        choiceMode: "single",
        title: "缺盖的公共窨井：选择判断",
        prompt: "沐青公司能否以尚未查清移走井盖者为由，完全拒绝承担管理责任？",
        options: [
          {
            id: "a",
            text: "能，只要提出井盖可能被偷，就证明了自己全部无责",
            explanation: "猜测存在第三人并不等于证明已尽管理职责。",
          },
          {
            id: "b",
            text: "管理公司只管收费，任何窨井都无需巡查处置",
            explanation: "忽略地下设施管理人的法定义务。",
          },
          {
            id: "c",
            text: "受害人必须先证明管理人亲手拿走井盖才能请求赔偿",
            explanation: "管理失职责任不以亲手移盖为必要条件。",
          },
          {
            id: "d",
            text: "不能；管理人未证明尽到职责，应承担本次窨井致损责任",
            explanation: "第1258条第二款不以受害人先查到移盖者为管理责任前提。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-environment-objects-manhole-missing-cover",
        relatedTopicIds: ["civil-road-underground"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐青公司管理的公共窨井缺盖，陆宁正常走过时坠入受伤。事发前多名居民通过报修系统反映该井盖缺失，公司既没有巡查记录，也没有派人处置、围护或警示的证据。尚未查明是谁移走井盖。公司仅说可能有人偷盖，要求陆宁先找到那个人，自己在此之前不负任何责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。沐青公司是窨井管理人，收到缺盖报修后仍无检查、围护或处置证据，不能证明已经尽到管理职责，应承担本次窨井致损责任。是否另有人移走井盖可以继续查，不能用这个未知情况代替自己的履职证明。",
        sources: ["civil-environment-objects-ground1258"],
        id: "civil-environment-objects-manhole-missing-cover-written",
        kind: "subjective",
        title: "缺盖的公共窨井：写出分析",
        prompt:
          "沐青公司能否以尚未查清移走井盖者为由，完全拒绝承担管理责任？请结合案情说明理由。",
        criteria: [
          {
            id: "manhole-manager-duty",
            label: "管理人须证明尽到管理职责",
            meaning:
              "明确不能完全拒赔，联系已知缺盖却无巡查处置防护证据，说明管理人未证明履职应负责。",
            acceptable: "说报修都收到还没防护，管理人不能把赔偿一推了之即可。",
            boundary: "不把管理人有无履职的证明问题改成受害人须先找到移盖者。",
          },
          {
            id: "manhole-third-unknown",
            label: "未知移盖者不自动排除管理责任",
            meaning: "说明移盖者未查清不等于公司免责，仍应分别审查其管理职责。",
            acceptable:
              "说可能被偷不能替代管理责任，要查第三人也不妨碍先依法认定失职即可。",
            boundary: "不要求直接确定第三人身份、刑事责任或内部追偿金额。",
          },
        ],
      },
    ],
  },
];

export const civilEnvironmentObjectsChapters = [
  {
    id: "CIV-ENVIRONMENT-TORT",
    title: "环境污染责任与第三人",
    section: "民法",
    topicIds: ["civil-environment-liability", "civil-environment-third-party"],
  },
  {
    id: "CIV-HIGH-RISK-TORT",
    title: "高度危险责任与保管",
    section: "民法",
    topicIds: ["civil-high-risk-liability", "civil-high-risk-possession"],
  },
  {
    id: "CIV-BUILDING-HARM",
    title: "建筑倒塌与悬挂物坠落",
    section: "民法",
    topicIds: ["civil-building-collapse", "civil-building-falling"],
  },
  {
    id: "CIV-OBJECT-HARM",
    title: "高空抛物与公共设施",
    section: "民法",
    topicIds: ["civil-high-rise-throw", "civil-road-underground"],
  },
];

export const civilEnvironmentObjectsExercises =
  civilEnvironmentObjectsTopics.flatMap((topic) => topic.exercises);
export const civilEnvironmentObjectsContentPack = {
  revision: civilEnvironmentObjectsRevision,
  snapshot: {
    topics: civilEnvironmentObjectsTopics,
    sources: civilEnvironmentObjectsSources,
  },
};
export const civilEnvironmentObjectsDefaultQueues = {
  objective: civilEnvironmentObjectsExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilEnvironmentObjectsExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilEnvironmentObjectsQuestion(id: string) {
  const question = civilEnvironmentObjectsExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilEnvironmentObjectsTopicForQuestion(id: string) {
  return civilEnvironmentObjectsTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilEnvironmentObjectsSameCaseQuestions(id: string) {
  const question = civilEnvironmentObjectsQuestion(id);
  return question
    ? structuredClone(
        civilEnvironmentObjectsExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilEnvironmentObjectsChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilEnvironmentObjectsChapters.find(
    (c) => c.id === chapterId,
  );
  return chapter
    ? civilEnvironmentObjectsTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
