import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilPileTreeRoadRevision = "civil-pile-tree-road-2026-10-23.v1";

export const civilPileTreeRoadSources: ContentSources = {
  "civil-pile-tree-road-stacking1255": {
    title: "《民法典》第1255条：堆放物倒塌、滚落与滑落",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方现行全文。四案均是成堆存放的普通货物，不是固定悬挂物、建筑倒塌或危险化学品。按实际堆放、管理控制识别堆放人；本题不因场地产权让无堆放行为者替代实际堆放人。不能证明无过错才承担本条责任，不改成绝对无过错责任。",
  },
  "civil-pile-tree-road-general1165": {
    title: "《民法典》第1165、1175条：一般过错、过错推定与第三人致损",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方现行全文。第三人撞击案有完整安全堆放和巡查资料，堆放人已证明无过错；第三人驾驶及碰撞事实单独评价，不以喊出第三人三个字自动免除本应履行的职责。仅讨论民事侵权，保险不在本问范围。",
  },
  "civil-pile-tree-road-victim1173": {
    title: "《民法典》第1173条：被侵权人对同一损害的过错",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方现行全文。攀爬案堆放不稳与受害人攀爬共同促成倒塌，不是受害人故意造成全部损害。允许减轻不等于当然免责；不预设统一比例，不引入文体活动自甘风险。",
  },
  "civil-pile-tree-road-tree1257": {
    title: "《民法典》第1257条：林木折断、倾倒与果实坠落",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方现行全文。林木或果实来源、致损关系明确，适用所有人或管理人的过错推定。普通刮风、果实自然成熟不自动证明无过错；有证据证明合理检查防护到位时，不改成绝对赔偿。只核侵权责任，不代做树木病理或气象技术判断。",
  },
  "civil-pile-tree-road-tree-proof": {
    title: "《民法典》第1165、1175、1257条：林木管理证明与外部原因",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方现行全文。外部货车撞树案已有健康检查、修剪、防护资料以及碰撞唯一致损原因，管理人已证明无过错；并非只要称有第三人就免除自身义务。本问不核车辆保险。",
  },
  "civil-pile-tree-road-tree-manager": {
    title: "《民法典》第1257条：果实坠落与实际管理人",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方现行全文。园林公司已经接管日常修剪、巡查与防护且实际控制，不能仅以树不是自己所有为由退出。题目只问该管理人责任，不因此断言所有人在任何委托管理案中都免责或一律连带。",
  },
  "civil-pile-tree-road-obstruction1256": {
    title: "《民法典》第1256条：公共道路堆放、倾倒与遗撒障碍物",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方现行全文。四案均为真实妨碍通行的公共道路物品，致损关系明确；不是合法规范的施工隔离物。本组区分障碍行为人的责任与管理人的清理、防护、警示职责。责任存在不等于当然连带、固定各半或自动补足全部。机动车保险及行政处罚不在本问范围。",
  },
  "civil-pile-tree-road-road-manager": {
    title: "《民法典》第1256条：公共道路管理人的相应责任",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方现行全文。管理主体已明确。第三案收到具体危险信息仍未清理警示防护，未证明履职，负相应责任，不以先查到遗撒者为前提。第四案完整证明及时围护、明显警示和安全绕行，不能只因发生伤害就倒推失职；仅问管理人，不把受害人跨栏等同故意受伤。",
  },
};

