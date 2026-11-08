import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilEducationProductRevision =
  "civil-education-product-2026-10-23.v1";

export const civilEducationProductSources: ContentSources = {
  "civil-education-product-school1199": {
    title: "《民法典》第19、20、1199、1200条：教育机构对在校学生的责任",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方正式原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。两案分别为6岁、12岁学生。第1199条由机构证明尽到教育管理职责以免责；第1200条以未尽职责为责任条件。两案不涉及校外第三人、体育对抗自甘风险或监护人内部责任，不因在校受伤就一律归责。",
  },
  "civil-education-product-outsider1201": {
    title: "《民法典》第1201条：校外第三人致害与学校补充责任",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方正式原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。第三人均非学生或学校工作人员，在学习生活期间造成未成年学生人身损害。机构未尽管理职责承担相应补充责任，承担后可向第三人追偿；不作无条件连带或各半。",
  },
  "civil-education-product-outsider14": {
    title: "侵权责任编解释（一）第14条：补充责任执行顺序与第三人未确定",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-3485.html",
    note: "2026-10-23直接核读官方正式原文。法释〔2024〕12号，最高人民法院页面2024-09-26发布，自2024-09-27施行；不是征求意见稿。已确定第三人时，在其财产依法强制执行后仍不能履行的范围内，由学校承担与过错相应的补充责任；第三人不确定时，未尽管理职责的机构先行承担与过错相应的责任，不能无限等待。数额案仅算已给责任范围和未受偿差额。",
  },
  "civil-education-product-defect1202": {
    title: "《民法典》第1202、1203条：缺陷产品致害与赔偿请求对象",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方正式原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。产品故障和因果关系由检测资料证实，无误用或其他免责争议。受害人可向生产者或销售者请求；不以受害人与其直接签订买卖合同为前提。两案只讨论侵权请求，不计算违约金、消费欺诈倍数或平台责任。",
  },
  "civil-education-product-own-loss19": {
    title: "侵权责任编解释（一）第19条：缺陷产品自身和其他财产损失",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-3485.html",
    note: "2026-10-23直接核读官方正式原文。法释〔2024〕12号，最高人民法院页面2024-09-26发布，自2024-09-27施行；不是征求意见稿。买受人的电热壶自身和橱柜均被同次缺陷起火烧坏，损失数额已核定；可请求生产者、销售者赔偿产品本身及其他财产损害。不是任意外观或合同瑕疵都等于危险缺陷。",
  },
  "civil-education-product-recourse1203": {
    title: "《民法典》第1203条：生产与销售之间的赔后追偿",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方正式原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。销售者已合理赔偿4200元，检测确认制造缺陷由生产者造成。只核赔后追偿对象与实际支付额，不把受害人对外请求的选择变成内部最终分担。",
  },
  "civil-education-product-transport1204": {
    title: "《民法典》第1204条：运输者过错致缺陷后的追偿",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方正式原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。销售者先赔4800元，检测和运输录像确认产品在运输中被摔损致缺陷；无制造、销售或受害人其他过错争议。只问销售者赔后向有过错运输者追偿，不讨论尚未支付的追偿或第三人双重赔偿。",
  },
  "civil-education-product-danger1205": {
    title: "《民法典》第1205条：损害发生前消除产品危险",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方正式原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。检测已确认正常使用会漏电危及人身安全；未发生实际伤害不妨碍消除危险请求。不额外支持没有事实依据的精神损害、误工或惩罚性赔偿。",
  },
  "civil-education-product-recall1206": {
    title: "《民法典》第1206条：流通后的补救及召回必要费用",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方正式原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。区分合理必要的召回寄送费用与未及时补救导致的新增损害。费用案寄送方式和30元费用已确认必要合理；扩大损害案给出发现缺陷、错误答复及继续使用导致新损害的因果资料。",
  },
  "civil-education-product-punitive1207": {
    title: "《民法典》第1207条：明知缺陷仍生产销售并致严重健康损害",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方正式原文。《民法典》2020-05-28通过、2021-01-01施行；北京市政府页面2020-06-02发布并标示有效。内部检测、邮件和持续销售记录证明明知产品缺陷仍然销售，正常使用导致双手深度烧伤、严重永久功能障碍。只问是否有权请求相应惩罚性赔偿，不创设固定倍数，不把一般质量瑕疵或所有召回都认定为惩罚性赔偿。",
  },
};

export const civilEducationProductTopics: FaultTopic[] = [
  {
    id: "civil-education-duty",
    title: "教育管理职责与学生年龄",
    headline:
      "低龄学生在园受伤，园方要证明已经尽到职责才能免责；较大未成年学生在校受伤，要看学校是否未尽教育管理职责。",
    goal: "幼儿园能否仅以家长没有证明具体教师犯错为由拒绝承担责任？",
    prerequisite: "能分清受害人、直接致害人和本题所问的责任主体。",
    minutes: "6–10",
    paragraphs: [
      "无民事行为能力人在园校学习、生活期间受到人身损害，园校应承担责任；能够证明已尽教育管理职责，才可以免责。不能只把证明教师过错的要求丢给幼儿家长。",
      "限制民事行为能力人在校受伤，学校未尽教育管理职责才承担责任。要联系设施维护、活动安排或现场管理的具体问题，不能把在校受伤等同于学校一律有责。",
    ],
    example: {
      title: "活动课上的道具",
      facts:
        "本案为原创教学虚构。6岁的小禾在青澄幼儿园参加老师组织的室内活动，站立的大型道具倒下砸伤其手臂。录像确认小禾正在老师安排的区域活动，没有外人介入。园方未提供道具检查、固定措施及活动时看护的证据，只说家长没有指出到底哪名老师犯了错，所以园方不应赔偿。本问只判断该抗辩及教育管理职责的证明问题。",
      analysis:
        "不能这样拒绝。小禾只有6岁，在园内参加学习活动时受伤，幼儿园要证明自己已经尽到教育、管理职责，才能据此免责。园方没有拿出道具检查、固定和看护等证据，只要求家长先指出老师哪里错了，不能代替自己的证明。",
    },
    pitfall: "不区分学生年龄与行为能力，或把学校说成所有在校伤害的保险人。",
    recall: {
      prompt: "幼儿园能否仅以家长没有证明具体教师犯错为由拒绝承担责任？",
      reference:
        "低龄学生在园受伤，园方要证明已经尽到职责才能免责；较大未成年学生在校受伤，要看学校是否未尽教育管理职责。",
    },
    sources: ["civil-education-product-school1199"],
    exercises: [
      {
        caseId: "civil-education-product-school-young-child",
        relatedTopicIds: ["civil-education-duty"],
        facts:
          "本案为原创教学虚构。6岁的小禾在青澄幼儿园参加老师组织的室内活动，站立的大型道具倒下砸伤其手臂。录像确认小禾正在老师安排的区域活动，没有外人介入。园方未提供道具检查、固定措施及活动时看护的证据，只说家长没有指出到底哪名老师犯了错，所以园方不应赔偿。本问只判断该抗辩及教育管理职责的证明问题。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能这样拒绝。小禾只有6岁，在园内参加学习活动时受伤，幼儿园要证明自己已经尽到教育、管理职责，才能据此免责。园方没有拿出道具检查、固定和看护等证据，只要求家长先指出老师哪里错了，不能代替自己的证明。",
        sources: ["civil-education-product-school1199"],
        id: "civil-education-product-school-young-child-choice",
        kind: "objective",
        choiceMode: "single",
        title: "活动课上的道具：选择判断",
        prompt: "幼儿园能否仅以家长没有证明具体教师犯错为由拒绝承担责任？",
        options: [
          {
            id: "a",
            text: "幼儿园应证明尽到教育管理职责，不能仅凭家长未指出具体教师过错而免责",
            explanation: "6岁幼儿适用第1199条。",
          },
          {
            id: "b",
            text: "家长必须先找出具体教师的过错，否则幼儿园当然免责",
            explanation: "忽略无民事行为能力人受伤时第1199条的规则。",
          },
          {
            id: "c",
            text: "幼儿园任何情况下都不得证明自己尽到职责",
            explanation: "第1199条允许机构证明尽责而免责。",
          },
          {
            id: "d",
            text: "只能让6岁的小禾自己承担全部伤害损失",
            explanation: "无此一概由幼儿自担的规则。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-education-product-school-young-child",
        relatedTopicIds: ["civil-education-duty"],
        facts:
          "本案为原创教学虚构。6岁的小禾在青澄幼儿园参加老师组织的室内活动，站立的大型道具倒下砸伤其手臂。录像确认小禾正在老师安排的区域活动，没有外人介入。园方未提供道具检查、固定措施及活动时看护的证据，只说家长没有指出到底哪名老师犯了错，所以园方不应赔偿。本问只判断该抗辩及教育管理职责的证明问题。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能这样拒绝。小禾只有6岁，在园内参加学习活动时受伤，幼儿园要证明自己已经尽到教育、管理职责，才能据此免责。园方没有拿出道具检查、固定和看护等证据，只要求家长先指出老师哪里错了，不能代替自己的证明。",
        sources: ["civil-education-product-school1199"],
        id: "civil-education-product-school-young-child-written",
        kind: "subjective",
        title: "活动课上的道具：写出分析",
        prompt:
          "幼儿园能否仅以家长没有证明具体教师犯错为由拒绝承担责任？请结合案情说明理由。",
        criteria: [
          {
            id: "school-young-rule",
            label: "低龄学生的责任规则",
            meaning:
              "联系6岁幼儿在园内参加活动受伤，指出园方应证明已尽教育管理职责才能免责。",
            acceptable:
              "说幼儿园要拿出已经安全管理和照看的证据即可，不要求说出过错推定术语。",
            boundary:
              "不能把在园受伤说成绝对无条件赔偿，也不能一概要求家长证明过错。",
          },
          {
            id: "school-young-defense",
            label: "园方现有抗辩不足",
            meaning:
              "指出未提供检查固定看护等证据，仅以家长未指出哪名教师犯错为由不能免责。",
            acceptable:
              "联系未能证明道具安全管理或活动看护中的一项即可，不需每项逐字列齐。",
            boundary: "不要求裁定具体赔款或追究某个教师个人责任。",
          },
        ],
      },
      {
        caseId: "civil-education-product-school-railing",
        relatedTopicIds: ["civil-education-duty"],
        facts:
          "本案为原创教学虚构。12岁的小宁在沐青学校课间正常下楼，扶手因固定螺丝松脱而断开，导致他摔伤。此前一周，值班教师三次书面上报扶手晃动，学校一直未安排修理，也没有封闭危险区域或设置替代通道。监控和现场检查确认扶手断开导致摔伤，小宁没有追逐、攀爬或其他异常行为。学校说小宁已经满8岁，不再是幼儿，所以学校没有赔偿责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。小宁虽已满8岁，学校未尽教育管理职责造成其受伤，仍应承担责任。学校多次收到扶手松动的报告却不维修、不隔离，正是本次摔伤的原因；满8岁不等于学校可以不管已知的设施危险。",
        sources: ["civil-education-product-school1199"],
        id: "civil-education-product-school-railing-choice",
        kind: "objective",
        choiceMode: "single",
        title: "反复报修的楼梯扶手：选择判断",
        prompt: "学校能否仅凭小宁已经满8岁而拒绝赔偿？",
        options: [
          {
            id: "a",
            text: "学生已满8岁，学校就不再负任何教育管理义务",
            explanation: "限制民事行为能力人仍受第1200条保护。",
          },
          {
            id: "b",
            text: "只要学生在学校受伤，不必看具体原因，学校永远全部负责",
            explanation: "学校责任须联系未尽职责与损害。",
          },
          {
            id: "c",
            text: "学校明知扶手危险却未处理，造成小宁受伤，应承担责任",
            explanation: "具体维护疏漏与损害有明确联系。",
          },
          {
            id: "d",
            text: "只有校长亲手拆掉扶手，学校才可能承担责任",
            explanation: "不以学校负责人亲自实施损害为前提。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-education-product-school-railing",
        relatedTopicIds: ["civil-education-duty"],
        facts:
          "本案为原创教学虚构。12岁的小宁在沐青学校课间正常下楼，扶手因固定螺丝松脱而断开，导致他摔伤。此前一周，值班教师三次书面上报扶手晃动，学校一直未安排修理，也没有封闭危险区域或设置替代通道。监控和现场检查确认扶手断开导致摔伤，小宁没有追逐、攀爬或其他异常行为。学校说小宁已经满8岁，不再是幼儿，所以学校没有赔偿责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。小宁虽已满8岁，学校未尽教育管理职责造成其受伤，仍应承担责任。学校多次收到扶手松动的报告却不维修、不隔离，正是本次摔伤的原因；满8岁不等于学校可以不管已知的设施危险。",
        sources: ["civil-education-product-school1199"],
        id: "civil-education-product-school-railing-written",
        kind: "subjective",
        title: "反复报修的楼梯扶手：写出分析",
        prompt: "学校能否仅凭小宁已经满8岁而拒绝赔偿？请结合案情说明理由。",
        criteria: [
          {
            id: "school-railing-liability",
            label: "满8岁不排除学校责任",
            meaning:
              "明确学校应赔偿，限制民事行为能力人在校受伤仍适用未尽职责责任。",
            acceptable:
              "说不能因为12岁就让学校免责，学校有管理过错仍要负责即可。",
            boundary: "不能把已满8岁说成学校不负管理责任。",
          },
          {
            id: "school-railing-fault",
            label: "联系已知设施危险",
            meaning: "以多次报修而不维修或隔离，说明学校未尽职责并导致摔伤。",
            acceptable:
              "指出已知扶手松动仍让学生通行，与扶手断开致伤的联系即可。",
            boundary: "不要求计算比例，也不能只说在校受伤所以学校一律负责。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-education-outsider",
    title: "校外第三人侵害与补充责任",
    headline:
      "校外第三人伤害学生，由第三人负责；学校未尽管理职责，承担相应补充责任，赔偿后可向第三人追偿。",
    goal: "学校此时还应支付多少？学校支付后能否向孟川追偿？",
    prerequisite: "能分清受害人、直接致害人和本题所问的责任主体。",
    minutes: "6–10",
    paragraphs: [
      "学生在校学习、生活期间被校外第三人伤害，直接责任由第三人承担。学校若未尽管理职责，承担与其过错相应的补充责任；不是自动各半或学校再赔一遍全部损失。",
      "第三人已确定时，先依法执行其财产，仍不能履行的部分再在学校过错范围内补足。第三人尚未确定时，未尽管理职责的学校先行承担相应责任；找到第三人后，学校依法追偿。",
    ],
    example: {
      title: "校门口的陌生来客",
      facts:
        "本案为原创教学虚构。学校上课期间，校外成年人孟川从多次报修仍未修复的侧门进入校园，伤害了10岁的学生小岚。孟川既不是学生，也不是学校工作人员。法院已确定应赔损失共2万元，学校的侧门管理疏漏对应责任范围最多为6000元。依法对孟川财产强制执行后，小岚实际获得1.6万元，剩余部分孟川目前无财产可供履行。本问不再重定损失或学校过错范围。",
      analysis:
        "学校应补付4000元。2万元损失已获偿1.6万元，只剩4000元未获偿，且没有超过学校6000元的过错责任范围；不能再额外支付6000元。学校补付后，有权向直接伤人的孟川追偿已付的4000元。",
    },
    pitfall:
      "把补充责任算成额外加赔，或因未找到第三人就让有管理疏漏的学校无限等待。",
    recall: {
      prompt: "学校此时还应支付多少？学校支付后能否向孟川追偿？",
      reference:
        "校外第三人伤害学生，由第三人负责；学校未尽管理职责，承担相应补充责任，赔偿后可向第三人追偿。",
    },
    sources: [
      "civil-education-product-outsider1201",
      "civil-education-product-outsider14",
    ],
    exercises: [
      {
        caseId: "civil-education-product-school-outsider-balance",
        relatedTopicIds: ["civil-education-outsider"],
        facts:
          "本案为原创教学虚构。学校上课期间，校外成年人孟川从多次报修仍未修复的侧门进入校园，伤害了10岁的学生小岚。孟川既不是学生，也不是学校工作人员。法院已确定应赔损失共2万元，学校的侧门管理疏漏对应责任范围最多为6000元。依法对孟川财产强制执行后，小岚实际获得1.6万元，剩余部分孟川目前无财产可供履行。本问不再重定损失或学校过错范围。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "学校应补付4000元。2万元损失已获偿1.6万元，只剩4000元未获偿，且没有超过学校6000元的过错责任范围；不能再额外支付6000元。学校补付后，有权向直接伤人的孟川追偿已付的4000元。",
        sources: [
          "civil-education-product-outsider1201",
          "civil-education-product-outsider14",
        ],
        id: "civil-education-product-school-outsider-balance-choice",
        kind: "objective",
        choiceMode: "single",
        title: "校门口的陌生来客：选择判断",
        prompt: "学校此时还应支付多少？学校支付后能否向孟川追偿？",
        options: [
          {
            id: "a",
            text: "学校再付6000元，与孟川已付款多少无关",
            explanation: "补充责任不能使受害人实收超过应受偿损失。",
          },
          {
            id: "b",
            text: "学校一分钱也不用付，因为孟川才是直接致害人",
            explanation: "学校未尽管理职责仍有相应补充责任。",
          },
          {
            id: "c",
            text: "学校补付4000元，支付后可向孟川追偿这4000元",
            explanation: "未获偿差额低于学校过错范围，按4000元补足。",
          },
          {
            id: "d",
            text: "学校与孟川一律各负1万元，不看执行结果",
            explanation: "没有自动各半规则，补充责任还要看未获偿差额。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-education-product-school-outsider-balance",
        relatedTopicIds: ["civil-education-outsider"],
        facts:
          "本案为原创教学虚构。学校上课期间，校外成年人孟川从多次报修仍未修复的侧门进入校园，伤害了10岁的学生小岚。孟川既不是学生，也不是学校工作人员。法院已确定应赔损失共2万元，学校的侧门管理疏漏对应责任范围最多为6000元。依法对孟川财产强制执行后，小岚实际获得1.6万元，剩余部分孟川目前无财产可供履行。本问不再重定损失或学校过错范围。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "学校应补付4000元。2万元损失已获偿1.6万元，只剩4000元未获偿，且没有超过学校6000元的过错责任范围；不能再额外支付6000元。学校补付后，有权向直接伤人的孟川追偿已付的4000元。",
        sources: [
          "civil-education-product-outsider1201",
          "civil-education-product-outsider14",
        ],
        id: "civil-education-product-school-outsider-balance-written",
        kind: "subjective",
        title: "校门口的陌生来客：写出分析",
        prompt:
          "学校此时还应支付多少？学校支付后能否向孟川追偿？请结合案情说明理由。",
        criteria: [
          {
            id: "school-outsider-gap",
            label: "按未获偿差额补充",
            meaning:
              "判断学校补付4000元，联系已执行获偿1.6万元、差额4000元小于6000元范围。",
            acceptable: "用2万减1.6万得4000，说明不能再收6000，含义相同即可。",
            boundary: "不能把6000元当作独立加赔，不要求重定法院已确定的比例。",
          },
          {
            id: "school-outsider-recourse",
            label: "学校赔后向第三人追偿",
            meaning: "指出学校支付后可向孟川追偿实际支付的4000元。",
            acceptable: "说学校先补给孩子，以后可找伤人的孟川要回这笔钱即可。",
            boundary:
              "不把暂时执行不到财产说成追偿权消失，不额外要求本题找到新财产。",
          },
        ],
      },
      {
        caseId: "civil-education-product-school-outsider-unknown",
        relatedTopicIds: ["civil-education-outsider"],
        facts:
          "本案为原创教学虚构。12岁的小澄在学校午间活动时，被一名从后门进入的校外成年人推倒受伤。该人不是学校工作人员或学生，随即逃走。后门门锁已坏多日，值班记录显示学校收到报修却一直未维修，也无人值守；警方调查和监控能确认这一进入、伤人的经过，但暂时仍无法确定该人身份。损害与后门管理疏漏的联系已经查清，具体责任金额本题不算。学校说只有先找到此人并让他赔完，才可能谈学校的责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "学校不能一直等。第三人身份尚未确定，学校又有已查清的后门管理疏漏，应先在与其过错相应的范围内承担责任，不是因此包下全部损失。以后查明直接伤人的第三人，学校对已经承担的赔偿有权向他追偿。",
        sources: [
          "civil-education-product-outsider1201",
          "civil-education-product-outsider14",
        ],
        id: "civil-education-product-school-outsider-unknown-choice",
        kind: "objective",
        choiceMode: "single",
        title: "监控没有拍清的访客：选择判断",
        prompt:
          "学校能否一直等到查明该人的身份才承担责任？以后查明了，学校已支付的赔偿如何处理？",
        options: [
          {
            id: "a",
            text: "第三人身份未确定，学校无论有什么管理疏漏都永远不用赔",
            explanation: "解释第14条规定此时机构先行承担相应责任。",
          },
          {
            id: "b",
            text: "学校应先在管理过错范围内承担责任，查明第三人后可追偿",
            explanation: "区分第三人不确定时的先行责任和后续追偿。",
          },
          {
            id: "c",
            text: "学校应直接承担一切损失，查明第三人后也不能追偿",
            explanation: "既不能无条件包赔，也不能否定法定追偿。",
          },
          {
            id: "d",
            text: "须先证明校方与陌生人共谋，学校才可能承担责任",
            explanation: "未尽管理职责的责任不以共谋为条件。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-education-product-school-outsider-unknown",
        relatedTopicIds: ["civil-education-outsider"],
        facts:
          "本案为原创教学虚构。12岁的小澄在学校午间活动时，被一名从后门进入的校外成年人推倒受伤。该人不是学校工作人员或学生，随即逃走。后门门锁已坏多日，值班记录显示学校收到报修却一直未维修，也无人值守；警方调查和监控能确认这一进入、伤人的经过，但暂时仍无法确定该人身份。损害与后门管理疏漏的联系已经查清，具体责任金额本题不算。学校说只有先找到此人并让他赔完，才可能谈学校的责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "学校不能一直等。第三人身份尚未确定，学校又有已查清的后门管理疏漏，应先在与其过错相应的范围内承担责任，不是因此包下全部损失。以后查明直接伤人的第三人，学校对已经承担的赔偿有权向他追偿。",
        sources: [
          "civil-education-product-outsider1201",
          "civil-education-product-outsider14",
        ],
        id: "civil-education-product-school-outsider-unknown-written",
        kind: "subjective",
        title: "监控没有拍清的访客：写出分析",
        prompt:
          "学校能否一直等到查明该人的身份才承担责任？以后查明了，学校已支付的赔偿如何处理？请结合案情说明理由。",
        criteria: [
          {
            id: "school-unknown-first",
            label: "第三人不确定时先行担责",
            meaning:
              "明确不能无限等待，学校应先在已查明的管理过错范围内承担责任。",
            acceptable:
              "说找不到人不等于有管理疏漏的学校不用赔，先按其过错负责即可。",
            boundary: "不能无条件要求学校包下全部损失，也不要求本题定比例。",
          },
          {
            id: "school-unknown-recourse",
            label: "查明第三人后追偿",
            meaning: "指出学校承担责任后，查明第三人即可向其追偿已承担的赔偿。",
            acceptable: "说明以后找到伤人者，学校能找他要回已赔款即可。",
            boundary: "不能以暂时没有姓名为由否定将来的追偿。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-product-defect",
    title: "缺陷产品致害与请求对象",
    headline:
      "产品缺陷造成损害，受害人可向生产者或销售者索赔；同次事故中被毁的产品本身和其他财产都可纳入损失。",
    goal: "青禾能否以水壶是缺陷产品本身为由，拒赔这600元？本次合理财产损失合计多少？",
    prerequisite: "能分清受害人、直接致害人和本题所问的责任主体。",
    minutes: "6–10",
    paragraphs: [
      "先联系产品哪里出了安全问题、怎样造成损害。缺陷致害成立后，受害人可找生产者，也可找销售者；不是只有直接购货人才能提出侵权请求。",
      "因缺陷起火同时烧坏产品和其他财物，产品本身的损失也可请求赔偿。不能只因被烧的是该产品本身，就把这一项从侵权损失中剔除。",
    ],
    example: {
      title: "烧坏的水壶与橱柜",
      facts:
        "本案为原创教学虚构。陆禾从电器店购买青禾公司生产的电热水壶，按说明加水使用。检测确认，出厂时温控器接线装错，导致壶内起火，水壶和旁边橱柜都被烧坏；不存在使用不当或其他免责争议。合理损失已核定：水壶本身600元、橱柜1800元。陆禾向青禾请求赔偿2400元，青禾说侵权最多赔橱柜，水壶本身不算。",
      analysis:
        "不能拒赔水壶这600元。本次制造缺陷起火，同时烧坏了水壶和橱柜，产品本身与其他财产损失都可以请求赔偿。两项合理损失合计2400元，不能只留下橱柜的1800元。",
    },
    pitfall: "把产品自身损失一概排除，或让受害人只能找直接签合同的店家或厂家。",
    recall: {
      prompt:
        "青禾能否以水壶是缺陷产品本身为由，拒赔这600元？本次合理财产损失合计多少？",
      reference:
        "产品缺陷造成损害，受害人可向生产者或销售者索赔；同次事故中被毁的产品本身和其他财产都可纳入损失。",
    },
    sources: [
      "civil-education-product-defect1202",
      "civil-education-product-own-loss19",
    ],
    exercises: [
      {
        caseId: "civil-education-product-product-kettle-fire",
        relatedTopicIds: ["civil-product-defect"],
        facts:
          "本案为原创教学虚构。陆禾从电器店购买青禾公司生产的电热水壶，按说明加水使用。检测确认，出厂时温控器接线装错，导致壶内起火，水壶和旁边橱柜都被烧坏；不存在使用不当或其他免责争议。合理损失已核定：水壶本身600元、橱柜1800元。陆禾向青禾请求赔偿2400元，青禾说侵权最多赔橱柜，水壶本身不算。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能拒赔水壶这600元。本次制造缺陷起火，同时烧坏了水壶和橱柜，产品本身与其他财产损失都可以请求赔偿。两项合理损失合计2400元，不能只留下橱柜的1800元。",
        sources: [
          "civil-education-product-defect1202",
          "civil-education-product-own-loss19",
        ],
        id: "civil-education-product-product-kettle-fire-choice",
        kind: "objective",
        choiceMode: "single",
        title: "烧坏的水壶与橱柜：选择判断",
        prompt:
          "青禾能否以水壶是缺陷产品本身为由，拒赔这600元？本次合理财产损失合计多少？",
        options: [
          {
            id: "a",
            text: "只赔橱柜1800元，水壶本身永远只能自担",
            explanation: "解释第19条支持本次事故中缺陷产品自身及其他财产损失。",
          },
          {
            id: "b",
            text: "两项均纳入损失，合计2400元",
            explanation: "水壶600元与橱柜1800元都由同次缺陷起火造成。",
          },
          {
            id: "c",
            text: "只赔水壶600元，其他财产损害不能请求",
            explanation: "其他财产损害同样受保护。",
          },
          {
            id: "d",
            text: "必须把全部价款乘三，得出固定7200元",
            explanation: "本题不是消费欺诈倍数赔偿，也无固定乘三依据。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-education-product-product-kettle-fire",
        relatedTopicIds: ["civil-product-defect"],
        facts:
          "本案为原创教学虚构。陆禾从电器店购买青禾公司生产的电热水壶，按说明加水使用。检测确认，出厂时温控器接线装错，导致壶内起火，水壶和旁边橱柜都被烧坏；不存在使用不当或其他免责争议。合理损失已核定：水壶本身600元、橱柜1800元。陆禾向青禾请求赔偿2400元，青禾说侵权最多赔橱柜，水壶本身不算。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能拒赔水壶这600元。本次制造缺陷起火，同时烧坏了水壶和橱柜，产品本身与其他财产损失都可以请求赔偿。两项合理损失合计2400元，不能只留下橱柜的1800元。",
        sources: [
          "civil-education-product-defect1202",
          "civil-education-product-own-loss19",
        ],
        id: "civil-education-product-product-kettle-fire-written",
        kind: "subjective",
        title: "烧坏的水壶与橱柜：写出分析",
        prompt:
          "青禾能否以水壶是缺陷产品本身为由，拒赔这600元？本次合理财产损失合计多少？请结合案情说明理由。",
        criteria: [
          {
            id: "product-kettle-own-loss",
            label: "产品本身也可请求赔偿",
            meaning:
              "判断不能排除水壶600元，联系制造缺陷起火造成产品自身和橱柜损失。",
            acceptable: "说同次缺陷事故中水壶自己烧坏也在侵权赔偿范围内即可。",
            boundary:
              "不要求另行提出违约请求，也不扩展至所有无危险的质量瑕疵。",
          },
          {
            id: "product-kettle-total",
            label: "合理损失合计",
            meaning: "把水壶600元与橱柜1800元合计为2400元。",
            acceptable: "准确逐项列明两笔都应赔，或直接合计2400元即可。",
            boundary: "不额外要求惩罚倍数、精神损失或未给定的折旧计算。",
          },
        ],
      },
      {
        caseId: "civil-education-product-product-gift-lamp",
        relatedTopicIds: ["civil-product-defect"],
        facts:
          "本案为原创教学虚构。沈宁在明禾电器店购买台灯后，送给已成年的女儿沈澄使用。沈澄按说明接通电源时触电受伤。检测确认，灯具出厂时绝缘层存在破口，正常通电就会漏电，本次受伤由该故障造成，没有使用不当或其他免责争议。店方承认销售了这盏灯，却说沈澄本人没有在店里付款，且故障是厂家造成的，所以她不能要求店方承担侵权赔偿。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "能。沈澄是缺陷台灯造成损害的受害人，可以向销售这盏灯的明禾电器店请求赔偿，不必是亲自付款的买受人。故障由厂家造成，影响店方赔后的内部追偿，不会使店方对沈澄当然免责。",
        sources: ["civil-education-product-defect1202"],
        id: "civil-education-product-product-gift-lamp-choice",
        kind: "objective",
        choiceMode: "single",
        title: "父亲送来的台灯：选择判断",
        prompt: "沈澄能否向明禾电器店请求侵权赔偿？",
        options: [
          {
            id: "a",
            text: "沈澄没有亲自付款，永远不能请求产品侵权赔偿",
            explanation: "侵权请求权不以受害人是直接付款买家为条件。",
          },
          {
            id: "b",
            text: "故障在出厂时就有，因此任何销售者都不能成为赔偿请求对象",
            explanation: "第1203条允许受害人向销售者请求。",
          },
          {
            id: "c",
            text: "只有父亲身体受伤时，店方才可能承担责任",
            explanation: "受害人可以是产品使用者或其他被侵权人。",
          },
          {
            id: "d",
            text: "沈澄可向店方请求赔偿，没亲自买货及制造缺陷都不排除该请求",
            explanation: "区分受害人的对外请求与企业内部责任。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-education-product-product-gift-lamp",
        relatedTopicIds: ["civil-product-defect"],
        facts:
          "本案为原创教学虚构。沈宁在明禾电器店购买台灯后，送给已成年的女儿沈澄使用。沈澄按说明接通电源时触电受伤。检测确认，灯具出厂时绝缘层存在破口，正常通电就会漏电，本次受伤由该故障造成，没有使用不当或其他免责争议。店方承认销售了这盏灯，却说沈澄本人没有在店里付款，且故障是厂家造成的，所以她不能要求店方承担侵权赔偿。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "能。沈澄是缺陷台灯造成损害的受害人，可以向销售这盏灯的明禾电器店请求赔偿，不必是亲自付款的买受人。故障由厂家造成，影响店方赔后的内部追偿，不会使店方对沈澄当然免责。",
        sources: ["civil-education-product-defect1202"],
        id: "civil-education-product-product-gift-lamp-written",
        kind: "subjective",
        title: "父亲送来的台灯：写出分析",
        prompt: "沈澄能否向明禾电器店请求侵权赔偿？请结合案情说明理由。",
        criteria: [
          {
            id: "product-gift-victim",
            label: "非买家受害人也可请求",
            meaning:
              "明确沈澄可提出侵权赔偿，不以亲自付款或与店方有合同为前提。",
            acceptable:
              "说她虽是受赠人，也是被缺陷产品伤害的人，有权索赔即可。",
            boundary: "不能把父亲的买卖合同关系当作女儿受害后的请求障碍。",
          },
          {
            id: "product-gift-seller",
            label: "销售者是可选请求对象",
            meaning:
              "说明可向明禾店请求，制造缺陷并不使销售者对受害人当然免责。",
            acceptable:
              "说店方不能只让她找厂家，赔后能否追偿是店方自己的后续问题即可。",
            boundary: "不要求本题具体算内部追偿额，也不要求必须先找厂家。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-product-recourse",
    title: "产品赔偿后的追偿",
    headline:
      "先向受害人赔偿，不代表最终就由自己负担；制造或运输造成缺陷的，赔偿者可以依法向责任方追偿。",
    goal: "沐禾赔偿后能否向远青追偿？追偿的这笔金额是多少？",
    prerequisite: "能分清受害人、直接致害人和本题所问的责任主体。",
    minutes: "6–10",
    paragraphs: [
      "产品缺陷由生产者造成，销售者赔偿后有权向生产者追偿。追偿以已经合理支付的赔偿为基础，不是把受害人已收的钱再收一遍。",
      "运输、仓储等第三人的过错使产品出现缺陷，生产者或销售者赔偿后，也有权向该第三人追偿。要找清缺陷在哪个环节产生，不能仅看最早由谁赔钱。",
    ],
    example: {
      title: "店方先赔的治疗费",
      facts:
        "本案为原创教学虚构。沐禾电器店卖出的取暖器在正常使用时漏电，造成顾客陆宁受伤。检测确认，生产商远青公司在装配时压破内部电线绝缘层，该问题在出厂时就存在，店方运输保管均符合要求。沐禾已向陆宁支付本次受伤合理治疗费4200元，金额和支付事实均无争议。远青说既然店方先赔，就等于自愿把责任全揽下来，不能再找厂家。",
      analysis:
        "沐禾可以向远青追偿已赔付的4200元。缺陷由远青装配时造成，销售者先向顾客赔偿后，仍有权向造成缺陷的生产者追偿。先赔不是自愿放弃追偿，也不是顾客再收一次钱。",
    },
    pitfall:
      "以先赔了就最终负责为由否定追偿，或把运输造成的缺陷直接算成制造缺陷。",
    recall: {
      prompt: "沐禾赔偿后能否向远青追偿？追偿的这笔金额是多少？",
      reference:
        "先向受害人赔偿，不代表最终就由自己负担；制造或运输造成缺陷的，赔偿者可以依法向责任方追偿。",
    },
    sources: [
      "civil-education-product-recourse1203",
      "civil-education-product-transport1204",
    ],
    exercises: [
      {
        caseId: "civil-education-product-product-manufacturer-recourse",
        relatedTopicIds: ["civil-product-recourse"],
        facts:
          "本案为原创教学虚构。沐禾电器店卖出的取暖器在正常使用时漏电，造成顾客陆宁受伤。检测确认，生产商远青公司在装配时压破内部电线绝缘层，该问题在出厂时就存在，店方运输保管均符合要求。沐禾已向陆宁支付本次受伤合理治疗费4200元，金额和支付事实均无争议。远青说既然店方先赔，就等于自愿把责任全揽下来，不能再找厂家。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "沐禾可以向远青追偿已赔付的4200元。缺陷由远青装配时造成，销售者先向顾客赔偿后，仍有权向造成缺陷的生产者追偿。先赔不是自愿放弃追偿，也不是顾客再收一次钱。",
        sources: ["civil-education-product-recourse1203"],
        id: "civil-education-product-product-manufacturer-recourse-choice",
        kind: "objective",
        choiceMode: "single",
        title: "店方先赔的治疗费：选择判断",
        prompt: "沐禾赔偿后能否向远青追偿？追偿的这笔金额是多少？",
        options: [
          {
            id: "a",
            text: "可向远青追偿实际支付的4200元",
            explanation: "制造缺陷由生产者造成，适用第1203条赔后追偿。",
          },
          {
            id: "b",
            text: "先赔就视为放弃一切追偿，只能由店方最终承担",
            explanation: "先承担对外赔偿不等于放弃法定追偿。",
          },
          {
            id: "c",
            text: "店方应要求受害人把4200元全部退回，再自行协商",
            explanation: "受害人已获合理赔偿，不应因此退回。",
          },
          {
            id: "d",
            text: "不看赔款数额，店方可自动向远青索要全部商品营业额",
            explanation: "追偿不是无依据扩大至全部营业额。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-education-product-product-manufacturer-recourse",
        relatedTopicIds: ["civil-product-recourse"],
        facts:
          "本案为原创教学虚构。沐禾电器店卖出的取暖器在正常使用时漏电，造成顾客陆宁受伤。检测确认，生产商远青公司在装配时压破内部电线绝缘层，该问题在出厂时就存在，店方运输保管均符合要求。沐禾已向陆宁支付本次受伤合理治疗费4200元，金额和支付事实均无争议。远青说既然店方先赔，就等于自愿把责任全揽下来，不能再找厂家。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "沐禾可以向远青追偿已赔付的4200元。缺陷由远青装配时造成，销售者先向顾客赔偿后，仍有权向造成缺陷的生产者追偿。先赔不是自愿放弃追偿，也不是顾客再收一次钱。",
        sources: ["civil-education-product-recourse1203"],
        id: "civil-education-product-product-manufacturer-recourse-written",
        kind: "subjective",
        title: "店方先赔的治疗费：写出分析",
        prompt:
          "沐禾赔偿后能否向远青追偿？追偿的这笔金额是多少？请结合案情说明理由。",
        criteria: [
          {
            id: "product-manufacturer-target",
            label: "向制造缺陷方追偿",
            meaning:
              "明确销售者可向远青生产商追偿，并联系装配压破绝缘层的制造原因。",
            acceptable: "说店方先赔顾客后，可以找造成出厂缺陷的厂家要回即可。",
            boundary: "不能把店方先赔说成放弃追偿或自愿承担全部最终责任。",
          },
          {
            id: "product-manufacturer-amount",
            label: "以实际合理赔款为限",
            meaning: "说明本次追偿的是已赔付的4200元。",
            acceptable: "明确这笔合理治疗费4200元可追偿即可。",
            boundary: "不要求重新审核已确认的费用，不能让顾客退回合法赔款。",
          },
        ],
      },
      {
        caseId: "civil-education-product-product-transport-recourse",
        relatedTopicIds: ["civil-product-recourse"],
        facts:
          "本案为原创教学虚构。明禾电器店采购一批电扇，委托启程运输公司从仓库送往门店。运输人员装卸时把整箱电扇从高处摔落，又直接装车继续交付。交付后，一台电扇在顾客正常使用时漏电致伤。运输录像和检测确认，摔落使电扇内部绝缘部件破损并导致本次漏电，出厂时没有这项问题，店方没有参与装卸或另作改装。明禾已合理赔偿顾客4800元。启程说自己只负责运输，从来不生产或销售电扇，所以不可能成为追偿对象。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可以。启程装卸摔落电扇，使绝缘部件破损，进而造成顾客触电；这是运输过错使产品出现缺陷。明禾先赔顾客4800元后，有权向启程追偿这笔钱，不以启程同时是生产者或销售者为条件。",
        sources: ["civil-education-product-transport1204"],
        id: "civil-education-product-product-transport-recourse-choice",
        kind: "objective",
        choiceMode: "single",
        title: "被摔落的整箱电扇：选择判断",
        prompt: "明禾能否向启程运输公司追偿已赔的4800元？",
        options: [
          {
            id: "a",
            text: "不能，只有生产者或销售者才能成为任何产品责任追偿对象",
            explanation: "第1204条明确涵盖有过错的运输、仓储等第三人。",
          },
          {
            id: "b",
            text: "应让已经受伤的顾客承担全部运输风险，返还赔款",
            explanation: "运输责任不能转嫁给正常使用产品的受害人。",
          },
          {
            id: "c",
            text: "可以，启程的运输过错造成缺陷，店方赔后有权向其追偿",
            explanation: "运输录像与检测把缺陷来源及致害联系起来。",
          },
          {
            id: "d",
            text: "只要运输公司收了运费，就须赔偿所有产品事故，不看原因",
            explanation: "需要其过错使产品出现缺陷并造成损害。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-education-product-product-transport-recourse",
        relatedTopicIds: ["civil-product-recourse"],
        facts:
          "本案为原创教学虚构。明禾电器店采购一批电扇，委托启程运输公司从仓库送往门店。运输人员装卸时把整箱电扇从高处摔落，又直接装车继续交付。交付后，一台电扇在顾客正常使用时漏电致伤。运输录像和检测确认，摔落使电扇内部绝缘部件破损并导致本次漏电，出厂时没有这项问题，店方没有参与装卸或另作改装。明禾已合理赔偿顾客4800元。启程说自己只负责运输，从来不生产或销售电扇，所以不可能成为追偿对象。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可以。启程装卸摔落电扇，使绝缘部件破损，进而造成顾客触电；这是运输过错使产品出现缺陷。明禾先赔顾客4800元后，有权向启程追偿这笔钱，不以启程同时是生产者或销售者为条件。",
        sources: ["civil-education-product-transport1204"],
        id: "civil-education-product-product-transport-recourse-written",
        kind: "subjective",
        title: "被摔落的整箱电扇：写出分析",
        prompt: "明禾能否向启程运输公司追偿已赔的4800元？请结合案情说明理由。",
        criteria: [
          {
            id: "product-transport-cause",
            label: "运输过错造成缺陷",
            meaning:
              "联系装卸摔落破坏绝缘部件、导致漏电受伤，说明启程是有过错的第三人。",
            acceptable:
              "说电扇出厂没问题，是运输摔坏后漏电，抓住因果联系即可。",
            boundary:
              "不能仅因收运费就无条件归责，也不能把运输缺陷说成已有制造缺陷。",
          },
          {
            id: "product-transport-recourse",
            label: "赔后向运输者追偿",
            meaning:
              "判断明禾已赔4800元后可向启程追偿，不限于向生产销售企业追偿。",
            acceptable: "说店方能找把货摔坏的运输公司要回这4800元即可。",
            boundary: "不要求退回顾客已获的合理赔偿，不扩大至额外倍数。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-product-prevention",
    title: "消除产品危险与召回费用",
    headline:
      "产品已危及安全，不必等到伤人才能要求消除危险；按召回要求支出的必要费用，应由生产者、销售者负担。",
    goal: "陆澄能否在尚未有人受伤时，要求店方消除这台热水器的危险？",
    prerequisite: "能分清受害人、直接致害人和本题所问的责任主体。",
    minutes: "6–10",
    paragraphs: [
      "产品缺陷已经危及人身、财产安全，受害人可以要求生产者、销售者停止侵害、排除妨碍、消除危险。没有发生实际伤害，不等于必须继续忍受危险。",
      "产品投入流通后发现缺陷，应及时停止销售、警示、召回等。按召回要求支出的必要费用，应由生产者、销售者负担，不应一概让持有人为安全补救自付。",
    ],
    example: {
      title: "检测发现的漏电",
      facts:
        "本案为原创教学虚构。陆澄购买的热水器在例行检测中被发现内部绝缘失效，按正常方式通电会使外壳带电，直接危及使用者安全。检测指出更换绝缘组件可以消除该危险，故障并非安装或使用不当造成。陆澄立即断电，尚未有人受伤，也没有财物烧毁。她要求销售这台热水器的店方采取措施消除危险，店方说必须先有人触电受伤才能谈侵权责任。",
      analysis:
        "可以要求消除危险。检测已确认正常通电会使外壳带电，安全威胁已经存在，不必等到有人触电才提出请求。店方应采取能消除这台热水器危险的措施；本题没有实际伤害，不凭空计算治疗费或惩罚性赔偿。",
    },
    pitfall:
      "认为没伤人就无权要求消除危险，或把召回寄送的必要费用一律留给用户。",
    recall: {
      prompt: "陆澄能否在尚未有人受伤时，要求店方消除这台热水器的危险？",
      reference:
        "产品已危及安全，不必等到伤人才能要求消除危险；按召回要求支出的必要费用，应由生产者、销售者负担。",
    },
    sources: [
      "civil-education-product-danger1205",
      "civil-education-product-recall1206",
    ],
    exercises: [
      {
        caseId: "civil-education-product-product-danger-before-injury",
        relatedTopicIds: ["civil-product-prevention"],
        facts:
          "本案为原创教学虚构。陆澄购买的热水器在例行检测中被发现内部绝缘失效，按正常方式通电会使外壳带电，直接危及使用者安全。检测指出更换绝缘组件可以消除该危险，故障并非安装或使用不当造成。陆澄立即断电，尚未有人受伤，也没有财物烧毁。她要求销售这台热水器的店方采取措施消除危险，店方说必须先有人触电受伤才能谈侵权责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可以要求消除危险。检测已确认正常通电会使外壳带电，安全威胁已经存在，不必等到有人触电才提出请求。店方应采取能消除这台热水器危险的措施；本题没有实际伤害，不凭空计算治疗费或惩罚性赔偿。",
        sources: ["civil-education-product-danger1205"],
        id: "civil-education-product-product-danger-before-injury-choice",
        kind: "objective",
        choiceMode: "single",
        title: "检测发现的漏电：选择判断",
        prompt: "陆澄能否在尚未有人受伤时，要求店方消除这台热水器的危险？",
        options: [
          {
            id: "a",
            text: "无人受伤就不可能提出消除危险的请求",
            explanation: "第1205条针对已经存在的安全危险，不以实际伤害为前提。",
          },
          {
            id: "b",
            text: "断电后用户就必须永远自行忍受故障，店方无需处理",
            explanation: "临时断电不消灭产品本身的危险及消除危险请求。",
          },
          {
            id: "c",
            text: "无需实际损害，用户就自动获得任意三倍赔偿",
            explanation: "消除危险请求不等于无条件惩罚性赔偿。",
          },
          {
            id: "d",
            text: "可以，已经危及人身安全的产品缺陷应当得到消除",
            explanation: "正常使用会漏电的检测结论支持第1205条请求。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-education-product-product-danger-before-injury",
        relatedTopicIds: ["civil-product-prevention"],
        facts:
          "本案为原创教学虚构。陆澄购买的热水器在例行检测中被发现内部绝缘失效，按正常方式通电会使外壳带电，直接危及使用者安全。检测指出更换绝缘组件可以消除该危险，故障并非安装或使用不当造成。陆澄立即断电，尚未有人受伤，也没有财物烧毁。她要求销售这台热水器的店方采取措施消除危险，店方说必须先有人触电受伤才能谈侵权责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可以要求消除危险。检测已确认正常通电会使外壳带电，安全威胁已经存在，不必等到有人触电才提出请求。店方应采取能消除这台热水器危险的措施；本题没有实际伤害，不凭空计算治疗费或惩罚性赔偿。",
        sources: ["civil-education-product-danger1205"],
        id: "civil-education-product-product-danger-before-injury-written",
        kind: "subjective",
        title: "检测发现的漏电：写出分析",
        prompt:
          "陆澄能否在尚未有人受伤时，要求店方消除这台热水器的危险？请结合案情说明理由。",
        criteria: [
          {
            id: "product-danger-request",
            label: "实际受伤前也可消除危险",
            meaning: "明确可以向销售者请求消除危险，不必等到实际触电受伤。",
            acceptable: "说不能要求先伤个人再处理，应先把安全隐患消除即可。",
            boundary: "不把消除危险误作无依据的实际损失或倍数赔偿。",
          },
          {
            id: "product-danger-facts",
            label: "联系已确认的安全威胁",
            meaning:
              "联系绝缘失效、正常通电外壳带电，说明已危及安全，不只是一般不满意。",
            acceptable:
              "指出检测已证实漏电危险，哪怕断电暂时没受伤仍要处理即可。",
            boundary: "不要求用户继续通电试验，不强制列出每一种技术补救方式。",
          },
        ],
      },
      {
        caseId: "civil-education-product-product-recall-postage",
        relatedTopicIds: ["civil-product-prevention"],
        facts:
          "本案为原创教学虚构。青澄公司发现已售出的一批电源适配器存在起火隐患，发布召回通知，要求持有人按指定安全方式寄回。陆宁持有通知所列批次，按要求寄回并支出30元运费。寄送凭证、金额及方式均已确认必要合理，没有其他费用。公司接收产品并免费更换后说，召回已经免费，所以寄送费应一律由用户自己负担。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可以要求承担这30元。陆宁按召回通知支出的寄送费已确认必要合理，属于因召回发生的必要费用，应由青澄负担。免费更换产品，不等于可以把完成召回所必需的运费留给用户。",
        sources: ["civil-education-product-recall1206"],
        id: "civil-education-product-product-recall-postage-choice",
        kind: "objective",
        choiceMode: "single",
        title: "召回时的寄送费：选择判断",
        prompt: "陆宁能否要求青澄承担这30元必要运费？",
        options: [
          {
            id: "a",
            text: "免费换了产品，就永远不用承担任何召回必要费用",
            explanation: "第1206条另行规定召回必要费用的负担。",
          },
          {
            id: "b",
            text: "青澄应承担已确认必要合理的30元召回寄送费",
            explanation: "费用来自按要求实施的召回。",
          },
          {
            id: "c",
            text: "陆宁只能要求运费乘三，不得只要求30元",
            explanation: "必要费用不适用无依据的固定倍数。",
          },
          {
            id: "d",
            text: "除非陆宁已经被起火烧伤，否则运费只能自担",
            explanation: "召回必要费用不以实际被烧伤为条件。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-education-product-product-recall-postage",
        relatedTopicIds: ["civil-product-prevention"],
        facts:
          "本案为原创教学虚构。青澄公司发现已售出的一批电源适配器存在起火隐患，发布召回通知，要求持有人按指定安全方式寄回。陆宁持有通知所列批次，按要求寄回并支出30元运费。寄送凭证、金额及方式均已确认必要合理，没有其他费用。公司接收产品并免费更换后说，召回已经免费，所以寄送费应一律由用户自己负担。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可以要求承担这30元。陆宁按召回通知支出的寄送费已确认必要合理，属于因召回发生的必要费用，应由青澄负担。免费更换产品，不等于可以把完成召回所必需的运费留给用户。",
        sources: ["civil-education-product-recall1206"],
        id: "civil-education-product-product-recall-postage-written",
        kind: "subjective",
        title: "召回时的寄送费：写出分析",
        prompt: "陆宁能否要求青澄承担这30元必要运费？请结合案情说明理由。",
        criteria: [
          {
            id: "product-recall-cost",
            label: "召回必要费用由企业负担",
            meaning:
              "判断青澄应承担这30元，说明费用因按召回要求寄送而必要合理。",
            acceptable:
              "说按它的通知寄回所需30元应该由它承担，免费换货不是免运费责任即可。",
            boundary:
              "不要求另行证明已给定的必要性，不额外支持未经给定的费用或倍数。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-product-aftermarket",
    title: "发现缺陷后的补救与惩罚性赔偿",
    headline:
      "发现缺陷后要及时补救，拖延造成的新增损害也要赔；明知缺陷仍销售并严重损害健康，可请求相应惩罚性赔偿。",
    goal: "青禾能否以产品早已售出为由，拒赔新增加的4000元？",
    prerequisite: "能分清受害人、直接致害人和本题所问的责任主体。",
    minutes: "6–10",
    paragraphs: [
      "产品已经卖出，不代表补救义务结束。发现缺陷后应及时停止销售、警示、召回等；未及时采取有效措施导致损害扩大，扩大的损害也要承担责任。",
      "明知产品存在缺陷仍生产、销售，或者未依法采取有效补救措施，造成死亡或健康严重损害，可以请求相应惩罚性赔偿。不能仅看到普通故障就套用，更不能自行编出统一倍数。",
    ],
    example: {
      title: "客服让继续使用之后",
      facts:
        "本案为原创教学虚构。陆宁的加热柜首次冒火花，烧坏旁边价值500元的隔板，立即向生产商青禾报告。青禾收到实物检测后确认温控器缺陷会使设备继续过热，记录显示更换组件并发出停用警示可以避免再次起火。公司却既未修复、召回，也未向陆宁说明危险，客服仍答复可以照常使用。十天后同一故障再次引燃设备，新增橱柜损失4000元。检测确认该新增损害由原缺陷未处理导致，不存在使用不当等其他因素。本问只讨论新增加的4000元。",
      analysis:
        "不能拒赔这新增的4000元。青禾发现温控器缺陷后仍不修复、不召回、不作停用警示，还让陆宁继续使用，导致损害再次发生并扩大。发现缺陷后未及时有效补救，对扩大的损害也要负责，早已售出不是免责理由。",
    },
    pitfall:
      "把已经售出当作无需补救的理由，或把所有质量问题都自动计算为惩罚性赔偿。",
    recall: {
      prompt: "青禾能否以产品早已售出为由，拒赔新增加的4000元？",
      reference:
        "发现缺陷后要及时补救，拖延造成的新增损害也要赔；明知缺陷仍销售并严重损害健康，可请求相应惩罚性赔偿。",
    },
    sources: [
      "civil-education-product-recall1206",
      "civil-education-product-punitive1207",
    ],
    exercises: [
      {
        caseId: "civil-education-product-product-late-warning",
        relatedTopicIds: ["civil-product-aftermarket"],
        facts:
          "本案为原创教学虚构。陆宁的加热柜首次冒火花，烧坏旁边价值500元的隔板，立即向生产商青禾报告。青禾收到实物检测后确认温控器缺陷会使设备继续过热，记录显示更换组件并发出停用警示可以避免再次起火。公司却既未修复、召回，也未向陆宁说明危险，客服仍答复可以照常使用。十天后同一故障再次引燃设备，新增橱柜损失4000元。检测确认该新增损害由原缺陷未处理导致，不存在使用不当等其他因素。本问只讨论新增加的4000元。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能拒赔这新增的4000元。青禾发现温控器缺陷后仍不修复、不召回、不作停用警示，还让陆宁继续使用，导致损害再次发生并扩大。发现缺陷后未及时有效补救，对扩大的损害也要负责，早已售出不是免责理由。",
        sources: ["civil-education-product-recall1206"],
        id: "civil-education-product-product-late-warning-choice",
        kind: "objective",
        choiceMode: "single",
        title: "客服让继续使用之后：选择判断",
        prompt: "青禾能否以产品早已售出为由，拒赔新增加的4000元？",
        options: [
          {
            id: "a",
            text: "青禾应对未补救造成的新增4000元损害承担责任",
            explanation: "发现缺陷、未采取措施及新增损害之间已有因果资料。",
          },
          {
            id: "b",
            text: "不论是否及时补救，所有后来损失都与企业绝无关系",
            explanation: "须看补救措施与损害扩大之间的联系。",
          },
          {
            id: "c",
            text: "已经卖出就不再有任何补救义务，新增损失由用户自担",
            explanation: "第1206条明确规定投入流通后发现缺陷的补救义务。",
          },
          {
            id: "d",
            text: "只要新增损害是财产损失，必须自动赔三倍",
            explanation: "第1206条的扩大损害责任不等于固定倍数赔偿。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-education-product-product-late-warning",
        relatedTopicIds: ["civil-product-aftermarket"],
        facts:
          "本案为原创教学虚构。陆宁的加热柜首次冒火花，烧坏旁边价值500元的隔板，立即向生产商青禾报告。青禾收到实物检测后确认温控器缺陷会使设备继续过热，记录显示更换组件并发出停用警示可以避免再次起火。公司却既未修复、召回，也未向陆宁说明危险，客服仍答复可以照常使用。十天后同一故障再次引燃设备，新增橱柜损失4000元。检测确认该新增损害由原缺陷未处理导致，不存在使用不当等其他因素。本问只讨论新增加的4000元。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能拒赔这新增的4000元。青禾发现温控器缺陷后仍不修复、不召回、不作停用警示，还让陆宁继续使用，导致损害再次发生并扩大。发现缺陷后未及时有效补救，对扩大的损害也要负责，早已售出不是免责理由。",
        sources: ["civil-education-product-recall1206"],
        id: "civil-education-product-product-late-warning-written",
        kind: "subjective",
        title: "客服让继续使用之后：写出分析",
        prompt:
          "青禾能否以产品早已售出为由，拒赔新增加的4000元？请结合案情说明理由。",
        criteria: [
          {
            id: "product-late-duty",
            label: "发现缺陷后的补救义务",
            meaning:
              "指出售出后发现缺陷仍应及时警示修复召回等，青禾不能以售出免责。",
            acceptable:
              "说已经确认危险还让继续用、不修不召回，违反后续补救义务即可。",
            boundary:
              "无需把三种措施逐项列齐，也不要求本题重新评定第一次500元。",
          },
          {
            id: "product-late-loss",
            label: "对扩大损害负责",
            meaning:
              "判断应对新增加的4000元负责，并联系未处理同一缺陷导致再次起火。",
            acceptable:
              "说如果及时停用修复就能避免这次新损失，新增4000元也该赔即可。",
            boundary: "不能因厂家已售出就切断责任，不自动引入惩罚性倍数。",
          },
        ],
      },
      {
        caseId: "civil-education-product-product-known-defect",
        relatedTopicIds: ["civil-product-aftermarket"],
        facts:
          "本案为原创教学虚构。青澄公司内部检测确认某批取暖器温控件失效，正常使用会持续过热并引燃外罩。检测报告和停销建议已送达负责人，邮件记录显示负责人为赶节前销售仍要求照常出库。陆禾随后购买并按说明使用其中一台，外罩起火导致其双手深度烧伤，经多次植皮仍留下严重永久功能障碍。检测、购买记录和医疗资料确认上述缺陷、继续销售与伤害的联系，无其他免责争议。公司只同意赔偿一般损失，称法律上绝无额外惩罚性赔偿。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "陆禾有权请求相应的惩罚性赔偿。青澄收到报告，明知正常使用会起火，仍继续销售；这一缺陷又造成陆禾双手严重且永久的健康损害，符合第1207条的条件。不能只赔一般损失就一概排除惩罚性赔偿，但本题也不凭空设定统一倍数。",
        sources: ["civil-education-product-punitive1207"],
        id: "civil-education-product-product-known-defect-choice",
        kind: "objective",
        choiceMode: "single",
        title: "继续出库的取暖器：选择判断",
        prompt: "陆禾是否有权请求相应的惩罚性赔偿？本题不计算具体倍数。",
        options: [
          {
            id: "a",
            text: "企业只要同意退货，任何严重健康损害都不能请求惩罚性赔偿",
            explanation: "退货不能当然排除第1207条责任。",
          },
          {
            id: "b",
            text: "无论是否明知、是否有严重后果，任何产品瑕疵一律同倍数惩罚",
            explanation: "惩罚性赔偿有特定条件，并非全部质量纠纷通用。",
          },
          {
            id: "c",
            text: "只有实际死亡才能请求，健康严重损害绝不适用",
            explanation: "第1207条明确包括健康严重损害。",
          },
          {
            id: "d",
            text: "可以请求，明知缺陷仍销售且造成健康严重损害的条件已具备",
            explanation: "报告、继续销售记录及严重永久损害支持该请求。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-education-product-product-known-defect",
        relatedTopicIds: ["civil-product-aftermarket"],
        facts:
          "本案为原创教学虚构。青澄公司内部检测确认某批取暖器温控件失效，正常使用会持续过热并引燃外罩。检测报告和停销建议已送达负责人，邮件记录显示负责人为赶节前销售仍要求照常出库。陆禾随后购买并按说明使用其中一台，外罩起火导致其双手深度烧伤，经多次植皮仍留下严重永久功能障碍。检测、购买记录和医疗资料确认上述缺陷、继续销售与伤害的联系，无其他免责争议。公司只同意赔偿一般损失，称法律上绝无额外惩罚性赔偿。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "陆禾有权请求相应的惩罚性赔偿。青澄收到报告，明知正常使用会起火，仍继续销售；这一缺陷又造成陆禾双手严重且永久的健康损害，符合第1207条的条件。不能只赔一般损失就一概排除惩罚性赔偿，但本题也不凭空设定统一倍数。",
        sources: ["civil-education-product-punitive1207"],
        id: "civil-education-product-product-known-defect-written",
        kind: "subjective",
        title: "继续出库的取暖器：写出分析",
        prompt:
          "陆禾是否有权请求相应的惩罚性赔偿？本题不计算具体倍数。请结合案情说明理由。",
        criteria: [
          {
            id: "product-known-conditions",
            label: "明知仍销售与严重健康损害",
            meaning:
              "联系已收到危险报告仍继续出库，以及缺陷导致双手严重永久损害，说明满足第1207条条件。",
            acceptable:
              "说知道会起火还卖，并导致本案严重伤害，抓住两层条件和联系即可。",
            boundary:
              "不能只因产品有普通故障就一律惩罚，也不要求必须造成死亡。",
          },
          {
            id: "product-known-remedy",
            label: "可请求相应惩罚性赔偿",
            meaning:
              "明确一般赔偿外可请求相应惩罚性赔偿，公司一概排除的主张不成立。",
            acceptable:
              "说这不是只退钱或只赔通常损失，还可主张惩罚性赔偿即可。",
            boundary: "不要求计算倍数，也不能擅自套用三倍、十倍等其他制度。",
          },
        ],
      },
    ],
  },
];

export const civilEducationProductChapters = [
  {
    id: "CIV-TORT-EDUCATION",
    title: "教育机构责任",
    section: "民法",
    topicIds: ["civil-education-duty", "civil-education-outsider"],
  },
  {
    id: "CIV-PRODUCT-LIABILITY",
    title: "缺陷产品责任与追偿",
    section: "民法",
    topicIds: ["civil-product-defect", "civil-product-recourse"],
  },
  {
    id: "CIV-PRODUCT-PREVENTION",
    title: "产品危险与流通后补救",
    section: "民法",
    topicIds: ["civil-product-prevention", "civil-product-aftermarket"],
  },
];

export const civilEducationProductExercises =
  civilEducationProductTopics.flatMap((topic) => topic.exercises);
export const civilEducationProductContentPack = {
  revision: civilEducationProductRevision,
  snapshot: {
    topics: civilEducationProductTopics,
    sources: civilEducationProductSources,
  },
};
export const civilEducationProductDefaultQueues = {
  objective: civilEducationProductExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilEducationProductExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilEducationProductQuestion(id: string) {
  const question = civilEducationProductExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilEducationProductTopicForQuestion(id: string) {
  return civilEducationProductTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilEducationProductSameCaseQuestions(id: string) {
  const question = civilEducationProductQuestion(id);
  return question
    ? structuredClone(
        civilEducationProductExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilEducationProductChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilEducationProductChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilEducationProductTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