export const civilPileTreeRoadTopics: FaultTopic[] = [
  {
    id: "civil-stacked-collapse",
    title: "堆放物倒塌责任",
    headline:
      "堆放物倒塌伤人，先找实际堆放人；他不能证明自己没有过错，就应负责。",
    goal: "青禾公司能否以陆宁没有查清绑带错误为由拒绝承担堆放物责任？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "成堆货箱、板材等倒塌、滚落或滑落致人损害，适用堆放物责任。由堆放人证明自己没有过错，不是先让受害人查清每一处捆扎或支撑错误。",
      "看谁实际堆放、控制货物，不只看场地登记在谁名下。场地所有人与堆放人不是一人时，不能仅凭产权就把堆放人的这项责任转给场地主。",
    ],
    example: {
      title: "通道旁的货箱",
      facts:
        "本案为原创教学虚构，发生于2026年9月。青禾公司把货箱逐层堆在院内来访通道旁，顶部明显向通道倾斜。此前工作人员发消息要求加固，现场一直没有调整或支撑。陆宁按接待人员指引正常走过时，货箱倒塌砸伤了他。录像能够确认货箱来自这堆存货；公司只说陆宁没有查出具体哪根绑带先松开，也交不出检查加固材料。",
      analysis:
        "不能。货箱由青禾公司堆放，倒塌已经造成陆宁受伤；公司又没有证明自己没有过错，应承担堆放物致损责任。货堆倾斜、提醒后仍未加固，已经是本案的重要事实，陆宁不必先查清每根绑带如何松开。",
    },
    pitfall: "把举证任务全推给受害人，或把场地所有人直接当作实际堆放人。",
    recall: {
      prompt: "青禾公司能否以陆宁没有查清绑带错误为由拒绝承担堆放物责任？",
      reference:
        "堆放物倒塌伤人，先找实际堆放人；他不能证明自己没有过错，就应负责。",
    },
    sources: ["civil-pile-tree-road-stacking1255"],
    exercises: [
      {
        caseId: "civil-pile-tree-road-pile-unsupported-boxes",
        relatedTopicIds: ["civil-stacked-collapse"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾公司把货箱逐层堆在院内来访通道旁，顶部明显向通道倾斜。此前工作人员发消息要求加固，现场一直没有调整或支撑。陆宁按接待人员指引正常走过时，货箱倒塌砸伤了他。录像能够确认货箱来自这堆存货；公司只说陆宁没有查出具体哪根绑带先松开，也交不出检查加固材料。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。货箱由青禾公司堆放，倒塌已经造成陆宁受伤；公司又没有证明自己没有过错，应承担堆放物致损责任。货堆倾斜、提醒后仍未加固，已经是本案的重要事实，陆宁不必先查清每根绑带如何松开。",
        sources: ["civil-pile-tree-road-stacking1255"],
        id: "civil-pile-tree-road-pile-unsupported-boxes-choice",
        kind: "objective",
        choiceMode: "single",
        title: "通道旁的货箱：选择判断",
        prompt: "青禾公司能否以陆宁没有查清绑带错误为由拒绝承担堆放物责任？",
        options: [
          {
            id: "a",
            text: "公司应负责，不能把证明堆放无过错的任务全推给受害人",
            explanation: "第1255条要求堆放人证明自己没有过错。",
          },
          {
            id: "b",
            text: "公司只要否认自己想伤人，就已经完成无过错证明",
            explanation: "没有伤害故意不等于没有堆放管理过错。",
          },
          {
            id: "c",
            text: "只有陆宁指出哪根绑带由谁弄松，公司才可能负责",
            explanation: "本条不以受害人查全具体操作人为前提。",
          },
          {
            id: "d",
            text: "普通货物倒塌不属于民事侵权问题",
            explanation: "成堆存货倒塌致损正是本条适用情形。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-pile-tree-road-pile-unsupported-boxes",
        relatedTopicIds: ["civil-stacked-collapse"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾公司把货箱逐层堆在院内来访通道旁，顶部明显向通道倾斜。此前工作人员发消息要求加固，现场一直没有调整或支撑。陆宁按接待人员指引正常走过时，货箱倒塌砸伤了他。录像能够确认货箱来自这堆存货；公司只说陆宁没有查出具体哪根绑带先松开，也交不出检查加固材料。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。货箱由青禾公司堆放，倒塌已经造成陆宁受伤；公司又没有证明自己没有过错，应承担堆放物致损责任。货堆倾斜、提醒后仍未加固，已经是本案的重要事实，陆宁不必先查清每根绑带如何松开。",
        sources: ["civil-pile-tree-road-stacking1255"],
        id: "civil-pile-tree-road-pile-unsupported-boxes-written",
        kind: "subjective",
        title: "通道旁的货箱：写出分析",
        prompt:
          "青禾公司能否以陆宁没有查清绑带错误为由拒绝承担堆放物责任？请结合案情说明理由。",
        criteria: [
          {
            id: "pile-boxes-burden",
            label: "堆放人未证明无过错应负责",
            meaning:
              "明确青禾公司应承担责任，不能把证明自己没有过错的任务全转给陆宁。",
            acceptable:
              "说自己的货堆倒了，拿不出无过错证明，不能要求受害人先查清每根绑带即可。",
            boundary: "不把规则写成即使已经证明没有过错也必然赔。",
          },
          {
            id: "pile-boxes-facts",
            label: "联系倾斜与未加固",
            meaning:
              "联系货堆向通道倾斜、接到提醒后仍未加固及倒塌伤人，说明本案责任依据。",
            acceptable:
              "说货堆本就歪着，提醒后也没管，最后砸伤正常通行的人即可。",
            boundary: "不要求计算未给的赔偿比例或另作材料鉴定。",
          },
        ],
      },
      {
        caseId: "civil-pile-tree-road-pile-rented-yard",
        relatedTopicIds: ["civil-stacked-collapse"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾公司租用沈宁的独立院子存货。院子交付后一直由公司独自使用，公司自行安排货物堆放、捆扎和日常管理，沈宁没有参与。公司堆放的一批板材滑落，砸坏来访者陆宁的物品；公司无法提供安全堆放、固定和检查资料。公司称院子产权属于沈宁，所以堆放人的责任也只能由沈宁承担。本题只问谁应承担这项堆放物责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。实际堆放、控制板材的是青禾公司，公司不能证明自己没有过错，应对板材滑落致损负责。沈宁只是场地所有人，不能仅凭院子产权就被当成堆放人；公司也不能借此把自己的责任全部转走。",
        sources: ["civil-pile-tree-road-stacking1255"],
        id: "civil-pile-tree-road-pile-rented-yard-choice",
        kind: "objective",
        choiceMode: "single",
        title: "租来的存货院子：选择判断",
        prompt: "能否仅凭院子属于沈宁，就让沈宁替代青禾公司承担堆放人责任？",
        options: [
          {
            id: "a",
            text: "能，场地产权人必定就是所有货物的堆放人",
            explanation: "场地产权与实际堆放控制不是同一个事实。",
          },
          {
            id: "b",
            text: "只要使用租来的院子，任何人都不承担货物倒塌责任",
            explanation: "租赁关系不消灭实际堆放人的法定义务。",
          },
          {
            id: "c",
            text: "不能；由实际堆放控制且未证明无过错的青禾公司承担这项责任",
            explanation: "本题针对堆放人责任，不因产权直接替换主体。",
          },
          {
            id: "d",
            text: "货物属于公司，就绝对不必再看公司是否证明无过错",
            explanation: "本条仍保留证明自己没有过错的条件。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-pile-tree-road-pile-rented-yard",
        relatedTopicIds: ["civil-stacked-collapse"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾公司租用沈宁的独立院子存货。院子交付后一直由公司独自使用，公司自行安排货物堆放、捆扎和日常管理，沈宁没有参与。公司堆放的一批板材滑落，砸坏来访者陆宁的物品；公司无法提供安全堆放、固定和检查资料。公司称院子产权属于沈宁，所以堆放人的责任也只能由沈宁承担。本题只问谁应承担这项堆放物责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。实际堆放、控制板材的是青禾公司，公司不能证明自己没有过错，应对板材滑落致损负责。沈宁只是场地所有人，不能仅凭院子产权就被当成堆放人；公司也不能借此把自己的责任全部转走。",
        sources: ["civil-pile-tree-road-stacking1255"],
        id: "civil-pile-tree-road-pile-rented-yard-written",
        kind: "subjective",
        title: "租来的存货院子：写出分析",
        prompt:
          "能否仅凭院子属于沈宁，就让沈宁替代青禾公司承担堆放人责任？请结合案情说明理由。",
        criteria: [
          {
            id: "pile-yard-actor",
            label: "识别实际堆放控制者",
            meaning:
              "指出实际堆放、捆扎管理的是青禾公司，而非仅凭场地产权确定沈宁。",
            acceptable:
              "说谁安排这堆货谁先按堆放人负责，租地不等于把责任甩给地主即可。",
            boundary:
              "只问本项堆放责任，不扩大成任何场地主在所有案件中都免责。",
          },
          {
            id: "pile-yard-proof",
            label: "公司未证明无过错仍应负责",
            meaning:
              "联系公司未提供安全堆放、固定和检查资料，判断不能用产权理由退出本次责任。",
            acceptable:
              "说公司没证明堆放管理没问题，不能只说院子不是自己的就不赔即可。",
            boundary: "不要求分析租金、租赁合同违约或未给出的场地缺陷。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-stacked-contribution",
    title: "堆放物中的第三人与受害人过错",
    headline:
      "第三人介入不必然替堆放人免责，受害人有错也不等于全由自己承担；要分清各自的致损原因。",
    goal: "能否仅因托盘属于沐禾公司，就仍要求其承担堆放物责任？撞击者的行为如何评价？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "堆放人能用完整资料证明堆放安全、检查到位，事故完全由第三人另行撞击造成，可以排除本项堆放过错责任。只有第三人这个说法，而没有自己的履职证明，不够。",
      "堆放本身不稳，受害人又攀爬等促成同一损害，可以依法减轻堆放人的责任。减轻多少要看实际过错和原因，不能直接变成堆放人全免或双方固定各半。",
    ],
    example: {
      title: "倒车撞进了货堆",
      facts:
        "本案为原创教学虚构，发生于2026年9月。沐禾公司在自用院内按安全高度码好托盘，并用合格支架固定，检查记录与现场录像确认堆放稳固、通道留足，支架此前没有缺陷。林禾驾自己的小货车倒车时越过明显界线，直接撞断支架，托盘随即倒下砸伤访客。录像和鉴定确认这次撞击是倒塌的唯一原因，已有证据足以证明公司在堆放管理上没有过错。本题不讨论机动车保险。",
      analysis:
        "不能仅凭托盘属于公司就要求公司赔。本案已有完整资料证明堆放安全，倒塌完全由林禾倒车撞断支架造成，公司可以排除这项堆放过错责任。林禾应对自己驾驶撞击造成的损害依法负责。",
    },
    pitfall: "见到第三人或受害人也有行为，就不再审查堆放人自己的安全义务。",
    recall: {
      prompt:
        "能否仅因托盘属于沐禾公司，就仍要求其承担堆放物责任？撞击者的行为如何评价？",
      reference:
        "第三人介入不必然替堆放人免责，受害人有错也不等于全由自己承担；要分清各自的致损原因。",
    },
    sources: [
      "civil-pile-tree-road-stacking1255",
      "civil-pile-tree-road-general1165",
      "civil-pile-tree-road-victim1173",
    ],
    exercises: [
      {
        caseId: "civil-pile-tree-road-pile-external-collision",
        relatedTopicIds: ["civil-stacked-contribution"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐禾公司在自用院内按安全高度码好托盘，并用合格支架固定，检查记录与现场录像确认堆放稳固、通道留足，支架此前没有缺陷。林禾驾自己的小货车倒车时越过明显界线，直接撞断支架，托盘随即倒下砸伤访客。录像和鉴定确认这次撞击是倒塌的唯一原因，已有证据足以证明公司在堆放管理上没有过错。本题不讨论机动车保险。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能仅凭托盘属于公司就要求公司赔。本案已有完整资料证明堆放安全，倒塌完全由林禾倒车撞断支架造成，公司可以排除这项堆放过错责任。林禾应对自己驾驶撞击造成的损害依法负责。",
        sources: [
          "civil-pile-tree-road-stacking1255",
          "civil-pile-tree-road-general1165",
        ],
        id: "civil-pile-tree-road-pile-external-collision-choice",
        kind: "objective",
        choiceMode: "single",
        title: "倒车撞进了货堆：选择判断",
        prompt:
          "能否仅因托盘属于沐禾公司，就仍要求其承担堆放物责任？撞击者的行为如何评价？",
        options: [
          {
            id: "a",
            text: "公司即使证明堆放无过错，也必须与撞击者一律连带",
            explanation: "把过错推定误改成绝对无过错责任。",
          },
          {
            id: "b",
            text: "公司已证明堆放无过错，可排除本项责任；林禾对撞击致损依法负责",
            explanation: "第1255条无过错证明与第三人自身责任分别处理。",
          },
          {
            id: "c",
            text: "只要有第三人出现，公司不管如何堆放都自动免责",
            explanation:
              "本案免责建立在无过错证明及唯一原因上，不是第三人身份本身。",
          },
          {
            id: "d",
            text: "林禾没有接触受害人身体，所以无须对任何后果负责",
            explanation: "车辆撞击引发托盘致损的因果关系已确认。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-pile-tree-road-pile-external-collision",
        relatedTopicIds: ["civil-stacked-contribution"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐禾公司在自用院内按安全高度码好托盘，并用合格支架固定，检查记录与现场录像确认堆放稳固、通道留足，支架此前没有缺陷。林禾驾自己的小货车倒车时越过明显界线，直接撞断支架，托盘随即倒下砸伤访客。录像和鉴定确认这次撞击是倒塌的唯一原因，已有证据足以证明公司在堆放管理上没有过错。本题不讨论机动车保险。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能仅凭托盘属于公司就要求公司赔。本案已有完整资料证明堆放安全，倒塌完全由林禾倒车撞断支架造成，公司可以排除这项堆放过错责任。林禾应对自己驾驶撞击造成的损害依法负责。",
        sources: [
          "civil-pile-tree-road-stacking1255",
          "civil-pile-tree-road-general1165",
        ],
        id: "civil-pile-tree-road-pile-external-collision-written",
        kind: "subjective",
        title: "倒车撞进了货堆：写出分析",
        prompt:
          "能否仅因托盘属于沐禾公司，就仍要求其承担堆放物责任？撞击者的行为如何评价？请结合案情说明理由。",
        criteria: [
          {
            id: "pile-collision-no-fault",
            label: "证明堆放无过错可排除责任",
            meaning:
              "说明公司不能仅因所有权被要求赔偿，联系安全固定、检查及撞击唯一原因等无过错证明。",
            acceptable:
              "说货本来按要求放稳了，这次全是外车撞塌，公司能证明没错就不用按本条赔即可。",
            boundary: "不把任何有第三人介入都说成自动免责。",
          },
          {
            id: "pile-collision-third",
            label: "撞击者对自身致损负责",
            meaning: "指出林禾应依法对倒车越线撞断支架所致损害承担责任。",
            acceptable: "说实际开车撞坏支架的人应负责即可。",
            boundary: "不核保险、不编造责任比例，也不要求刑事定罪。",
          },
        ],
      },
      {
        caseId: "civil-pile-tree-road-pile-victim-climbing",
        relatedTopicIds: ["civil-stacked-contribution"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。澄宁公司的一堆货箱下层支撑不足，顶部向外倾斜，现场仅拉了一道低围绳并放有禁止攀爬标志，尚未按要求重新码稳。陆宁的帽子落到箱顶，他无视工作人员劝阻，跨过围绳爬上货堆取帽子，货箱倒塌将其压伤。现场资料确认不稳的堆放与攀爬共同促成这次倒塌；陆宁并非为了受伤而行动。公司据此主张只要陆宁也有过错，自己就完全免责。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "公司不能只因陆宁攀爬就全免。公司没有把支撑不足、已经倾斜的货堆码稳，自身仍有致损过错。陆宁无视劝阻和警示攀爬，也促成了同一损害，可以依法减轻公司的责任；具体程度须结合各自过错和原因确定，不是一律全免或各半。",
        sources: [
          "civil-pile-tree-road-stacking1255",
          "civil-pile-tree-road-victim1173",
        ],
        id: "civil-pile-tree-road-pile-victim-climbing-choice",
        kind: "objective",
        choiceMode: "single",
        title: "越过围绳取帽子：选择判断",
        prompt: "公司能否完全免责？陆宁的攀爬对责任有何影响？本题不定比例。",
        options: [
          {
            id: "a",
            text: "公司有不稳堆放也一概全免，只要受害人碰过货箱即可",
            explanation: "受害人过错只依法影响责任，不消除已存在的堆放过错。",
          },
          {
            id: "b",
            text: "受害人有过错时，法律固定要求双方各承担一半",
            explanation: "第1173条没有通用各半公式。",
          },
          {
            id: "c",
            text: "陆宁有过错就意味着公司应当承担更多惩罚性赔偿",
            explanation: "本案未给惩罚性赔偿依据。",
          },
          {
            id: "d",
            text: "公司不当然全免，但可因陆宁对同一损害的过错依法减轻",
            explanation: "区分自身堆放过错与受害人过错分担。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-pile-tree-road-pile-victim-climbing",
        relatedTopicIds: ["civil-stacked-contribution"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。澄宁公司的一堆货箱下层支撑不足，顶部向外倾斜，现场仅拉了一道低围绳并放有禁止攀爬标志，尚未按要求重新码稳。陆宁的帽子落到箱顶，他无视工作人员劝阻，跨过围绳爬上货堆取帽子，货箱倒塌将其压伤。现场资料确认不稳的堆放与攀爬共同促成这次倒塌；陆宁并非为了受伤而行动。公司据此主张只要陆宁也有过错，自己就完全免责。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "公司不能只因陆宁攀爬就全免。公司没有把支撑不足、已经倾斜的货堆码稳，自身仍有致损过错。陆宁无视劝阻和警示攀爬，也促成了同一损害，可以依法减轻公司的责任；具体程度须结合各自过错和原因确定，不是一律全免或各半。",
        sources: [
          "civil-pile-tree-road-stacking1255",
          "civil-pile-tree-road-victim1173",
        ],
        id: "civil-pile-tree-road-pile-victim-climbing-written",
        kind: "subjective",
        title: "越过围绳取帽子：写出分析",
        prompt:
          "公司能否完全免责？陆宁的攀爬对责任有何影响？本题不定比例。请结合案情说明理由。",
        criteria: [
          {
            id: "pile-climb-own-fault",
            label: "堆放人自身过错不因攀爬消失",
            meaning:
              "明确不能完全免责，联系支撑不足、顶部倾斜且未码稳的堆放问题。",
            acceptable:
              "说公司本来放得不稳，不能看到对方爬了就把自己的错全部抹掉即可。",
            boundary: "不把受害人写成故意造成自身损害；题中没有该事实。",
          },
          {
            id: "pile-climb-reduction",
            label: "受害人过错可减轻责任",
            meaning:
              "联系无视劝阻和标志攀爬并共同促成损害，说明可依法减轻，不预设比例。",
            acceptable:
              "说攀爬的人自己也有错，应影响责任分担，但不能随口定全免或各半即可。",
            boundary: "不要求精确计算损害额或引入文体活动自甘风险。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-tree-breaking",
    title: "林木折断与倾倒责任",
    headline:
      "树枝折断或树木倾倒伤人，所有人或管理人要证明自己没有过错；只说刮了风还不够。",
    goal: "青禾公司能否仅以有风为由免责？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "树木折断、倾倒致损，责任人不能把检查每一根树枝的证明任务全部推给受害人。是否有日常巡护、隐患处置和必要防护，决定能否证明没有过错。",
      "已有完整资料证明树木健康、管理防护到位，事故完全由外部车辆等第三人另行撞击引起，可以排除本项林木管理过错责任。第三人仍应对其自身致损行为依法负责。",
    ],
    example: {
      title: "报修过的枯枝",
      facts:
        "本案为原创教学虚构，发生于2026年9月。青禾园区公司管理园内行道树。居民多次发来照片，指出一根粗枝已经干枯、连接处开裂，公司收到后未检查或处理，也没有隔离下方通道。一天常见的阵风吹过，粗枝折断，砸伤正常通行的陆宁。气象与现场资料确认不是异常强风，枝条及伤害来源清楚。公司只以树枝是被风吹落为由拒赔。",
      analysis:
        "不能。青禾公司收到枯枝开裂的明确反映，却没有检查处置或隔离通道，不能证明自己没有管理过错，应对粗枝折断致伤负责。当天只是常见阵风，不能用有风两个字替代对隐患处理的说明。",
    },
    pitfall:
      "普通风雨一来就自动免责，或反过来认为树木管理人即使证明没有过错也必须赔。",
    recall: {
      prompt: "青禾公司能否仅以有风为由免责？",
      reference:
        "树枝折断或树木倾倒伤人，所有人或管理人要证明自己没有过错；只说刮了风还不够。",
    },
    sources: [
      "civil-pile-tree-road-tree1257",
      "civil-pile-tree-road-tree-proof",
    ],
    exercises: [
      {
        caseId: "civil-pile-tree-road-tree-ignored-branch",
        relatedTopicIds: ["civil-tree-breaking"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾园区公司管理园内行道树。居民多次发来照片，指出一根粗枝已经干枯、连接处开裂，公司收到后未检查或处理，也没有隔离下方通道。一天常见的阵风吹过，粗枝折断，砸伤正常通行的陆宁。气象与现场资料确认不是异常强风，枝条及伤害来源清楚。公司只以树枝是被风吹落为由拒赔。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。青禾公司收到枯枝开裂的明确反映，却没有检查处置或隔离通道，不能证明自己没有管理过错，应对粗枝折断致伤负责。当天只是常见阵风，不能用有风两个字替代对隐患处理的说明。",
        sources: ["civil-pile-tree-road-tree1257"],
        id: "civil-pile-tree-road-tree-ignored-branch-choice",
        kind: "objective",
        choiceMode: "single",
        title: "报修过的枯枝：选择判断",
        prompt: "青禾公司能否仅以有风为由免责？",
        options: [
          {
            id: "a",
            text: "不能；已知枯裂隐患未处理，未证明无过错，应承担责任",
            explanation: "责任判断结合隐患、处置缺失及致损关系。",
          },
          {
            id: "b",
            text: "树木不是产品，所以枝条折断永远不属民事责任",
            explanation: "第1257条专门规定林木折断等致害。",
          },
          {
            id: "c",
            text: "能，任何自然风吹落树枝都使管理人自动免责",
            explanation: "自然因素并不当然排除未处理隐患的管理过错。",
          },
          {
            id: "d",
            text: "只有受害人先鉴定每一处裂口的形成时间，公司才须举证",
            explanation: "第1257条由相应所有人或管理人证明自己没有过错。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-pile-tree-road-tree-ignored-branch",
        relatedTopicIds: ["civil-tree-breaking"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾园区公司管理园内行道树。居民多次发来照片，指出一根粗枝已经干枯、连接处开裂，公司收到后未检查或处理，也没有隔离下方通道。一天常见的阵风吹过，粗枝折断，砸伤正常通行的陆宁。气象与现场资料确认不是异常强风，枝条及伤害来源清楚。公司只以树枝是被风吹落为由拒赔。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。青禾公司收到枯枝开裂的明确反映，却没有检查处置或隔离通道，不能证明自己没有管理过错，应对粗枝折断致伤负责。当天只是常见阵风，不能用有风两个字替代对隐患处理的说明。",
        sources: ["civil-pile-tree-road-tree1257"],
        id: "civil-pile-tree-road-tree-ignored-branch-written",
        kind: "subjective",
        title: "报修过的枯枝：写出分析",
        prompt: "青禾公司能否仅以有风为由免责？请结合案情说明理由。",
        criteria: [
          {
            id: "tree-branch-manager",
            label: "管理人未证明无过错应负责",
            meaning:
              "明确青禾公司不能仅以有风免责，作为管理人未证明无过错应承担责任。",
            acceptable:
              "说不是吹风就免赔，公司得交代管理有没有问题，这次不能免责即可。",
            boundary: "不把林木责任误说成无论任何证明都绝对赔。",
          },
          {
            id: "tree-branch-known-risk",
            label: "联系已知枯裂仍未处置",
            meaning:
              "联系多次收到枯裂照片却未处理隔离及普通阵风，说明责任依据。",
            acceptable:
              "说危险早报过了仍不管，普通风把这根枯枝吹落不是免责理由即可。",
            boundary: "不要求模型自行预测风力、树木病理或未给的修剪周期。",
          },
        ],
      },
      {
        caseId: "civil-pile-tree-road-tree-external-truck",
        relatedTopicIds: ["civil-tree-breaking"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐青公司管理的一棵树被林禾私用货车倒车撞击，树干折断后砸坏陆宁停放的物品。连续录像记录了撞击，专业检查和此前巡护、修剪资料确认树木原本健康稳固、防护到位，这次撞击是折断及损害的唯一原因，资料足以证明公司没有林木管理过错。林禾承认倒车时未观察后方。本题只讨论侵权责任，不核保险。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "沐青公司不因管理身份就必然赔偿。本案已有证据证明树木健康、巡护防护到位，折断完全由林禾驾车撞击造成，公司可排除这项林木管理过错责任。林禾应对倒车撞树引起的损害依法负责。",
        sources: [
          "civil-pile-tree-road-tree1257",
          "civil-pile-tree-road-tree-proof",
        ],
        id: "civil-pile-tree-road-tree-external-truck-choice",
        kind: "objective",
        choiceMode: "single",
        title: "货车撞断的树干：选择判断",
        prompt: "沐青公司是否仍因管理这棵树就必须赔偿？林禾应否负责？",
        options: [
          {
            id: "a",
            text: "只要有货车经过，公司无需任何管理证明就自动免责",
            explanation: "本案有完整无过错证明及唯一原因，不是单靠第三人出现。",
          },
          {
            id: "b",
            text: "物品不是被车直接碰到，因此林禾不可能有责任",
            explanation: "已确认车辆撞树与后续财物损害的因果联系。",
          },
          {
            id: "c",
            text: "公司已证明无管理过错可排除本项责任，林禾对自身撞击致损负责",
            explanation: "依据第1257条及一般过错、第三人责任分别判断。",
          },
          {
            id: "d",
            text: "公司即使证明无过错也必须全赔，撞树者完全无责",
            explanation: "把过错推定改成绝对责任，并忽略直接致损行为。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-pile-tree-road-tree-external-truck",
        relatedTopicIds: ["civil-tree-breaking"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐青公司管理的一棵树被林禾私用货车倒车撞击，树干折断后砸坏陆宁停放的物品。连续录像记录了撞击，专业检查和此前巡护、修剪资料确认树木原本健康稳固、防护到位，这次撞击是折断及损害的唯一原因，资料足以证明公司没有林木管理过错。林禾承认倒车时未观察后方。本题只讨论侵权责任，不核保险。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "沐青公司不因管理身份就必然赔偿。本案已有证据证明树木健康、巡护防护到位，折断完全由林禾驾车撞击造成，公司可排除这项林木管理过错责任。林禾应对倒车撞树引起的损害依法负责。",
        sources: [
          "civil-pile-tree-road-tree1257",
          "civil-pile-tree-road-tree-proof",
        ],
        id: "civil-pile-tree-road-tree-external-truck-written",
        kind: "subjective",
        title: "货车撞断的树干：写出分析",
        prompt:
          "沐青公司是否仍因管理这棵树就必须赔偿？林禾应否负责？请结合案情说明理由。",
        criteria: [
          {
            id: "tree-truck-no-fault",
            label: "无过错证明排除管理责任",
            meaning:
              "说明公司不因管理身份必赔，联系完整巡护、树木稳固及撞击唯一原因等证明。",
            acceptable:
              "说公司已经证明管理没问题，这次全是车撞断的，不应按树木管理过错赔即可。",
            boundary: "不把有第三人介入概括成所有管理人一律免责。",
          },
          {
            id: "tree-truck-driver",
            label: "撞树者依法承担责任",
            meaning: "明确林禾应对未观察倒车撞树引发的损害负责。",
            acceptable: "说货车驾驶人造成树倒砸物，应承担其致损责任即可。",
            boundary: "不要求计算保险、交通事故责任比例或认定犯罪。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-tree-fruit",
    title: "果实坠落与管理人责任",
    headline:
      "果实自然落下也可能造成侵权责任；要看所有人或管理人能否证明已尽合理管理和防护。",
    goal: "青宁公司能否仅凭果实自然成熟，就一概免除本次责任？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "第1257条不仅管树倒、断枝，也管果实坠落。成熟季已有果实落到通道，管理人仍未检查、清除危险或作必要防护，不能只说自然成熟就一概免责。",
      "实际接管树木巡护、防护的管理人，不能只因树不属于自己就退出责任。产权和管理是不同问题，具体仍要看该责任人是否证明没有过错。",
    ],
    example: {
      title: "步道上方的成熟果实",
      facts:
        "本案为原创教学虚构，发生于2026年9月。青宁公司经营的开放公园内，一棵结有较大果实的树位于必经步道旁。成熟季开始后，保洁已连续报告果实落到步道，公司仍未安排检查摘除、隔离危险区域或设置可用绕行路线。一天一枚果实直接坠落，砸伤按指引走步道的陆宁，来源与致损关系已确认。公司称果实只是自然成熟，不存在人工剪断，所以一律不用赔。",
      analysis:
        "不能。果实坠落也在林木致害责任范围内，不要求必须有人剪断。公司已收到果实反复落到必经步道的报告，却未处理或防护，不能证明自己没有过错，应对本次坠果致伤负责。",
    },
    pitfall: "认为果实自然成熟就无人负责，或认为只有树木产权人才可能承担责任。",
    recall: {
      prompt: "青宁公司能否仅凭果实自然成熟，就一概免除本次责任？",
      reference:
        "果实自然落下也可能造成侵权责任；要看所有人或管理人能否证明已尽合理管理和防护。",
    },
    sources: [
      "civil-pile-tree-road-tree1257",
      "civil-pile-tree-road-tree-manager",
    ],
    exercises: [
      {
        caseId: "civil-pile-tree-road-fruit-walkway",
        relatedTopicIds: ["civil-tree-fruit"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青宁公司经营的开放公园内，一棵结有较大果实的树位于必经步道旁。成熟季开始后，保洁已连续报告果实落到步道，公司仍未安排检查摘除、隔离危险区域或设置可用绕行路线。一天一枚果实直接坠落，砸伤按指引走步道的陆宁，来源与致损关系已确认。公司称果实只是自然成熟，不存在人工剪断，所以一律不用赔。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。果实坠落也在林木致害责任范围内，不要求必须有人剪断。公司已收到果实反复落到必经步道的报告，却未处理或防护，不能证明自己没有过错，应对本次坠果致伤负责。",
        sources: ["civil-pile-tree-road-tree1257"],
        id: "civil-pile-tree-road-fruit-walkway-choice",
        kind: "objective",
        choiceMode: "single",
        title: "步道上方的成熟果实：选择判断",
        prompt: "青宁公司能否仅凭果实自然成熟，就一概免除本次责任？",
        options: [
          {
            id: "a",
            text: "果实坠落就必须全公园游客等额赔偿",
            explanation: "没有来源不明或游客共同侵权的事实与法律依据。",
          },
          {
            id: "b",
            text: "不能；果实坠落也适用本条，公司未证明无过错应负责",
            explanation: "第1257条明确包括果实坠落。",
          },
          {
            id: "c",
            text: "能，只有树干倒下伤人才可能产生林木责任",
            explanation: "遗漏本条明文规定的果实坠落。",
          },
          {
            id: "d",
            text: "只有证明公司想用果实伤人，才可以请求赔偿",
            explanation: "不是以故意为责任前提。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-pile-tree-road-fruit-walkway",
        relatedTopicIds: ["civil-tree-fruit"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青宁公司经营的开放公园内，一棵结有较大果实的树位于必经步道旁。成熟季开始后，保洁已连续报告果实落到步道，公司仍未安排检查摘除、隔离危险区域或设置可用绕行路线。一天一枚果实直接坠落，砸伤按指引走步道的陆宁，来源与致损关系已确认。公司称果实只是自然成熟，不存在人工剪断，所以一律不用赔。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。果实坠落也在林木致害责任范围内，不要求必须有人剪断。公司已收到果实反复落到必经步道的报告，却未处理或防护，不能证明自己没有过错，应对本次坠果致伤负责。",
        sources: ["civil-pile-tree-road-tree1257"],
        id: "civil-pile-tree-road-fruit-walkway-written",
        kind: "subjective",
        title: "步道上方的成熟果实：写出分析",
        prompt:
          "青宁公司能否仅凭果实自然成熟，就一概免除本次责任？请结合案情说明理由。",
        criteria: [
          {
            id: "fruit-natural-scope",
            label: "自然坠果并不当然免责",
            meaning:
              "明确果实坠落适用林木责任，不要求人为剪断，不能因自然成熟一概免责。",
            acceptable: "说自然落果也可能要赔，不是只有树倒才管即可。",
            boundary: "不把所有落果事件都自动判赔，仍保留无过错证明的条件。",
          },
          {
            id: "fruit-walkway-care",
            label: "联系反复报告与未防护",
            meaning:
              "联系已知果实反复落到必经步道、仍未处理防护，说明公司未证明无过错。",
            acceptable:
              "说已经多次知道会砸到过路人，却没有管或提供安全路线，应该负责即可。",
            boundary: "不要求逐字列举所有可能防护设备或另做植物鉴定。",
          },
        ],
      },
      {
        caseId: "civil-pile-tree-road-fruit-management-company",
        relatedTopicIds: ["civil-tree-fruit"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。澄禾园林公司依合同接管一片园地的日常修剪、巡查与危险区域防护，钥匙、工作记录及人员安排都显示其已经实际管理。园内一棵树上已有多枚开裂、随时可能掉下的果实，巡查员上报后公司没有采取措施，后来果实坠落砸坏访客陆宁的物品。公司承认管理资料和经过，却说树木产权属于委托方，赔偿只能找产权人。本题只问澄禾能否依这一理由排除自己的管理责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。澄禾已经实际接管巡查和防护，是本案树木管理人；明知开裂果实有掉落风险仍未处置，不能证明自己没有过错，应依法承担管理责任。树木属于委托方，不会自动抹掉澄禾已经承担并实际履行的管理职责。",
        sources: [
          "civil-pile-tree-road-tree1257",
          "civil-pile-tree-road-tree-manager",
        ],
        id: "civil-pile-tree-road-fruit-management-company-choice",
        kind: "objective",
        choiceMode: "single",
        title: "已经接管的园林公司：选择判断",
        prompt: "澄禾能否仅因树木不是自己所有，就一概不承担管理人责任？",
        options: [
          {
            id: "a",
            text: "只要签过任何合同，就不再需要看是否实际接管",
            explanation: "本案有实际接管事实，不能省略主体识别。",
          },
          {
            id: "b",
            text: "管理公司负责就意味着原产权人在所有案件都绝对免责",
            explanation: "本问不评价产权人有无其他过错，不能扩大结论。",
          },
          {
            id: "c",
            text: "能，园林公司永远不可能成为林木致害责任人",
            explanation: "实际管理人也在第1257条的责任主体范围内。",
          },
          {
            id: "d",
            text: "不能；已实际管理且未证明无过错，不能只用产权归属退出",
            explanation: "结合管理交接、隐患上报和措施缺失判断。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-pile-tree-road-fruit-management-company",
        relatedTopicIds: ["civil-tree-fruit"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。澄禾园林公司依合同接管一片园地的日常修剪、巡查与危险区域防护，钥匙、工作记录及人员安排都显示其已经实际管理。园内一棵树上已有多枚开裂、随时可能掉下的果实，巡查员上报后公司没有采取措施，后来果实坠落砸坏访客陆宁的物品。公司承认管理资料和经过，却说树木产权属于委托方，赔偿只能找产权人。本题只问澄禾能否依这一理由排除自己的管理责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。澄禾已经实际接管巡查和防护，是本案树木管理人；明知开裂果实有掉落风险仍未处置，不能证明自己没有过错，应依法承担管理责任。树木属于委托方，不会自动抹掉澄禾已经承担并实际履行的管理职责。",
        sources: [
          "civil-pile-tree-road-tree1257",
          "civil-pile-tree-road-tree-manager",
        ],
        id: "civil-pile-tree-road-fruit-management-company-written",
        kind: "subjective",
        title: "已经接管的园林公司：写出分析",
        prompt:
          "澄禾能否仅因树木不是自己所有，就一概不承担管理人责任？请结合案情说明理由。",
        criteria: [
          {
            id: "fruit-company-manager",
            label: "实际管理人亦可承担责任",
            meaning:
              "指出澄禾已经实际接管，为管理人，不因非产权人身份就当然排除责任。",
            acceptable:
              "说树不是它的，但日常确由它管理，不能一句不是自己的就走人即可。",
            boundary: "不把单纯签约但尚未接管也一概认定管理人。",
          },
          {
            id: "fruit-company-fault",
            label: "联系隐患已报却未处理",
            meaning:
              "联系开裂果实上报后未处置，说明澄禾未证明自己没有管理过错，应负责。",
            acceptable: "说自己知道有掉落危险仍没管，这次不能免责即可。",
            boundary:
              "不强求同时判断委托方责任，也不预设委托方绝对免责或连带。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-road-obstructor",
    title: "道路障碍行为人的责任",
    headline:
      "在公共道路堆放、倾倒或遗撒物品妨碍通行并致损，行为人不能把自己的责任直接推给道路管理人。",
    goal: "商店能否以临时放置、另有道路管理单位为由退出责任？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "谁把货物、砂石等障碍留在公共道路并造成损害，谁应依法承担相应的行为人责任。称只是临时放置，或者路上本有管理人，不会让这项责任自动消失。",
      "道路管理人是否同时失职，要另外审查清理、防护和警示等义务。行为人自己造成的道路障碍与管理人的独立职责不能互相替代，也不是两者必定各半。",
    ],
    example: {
      title: "店门外的一排货筐",
      facts:
        "本案为原创教学虚构，发生于2026年9月。青禾商店为腾出仓库，把货筐排在门外公共步行道路上，占去主要通行空间，拐角没有提示或隔离。陆宁按正常路线走到拐角，被伸出的货筐绊倒受伤，录像确认致损经过。店主称货筐只放两个小时，街道路面又有专门管理单位，所以赔偿应全部由管理单位承担。本题只问商店能否因此排除自己的障碍行为责任。",
      analysis:
        "不能。青禾商店把货筐留在公共道路，妨碍正常通行并直接绊伤陆宁，应依法承担自己的责任。只放两个小时、道路另有管理单位，都不能把商店的障碍行为责任转走；管理单位是否另有失职，是另一项判断。",
    },
    pitfall:
      "把日常清扫管理当作障碍行为人的免责理由，或认为短时间占道就不可能产生责任。",
    recall: {
      prompt: "商店能否以临时放置、另有道路管理单位为由退出责任？",
      reference:
        "在公共道路堆放、倾倒或遗撒物品妨碍通行并致损，行为人不能把自己的责任直接推给道路管理人。",
    },
    sources: ["civil-pile-tree-road-obstruction1256"],
    exercises: [
      {
        caseId: "civil-pile-tree-road-road-shop-crates",
        relatedTopicIds: ["civil-road-obstructor"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾商店为腾出仓库，把货筐排在门外公共步行道路上，占去主要通行空间，拐角没有提示或隔离。陆宁按正常路线走到拐角，被伸出的货筐绊倒受伤，录像确认致损经过。店主称货筐只放两个小时，街道路面又有专门管理单位，所以赔偿应全部由管理单位承担。本题只问商店能否因此排除自己的障碍行为责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。青禾商店把货筐留在公共道路，妨碍正常通行并直接绊伤陆宁，应依法承担自己的责任。只放两个小时、道路另有管理单位，都不能把商店的障碍行为责任转走；管理单位是否另有失职，是另一项判断。",
        sources: ["civil-pile-tree-road-obstruction1256"],
        id: "civil-pile-tree-road-road-shop-crates-choice",
        kind: "objective",
        choiceMode: "single",
        title: "店门外的一排货筐：选择判断",
        prompt: "商店能否以临时放置、另有道路管理单位为由退出责任？",
        options: [
          {
            id: "a",
            text: "不能；商店占道货筐妨碍通行致损，应承担自身责任",
            explanation: "临时性和另有管理人不使障碍行为责任消失。",
          },
          {
            id: "b",
            text: "只要不超过半天，占用公共道路造成任何伤害都不必负责",
            explanation: "第1256条没有此类临时放置免赔时限。",
          },
          {
            id: "c",
            text: "有道路管理单位时，障碍行为人永远不用赔",
            explanation: "行为人与管理人承担责任的依据要分别判断。",
          },
          {
            id: "d",
            text: "受害人必须先查清路面产权，才可能向货筐堆放者请求赔偿",
            explanation: "本题公共道路及障碍行为来源已经清楚。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-pile-tree-road-road-shop-crates",
        relatedTopicIds: ["civil-road-obstructor"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾商店为腾出仓库，把货筐排在门外公共步行道路上，占去主要通行空间，拐角没有提示或隔离。陆宁按正常路线走到拐角，被伸出的货筐绊倒受伤，录像确认致损经过。店主称货筐只放两个小时，街道路面又有专门管理单位，所以赔偿应全部由管理单位承担。本题只问商店能否因此排除自己的障碍行为责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。青禾商店把货筐留在公共道路，妨碍正常通行并直接绊伤陆宁，应依法承担自己的责任。只放两个小时、道路另有管理单位，都不能把商店的障碍行为责任转走；管理单位是否另有失职，是另一项判断。",
        sources: ["civil-pile-tree-road-obstruction1256"],
        id: "civil-pile-tree-road-road-shop-crates-written",
        kind: "subjective",
        title: "店门外的一排货筐：写出分析",
        prompt:
          "商店能否以临时放置、另有道路管理单位为由退出责任？请结合案情说明理由。",
        criteria: [
          {
            id: "road-shop-actor",
            label: "商店承担自身障碍责任",
            meaning:
              "明确青禾商店不能退出，联系将货筐放在公共通行道路并绊伤正常行人。",
            acceptable: "说自己占道放货把人绊倒，就得对自己的行为负责即可。",
            boundary: "不要求受害人另证商店有伤害故意。",
          },
          {
            id: "road-shop-no-transfer",
            label: "临时放置及管理单位不当然免责",
            meaning:
              "说明只放两小时、另有管理单位不能把商店责任全部转走，管理人责任另审。",
            acceptable:
              "说临时摆放也不能随便挡路，有清扫的人不代表摆东西的人没责任即可。",
            boundary: "不强求同时判定未给事实的管理单位责任或固定份额。",
          },
        ],
      },
      {
        caseId: "civil-pile-tree-road-road-spilled-stones",
        relatedTopicIds: ["civil-road-obstructor"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐青运输公司把砂石运到临街工地，卸货时将一批碎石遗撒在公共非机动车道上。工作人员看见后未清理，称路面每天都有养护人员打扫。次日陆宁依规骑自行车经过，车轮被这批碎石阻挡而摔倒，遗撒来源、通行障碍与损害联系已经确认。本题只问运输公司对遗撒障碍的责任，不核机动车保险。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。沐青运输公司遗撒碎石妨碍通行，又没有清理，已经造成陆宁摔伤，应依法承担自己的障碍行为责任。道路有人日常养护，不是遗撒者不清理、也不赔偿的理由；养护方有无另外失职须另行判断。",
        sources: ["civil-pile-tree-road-obstruction1256"],
        id: "civil-pile-tree-road-road-spilled-stones-choice",
        kind: "objective",
        choiceMode: "single",
        title: "卸货后留下的碎石：选择判断",
        prompt: "运输公司能否仅因道路有日常养护，就把自己的遗撒责任排除？",
        options: [
          {
            id: "a",
            text: "只有运输车直接撞到陆宁，才可能发生这项责任",
            explanation: "本条调整道路障碍致损，不限于车辆直接碰撞。",
          },
          {
            id: "b",
            text: "发现有养护单位后，运输公司与养护单位必定固定各赔一半",
            explanation: "没有通用各半规则，还要审查各自责任基础。",
          },
          {
            id: "c",
            text: "不能；遗撒妨碍通行并致损，日常养护不替代行为人责任",
            explanation: "第1256条同时区分障碍行为人与管理人职责。",
          },
          {
            id: "d",
            text: "只要路面由他人打扫，运输公司可以任意遗撒而不负责",
            explanation: "养护职责不构成遗撒者的当然免责。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-pile-tree-road-road-spilled-stones",
        relatedTopicIds: ["civil-road-obstructor"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐青运输公司把砂石运到临街工地，卸货时将一批碎石遗撒在公共非机动车道上。工作人员看见后未清理，称路面每天都有养护人员打扫。次日陆宁依规骑自行车经过，车轮被这批碎石阻挡而摔倒，遗撒来源、通行障碍与损害联系已经确认。本题只问运输公司对遗撒障碍的责任，不核机动车保险。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。沐青运输公司遗撒碎石妨碍通行，又没有清理，已经造成陆宁摔伤，应依法承担自己的障碍行为责任。道路有人日常养护，不是遗撒者不清理、也不赔偿的理由；养护方有无另外失职须另行判断。",
        sources: ["civil-pile-tree-road-obstruction1256"],
        id: "civil-pile-tree-road-road-spilled-stones-written",
        kind: "subjective",
        title: "卸货后留下的碎石：写出分析",
        prompt:
          "运输公司能否仅因道路有日常养护，就把自己的遗撒责任排除？请结合案情说明理由。",
        criteria: [
          {
            id: "road-stones-liability",
            label: "遗撒者承担责任",
            meaning:
              "联系运输公司遗撒碎石阻碍非机动车道、造成摔伤，明确公司应依法承担自身责任。",
            acceptable:
              "说这批石头是公司卸下留在路上的，阻碍骑行导致摔伤应负责即可。",
            boundary: "不以运输车是否直接碰到人作为本条前提。",
          },
          {
            id: "road-stones-maintenance",
            label: "日常养护不使遗撒者免责",
            meaning: "说明有养护人员不能排除公司的遗撒责任，养护方失职另审。",
            acceptable:
              "说有人扫路不等于可以把石头留下不管，不能把自己的责任推掉即可。",
            boundary: "不要求确定管理方身份、过错比例或保险赔款。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-road-management",
    title: "道路管理人的清理与防护责任",
    headline:
      "道路管理人要证明已经尽到清理、防护、警示等义务；障碍来源未查清，不会让自己的职责消失。",
    goal: "澄禾能否只因障碍行为人尚未查清，就完全拒绝承担管理责任？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "道路管理人收到明确障碍信息后，应结合实际危险及时清理或采取必要防护警示。不能证明已经履职而造成损害，要承担相应责任，不以先查到遗撒者为前提。",
      "已经及时隔离危险、设置明显警示和安全绕行，并有完整资料证明尽到义务，不能仅凭后来有人受伤就认定管理人失职。要看具体措施和当时通行条件。",
    ],
    example: {
      title: "已经接报的道路障碍",
      facts:
        "本案为原创教学虚构，发生于2026年9月。澄禾单位是某段公共道路的管理人。多名居民连续两天通过报修平台反映拐角堆有挡路的水泥块，地址和照片清楚，单位已经签收。它未派人清理，也未设置防护、警示或绕行安排，拿不出任何处置记录。陆宁正常通行时被水泥块绊伤。尚未查明是谁留下水泥块，单位据此称受害人必须先找到那个人，自己才能承担任何责任。",
      analysis:
        "不能。澄禾收到清楚的报修后，既未清理，也没有防护警示，不能证明已经履行道路管理义务，应依法承担相应责任。留下水泥块的人可以继续调查，但未知其身份不能抹掉澄禾已经存在的失职。",
    },
    pitfall: "来源不明就不管，或反过来只要人在路上受伤就让管理人包赔。",
    recall: {
      prompt: "澄禾能否只因障碍行为人尚未查清，就完全拒绝承担管理责任？",
      reference:
        "道路管理人要证明已经尽到清理、防护、警示等义务；障碍来源未查清，不会让自己的职责消失。",
    },
    sources: [
      "civil-pile-tree-road-obstruction1256",
      "civil-pile-tree-road-road-manager",
    ],
    exercises: [
      {
        caseId: "civil-pile-tree-road-road-reported-obstruction",
        relatedTopicIds: ["civil-road-management"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。澄禾单位是某段公共道路的管理人。多名居民连续两天通过报修平台反映拐角堆有挡路的水泥块，地址和照片清楚，单位已经签收。它未派人清理，也未设置防护、警示或绕行安排，拿不出任何处置记录。陆宁正常通行时被水泥块绊伤。尚未查明是谁留下水泥块，单位据此称受害人必须先找到那个人，自己才能承担任何责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。澄禾收到清楚的报修后，既未清理，也没有防护警示，不能证明已经履行道路管理义务，应依法承担相应责任。留下水泥块的人可以继续调查，但未知其身份不能抹掉澄禾已经存在的失职。",
        sources: [
          "civil-pile-tree-road-obstruction1256",
          "civil-pile-tree-road-road-manager",
        ],
        id: "civil-pile-tree-road-road-reported-obstruction-choice",
        kind: "objective",
        choiceMode: "single",
        title: "已经接报的道路障碍：选择判断",
        prompt: "澄禾能否只因障碍行为人尚未查清，就完全拒绝承担管理责任？",
        options: [
          {
            id: "a",
            text: "能，只要未查到遗撒者，道路管理人就不必采取任何措施",
            explanation: "管理人的独立清理、防护和警示职责并不因此消失。",
          },
          {
            id: "b",
            text: "不能；未证明履行管理义务，应依法承担相应责任",
            explanation: "依据第1256条判断管理责任，不以先找到行为人为条件。",
          },
          {
            id: "c",
            text: "收到报修就证明已经履职，不需要采取实际措施",
            explanation: "收件不等于处理、警示或防护。",
          },
          {
            id: "d",
            text: "来源不明意味着全体居民都应被认定为共同侵权人",
            explanation: "没有居民共同侵权或补偿规则的事实依据。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-pile-tree-road-road-reported-obstruction",
        relatedTopicIds: ["civil-road-management"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。澄禾单位是某段公共道路的管理人。多名居民连续两天通过报修平台反映拐角堆有挡路的水泥块，地址和照片清楚，单位已经签收。它未派人清理，也未设置防护、警示或绕行安排，拿不出任何处置记录。陆宁正常通行时被水泥块绊伤。尚未查明是谁留下水泥块，单位据此称受害人必须先找到那个人，自己才能承担任何责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。澄禾收到清楚的报修后，既未清理，也没有防护警示，不能证明已经履行道路管理义务，应依法承担相应责任。留下水泥块的人可以继续调查，但未知其身份不能抹掉澄禾已经存在的失职。",
        sources: [
          "civil-pile-tree-road-obstruction1256",
          "civil-pile-tree-road-road-manager",
        ],
        id: "civil-pile-tree-road-road-reported-obstruction-written",
        kind: "subjective",
        title: "已经接报的道路障碍：写出分析",
        prompt:
          "澄禾能否只因障碍行为人尚未查清，就完全拒绝承担管理责任？请结合案情说明理由。",
        criteria: [
          {
            id: "road-reported-duty",
            label: "管理人未履职应负相应责任",
            meaning:
              "联系已签收报修却无清理、防护、警示，判断澄禾未证明履职应承担相应责任。",
            acceptable:
              "说危险早通知了却一直没管，道路管理人不能推掉自己的责任即可。",
            boundary: "不把相应责任改成无条件全额包赔、连带或固定各半。",
          },
          {
            id: "road-reported-unknown",
            label: "未知行为人不自动排除管理责任",
            meaning: "说明遗撒者未查清不使管理人免责，不要求受害人先找出该人。",
            acceptable:
              "说查是谁扔的和先管路上的危险是两回事，没找到人也不能不负责即可。",
            boundary: "不要求直接认定未知行为人的身份或刑事责任。",
          },
        ],
      },
      {
        caseId: "civil-pile-tree-road-road-effective-barrier",
        relatedTopicIds: ["civil-road-management"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青宁单位管理的一段公共道路突然出现散落碎砖。它接报后立即封闭危险小段，设置连续稳固护栏、清楚的夜间灯光与标志，并提供平整可通行的绕行路线，随后组织清理。完整录像和处置记录足以证明这些措施已及时有效落实。陆宁为走近路，跨越护栏进入封闭路段，被碎砖绊伤。本题仅问管理人的道路管理责任，不判断遗撒者或具体分担比例。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。本案有完整证据证明青宁已及时隔离危险、清楚警示并提供安全绕行，已经履行相应管理义务。陆宁跨过有效护栏进入封闭路段受伤，不能单凭事故发生就倒推青宁失职；这不等于把所有道路障碍的行为人也一并免责。",
        sources: [
          "civil-pile-tree-road-obstruction1256",
          "civil-pile-tree-road-road-manager",
        ],
        id: "civil-pile-tree-road-road-effective-barrier-choice",
        kind: "objective",
        choiceMode: "single",
        title: "已经隔离的碎砖路段：选择判断",
        prompt: "能否仅凭陆宁在该路段受伤，就要求青宁承担管理失职责任？",
        options: [
          {
            id: "a",
            text: "管理人已履职就意味着遗撒者无论做过什么也永远免责",
            explanation: "本题仅排除管理失职，不替代对障碍行为人的评价。",
          },
          {
            id: "b",
            text: "能，任何人只要在道路上受伤，管理人必定承担全部责任",
            explanation: "本条允许管理人证明已经尽到义务。",
          },
          {
            id: "c",
            text: "不能，但理由只是陆宁后来还能够走路，没有实际损害",
            explanation: "本案已经发生损害，关键是管理职责已有充分履行证明。",
          },
          {
            id: "d",
            text: "不能；管理人已证明及时有效防护警示与安全绕行，不因发生事故当然失职",
            explanation: "根据实际履职证明判断，而非仅看损害结果。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-pile-tree-road-road-effective-barrier",
        relatedTopicIds: ["civil-road-management"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青宁单位管理的一段公共道路突然出现散落碎砖。它接报后立即封闭危险小段，设置连续稳固护栏、清楚的夜间灯光与标志，并提供平整可通行的绕行路线，随后组织清理。完整录像和处置记录足以证明这些措施已及时有效落实。陆宁为走近路，跨越护栏进入封闭路段，被碎砖绊伤。本题仅问管理人的道路管理责任，不判断遗撒者或具体分担比例。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。本案有完整证据证明青宁已及时隔离危险、清楚警示并提供安全绕行，已经履行相应管理义务。陆宁跨过有效护栏进入封闭路段受伤，不能单凭事故发生就倒推青宁失职；这不等于把所有道路障碍的行为人也一并免责。",
        sources: [
          "civil-pile-tree-road-obstruction1256",
          "civil-pile-tree-road-road-manager",
        ],
        id: "civil-pile-tree-road-road-effective-barrier-written",
        kind: "subjective",
        title: "已经隔离的碎砖路段：写出分析",
        prompt:
          "能否仅凭陆宁在该路段受伤，就要求青宁承担管理失职责任？请结合案情说明理由。",
        criteria: [
          {
            id: "road-barrier-no-failure",
            label: "已证明履职不因伤害当然担责",
            meaning:
              "明确不能仅凭受伤认定青宁失职，管理人可以用实际履职证明排除本项责任。",
            acceptable:
              "说管理方已经证明尽到职责，不能只因有人受伤就要求其赔偿即可。",
            boundary: "不把所有道路管理人都说成免责，也不否认已经发生的损害。",
          },
          {
            id: "road-barrier-facts",
            label: "联系有效围护警示与绕行",
            meaning:
              "联系及时护栏隔离、夜间警示、安全绕行及陆宁跨栏，说明本案管理义务已履行。",
            acceptable:
              "说该挡的挡了、提醒清楚也留了安全路，受害人自己跨进封闭区，不能据此倒推失职即可。",
            boundary: "不要求判断遗撒者责任，也不把跨栏自动等同故意受伤。",
          },
        ],
      },
    ],
  },
];

export const civilPileTreeRoadChapters = [
  {
    id: "CIV-STACKED-OBJECTS",
    title: "堆放物倒塌与过错分担",
    section: "民法",
    topicIds: ["civil-stacked-collapse", "civil-stacked-contribution"],
  },
  {
    id: "CIV-TREE-HARM",
    title: "林木折断与果实坠落",
    section: "民法",
    topicIds: ["civil-tree-breaking", "civil-tree-fruit"],
  },
  {
    id: "CIV-ROAD-OBSTRUCTION",
    title: "道路障碍与管理责任",
    section: "民法",
    topicIds: ["civil-road-obstructor", "civil-road-management"],
  },
];

export const civilPileTreeRoadExercises = civilPileTreeRoadTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilPileTreeRoadContentPack = {
  revision: civilPileTreeRoadRevision,
  snapshot: {
    topics: civilPileTreeRoadTopics,
    sources: civilPileTreeRoadSources,
  },
};
export const civilPileTreeRoadDefaultQueues = {
  objective: civilPileTreeRoadExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilPileTreeRoadExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilPileTreeRoadQuestion(id: string) {
  const question = civilPileTreeRoadExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilPileTreeRoadTopicForQuestion(id: string) {
  return civilPileTreeRoadTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilPileTreeRoadSameCaseQuestions(id: string) {
  const question = civilPileTreeRoadQuestion(id);
  return question
    ? structuredClone(
        civilPileTreeRoadExercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function civilPileTreeRoadChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilPileTreeRoadChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilPileTreeRoadTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
