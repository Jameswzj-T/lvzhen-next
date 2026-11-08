import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilQuasiContractRevision = "civil-quasi-contract-2026-10-24.v1";

export const civilQuasiContractSources: ContentSources = {
  "civil-quasi-management979": {
    title: "《民法典》第979条：无义务管理与必要费用",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。两案分别核邻居无既有义务的紧急临时保护与已在合同范围内的维修。必要费用与劳务报酬分开；不存在事前委托、事后有偿约定或不符合受益人真实意思。第二案只判断不能改以无因管理另行收费，合同权利仍按合同处理。",
  },
  "civil-quasi-management-wishes979": {
    title: "《民法典》第979条第二款：受益人的真实意思",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。木棚案明知受益人决定拆除而仍修，真实意思合法且不违背公序良俗，无第三人安全危险。本题仅问能否依979条取得所主张费用请求，不评价980条另有实际管理利益时的请求，也不一概宣称受益人绝无任何支付义务。",
  },
  "civil-quasi-management-method981": {
    title: "《民法典》第981条：有利方法与不得任意中断",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。持续排水案中断会使货物再次受水，管理人知道，没有自身安全、疾病或更紧急救助等理由，只想看直播，且仍能继续或安排交接。只考是否应继续/妥善交接，不推定全部损失、因果及赔偿额。",
  },
  "civil-quasi-management-notice982": {
    title: "《民法典》第982条：通知与不紧急时等待指示",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。房主可随时电话联系且房间数日内不存在受损风险，管理人知道能当天获回复。只考及时通知及非紧急事项应等待指示，不用绝对先等批准处理所有紧急情形。",
  },
  "civil-quasi-management-report983": {
    title: "《民法典》第983条：报告与转交管理取得的财产",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。管理结束后报告处理情况，并及时转交因管理取得的属于受益人的材料/款项。必要开支已另外全部报销，无有偿约定、留置或抵销争议，不把管理取得财产变成自行设定报酬。",
  },
  "civil-quasi-management-ratification984": {
    title: "《民法典》第984条：追认溯及委托与管理人另意",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。两案均事前没有委托，受益人事后明确追认；一案管理人无不同表示，一案收到追认后明确反对按自始委托处理。只考委托规则的溯及与例外，不自动推出有偿、不扩张为任何费用请求全消失，不处理980利益限额。",
  },
  "civil-quasi-enrichment-basis985": {
    title: "《民法典》第985条：没有法律根据与给付例外",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-24直接读取最高人民法院官方《民法典》全文中的第985—988条；2020-05-28通过，2021-01-01施行。错误汇款案明确无交易、借贷、赠与或代偿；到期前付款案为真实有效债务、双方自愿提前清偿，无意思瑕疵。第985条第2项是债务到期前清偿，不是诉讼时效届满。道德义务和明知无给付义务清偿只列讲解，未另设案。",
  },
  "civil-quasi-enrichment-good986": {
    title: "《民法典》第986条：不知且不应知与利益已不存在",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-24直接读取最高人民法院官方《民法典》全文中的第985—988条；2020-05-28通过，2021-01-01施行。免责要求两项同时满足。账户原款仍在不能只凭最初不知道免责；展示品案限定取得至意外毁损前不知道且不应知道这一非所考前提，并给出未使用、完全毁损、无残值、无替代物、无节省支出、无保险或赔偿请求权等事实。仅判断本次该项不当得利返还，不扩成免除所有可能责任。",
  },
  "civil-quasi-enrichment-bad987": {
    title: "《民法典》第987条：知道或者应当知道后的返还与损失",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-24直接读取最高人民法院官方《民法典》全文中的第985—988条；2020-05-28通过，2021-01-01施行。一案明知后拒退，并由证据确认因此发生必要合理的60元银行融资利息；一案从本人签认结算单与付款回单的金额即可判断应知多付，且用多收款还真实个人债务，原本用于还款的自有资金保留下来。没有设置统一利率、固定倍数、惩罚赔偿或推定一切费用均赔。",
  },
  "civil-quasi-enrichment-transfer988": {
    title: "《民法典》第988条：无偿转让给第三人的相应返还范围",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-24直接读取最高人民法院官方《民法典》全文中的第985—988条；2020-05-28通过，2021-01-01施行。两案均为无偿转让、第三人取得款项仍完整存在。一案转出2万元而非原误收6万元全部；一案全转3万元但原得利人已返本金1万元，第三人相应本金返还不得造成重复受偿。未推导有偿买家责任、自动连带或对同一本金双重收取。",
  },
};

export const civilQuasiContractTopics: FaultTopic[] = [
  {
    id: "civil-management-necessity",
    title: "无因管理与必要费用",
    headline:
      "没有既有义务，为避免他人损失而管理事务，可依法请求必要费用；不当然产生劳务报酬。",
    goal: "周宁能否请求300元必要费用？是否还能仅凭这次帮忙另收800元辛苦费？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "先看是否本就负有法定或约定的处理义务。没有既有义务，为避免他人利益受损而管理其事务，符合条件时可请求偿还必要费用；因管理受到损失的，可请求适当补偿。",
      "必要费用、自己受到的损失和劳务报酬不是一回事。仅因帮了忙，不能自行另定报酬；原来就有维修等合同义务的，应按原合同处理，不能把履约改叫无因管理再收一次钱。",
    ],
    example: {
      title: "暴雨中的临时遮盖",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。2026年9月暴雨前，邻居周宁路过陈青的独立仓房，看到风掀开屋顶，雨即将淋到里面的纸制货物。陈青在外无法联系，周宁与他没有看管、维修或其他处理义务，临时购买防水布并请人固定，花了300元，票据和行情表明均为防止当次雨损所必需。遮盖避免了货物受损，也符合陈青此前一贯保护这些货物的意思。周宁没有与陈青约定报酬，却另按自己的标准再要800元辛苦费。",
      analysis:
        "300元必要费用可以请求，800元辛苦费不能只凭这次管理自行收取。周宁原来没有处理义务，是为避免陈青货物受损而采取必要的临时保护，符合无因管理的费用规则；但这项规则不等于双方已经约定了劳务报酬。",
    },
    pitfall: "把先做事就能收钱当成规则，或把按合同应做的事重新包装成额外收费。",
    recall: {
      prompt:
        "周宁能否请求300元必要费用？是否还能仅凭这次帮忙另收800元辛苦费？",
      reference:
        "没有既有义务，为避免他人损失而管理事务，可依法请求必要费用；不当然产生劳务报酬。",
    },
    sources: ["civil-quasi-management979"],
    exercises: [
      {
        caseId: "civil-quasi-contract-management-storm-cover-cost",
        relatedTopicIds: ["civil-management-necessity"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月暴雨前，邻居周宁路过陈青的独立仓房，看到风掀开屋顶，雨即将淋到里面的纸制货物。陈青在外无法联系，周宁与他没有看管、维修或其他处理义务，临时购买防水布并请人固定，花了300元，票据和行情表明均为防止当次雨损所必需。遮盖避免了货物受损，也符合陈青此前一贯保护这些货物的意思。周宁没有与陈青约定报酬，却另按自己的标准再要800元辛苦费。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "300元必要费用可以请求，800元辛苦费不能只凭这次管理自行收取。周宁原来没有处理义务，是为避免陈青货物受损而采取必要的临时保护，符合无因管理的费用规则；但这项规则不等于双方已经约定了劳务报酬。",
        sources: ["civil-quasi-management979"],
        id: "civil-quasi-contract-management-storm-cover-cost-choice",
        kind: "objective",
        choiceMode: "single",
        title: "暴雨中的临时遮盖：选择判断",
        prompt:
          "周宁能否请求300元必要费用？是否还能仅凭这次帮忙另收800元辛苦费？",
        options: [
          {
            id: "a",
            text: "可请求300元必要费用，但不能仅凭管理自行另定800元报酬",
            explanation: "第979条支持符合条件的必要费用，不当然产生劳务报酬。",
          },
          {
            id: "b",
            text: "两项都不能，因为没有先签字就不可能有任何费用请求",
            explanation: "无因管理正是没有原来法定或约定义务时的管理情形。",
          },
          {
            id: "c",
            text: "两项都当然可收，因为管理人可单方决定报酬",
            explanation: "必要费用请求不能替代有偿约定。",
          },
          {
            id: "d",
            text: "只能收800元辛苦费，买防水布的费用反而必须自负",
            explanation: "把必要开支与自行设定的报酬倒置。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-quasi-contract-management-storm-cover-cost",
        relatedTopicIds: ["civil-management-necessity"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月暴雨前，邻居周宁路过陈青的独立仓房，看到风掀开屋顶，雨即将淋到里面的纸制货物。陈青在外无法联系，周宁与他没有看管、维修或其他处理义务，临时购买防水布并请人固定，花了300元，票据和行情表明均为防止当次雨损所必需。遮盖避免了货物受损，也符合陈青此前一贯保护这些货物的意思。周宁没有与陈青约定报酬，却另按自己的标准再要800元辛苦费。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "300元必要费用可以请求，800元辛苦费不能只凭这次管理自行收取。周宁原来没有处理义务，是为避免陈青货物受损而采取必要的临时保护，符合无因管理的费用规则；但这项规则不等于双方已经约定了劳务报酬。",
        sources: ["civil-quasi-management979"],
        id: "civil-quasi-contract-management-storm-cover-cost-written",
        kind: "subjective",
        title: "暴雨中的临时遮盖：写出分析",
        prompt:
          "周宁能否请求300元必要费用？是否还能仅凭这次帮忙另收800元辛苦费？请结合案情说明理由。",
        criteria: [
          {
            id: "management-storm-necessary-cost",
            label: "无义务保护可请求必要费用",
            meaning:
              "联系无原处理义务、紧急保护他人货物及300元必要开支，说明可请求偿还。",
            acceptable:
              "说邻居本不用管，是为挡住雨保住货物，这300元必要支出可以要回来即可。",
            boundary: "不要求讨论人身受伤、具体损失或其他未给定报酬约定。",
          },
          {
            id: "management-storm-no-fee",
            label: "帮忙不等于自行定报酬",
            meaning: "明确不能仅凭无因管理单方面追加800元辛苦费，无报酬约定。",
            acceptable: "说垫的必要钱可以报，但不能自己再定一笔辛苦费即可。",
            boundary: "不把无报酬扩大为必要费用或依法适当补偿也一概不能请求。",
          },
        ],
      },
      {
        caseId: "civil-quasi-contract-management-existing-maintenance-contract",
        relatedTopicIds: ["civil-management-necessity"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，陈青已按年向安禾公司支付仓库维保费。合同明确包括暴雨前检查、漏水临时遮盖及约定范围内材料费。风雨来临时，公司员工依该合同为陈青仓库加盖防水布，发生的500元材料费完全在已付年费覆盖范围内。公司称“先保护了你的利益”，另以无因管理为由要求陈青再付这500元；双方未另行约定新增项目或收费。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。这次遮盖和材料原本就在已付年费覆盖的合同义务中，不符合无因管理所要求的没有既有处理义务。公司应按原维保合同处理，不能仅因及时完成了合同内工作就另收这500元。",
        sources: ["civil-quasi-management979"],
        id: "civil-quasi-contract-management-existing-maintenance-contract-choice",
        kind: "objective",
        choiceMode: "single",
        title: "已经在维保范围内的抢修：选择判断",
        prompt: "公司能否把合同内的这次工作改按无因管理，要求陈青另付500元？",
        options: [
          {
            id: "a",
            text: "能，任何提前完成的合同工作都会转成无因管理",
            explanation: "及时履约不改变原有合同义务。",
          },
          {
            id: "b",
            text: "能，只要对客户有好处就可不看已支付的合同价款",
            explanation: "不能跳过原合同另造重复收费依据。",
          },
          {
            id: "c",
            text: "不能；本来就有合同内义务，材料费用也已由年费覆盖",
            explanation: "欠缺没有法定或约定义务这一条件。",
          },
          {
            id: "d",
            text: "不能，所以原维保合同及公司所有服务费请求都自动失效",
            explanation: "不能另收本笔不等于原合同全部无效。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-quasi-contract-management-existing-maintenance-contract",
        relatedTopicIds: ["civil-management-necessity"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，陈青已按年向安禾公司支付仓库维保费。合同明确包括暴雨前检查、漏水临时遮盖及约定范围内材料费。风雨来临时，公司员工依该合同为陈青仓库加盖防水布，发生的500元材料费完全在已付年费覆盖范围内。公司称“先保护了你的利益”，另以无因管理为由要求陈青再付这500元；双方未另行约定新增项目或收费。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。这次遮盖和材料原本就在已付年费覆盖的合同义务中，不符合无因管理所要求的没有既有处理义务。公司应按原维保合同处理，不能仅因及时完成了合同内工作就另收这500元。",
        sources: ["civil-quasi-management979"],
        id: "civil-quasi-contract-management-existing-maintenance-contract-written",
        kind: "subjective",
        title: "已经在维保范围内的抢修：写出分析",
        prompt:
          "公司能否把合同内的这次工作改按无因管理，要求陈青另付500元？请结合案情说明理由。",
        criteria: [
          {
            id: "management-contract-no-extra",
            label: "原有合同义务不能另造收费",
            meaning:
              "联系遮盖及材料均属已付维保费范围，说明存在约定义务，不能以无因管理再收500元。",
            acceptable:
              "说这些事公司收年费时就答应做了，不能完成后再换个名目要一遍材料钱即可。",
            boundary:
              "只处理本笔重复收费，不要求重算原合同全部价款或认定合同无效。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-management-wishes-method",
    title: "受益人意思与管理的中断",
    headline:
      "管理他人事务要尊重其合法真实意思；已经开始的管理，也不能无正当理由在不利时突然中断。",
    goal: "周宁能否仅以为陈青避免损失为由，依第979条要求这笔修补费用？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "管理不符合受益人的真实意思，通常不能取得第979条的必要费用和适当补偿请求；但该意思违反法律或违背公序良俗时另有例外。不能只用“我是好心”代替对方的合法决定。",
      "管理应采取有利于受益人的方法。中断会对受益人不利的，没有正当理由不得中断；需要退出时，应看能否先安排妥当的交接，而不是把尚未排除的危险留给对方。",
    ],
    example: {
      title: "明知木棚将拆仍去修补",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。2026年9月，陈青已安排拆除花园里的独立木棚，并提前明确告诉周宁：“棚内东西已搬空，漏雨也不用修，我要把棚拆掉。”这个决定只涉及陈青自己的空棚，不危及他人，也无违法或违背公序良俗的情形。下雨后周宁仍为避免棚板受潮，未征得同意就请人堵漏花了800元。他只以“为你避免损失”为由，主张依无因管理第979条要求偿还这笔费用。",
      analysis:
        "不能按这条要求。周宁已经知道陈青决定拆棚、不再维修，这一意思合法且不危及他人。他仍违背该决定修补，不能只说自己是好心，就依第979条取得所主张的费用请求。",
    },
    pitfall:
      "明知对方合法拒绝还强行处理，或认为没有合同就可以随时把危险中的事务扔下。",
    recall: {
      prompt: "周宁能否仅以为陈青避免损失为由，依第979条要求这笔修补费用？",
      reference:
        "管理他人事务要尊重其合法真实意思；已经开始的管理，也不能无正当理由在不利时突然中断。",
    },
    sources: [
      "civil-quasi-management-wishes979",
      "civil-quasi-management-method981",
    ],
    exercises: [
      {
        caseId: "civil-quasi-contract-management-known-refusal-repair",
        relatedTopicIds: ["civil-management-wishes-method"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，陈青已安排拆除花园里的独立木棚，并提前明确告诉周宁：“棚内东西已搬空，漏雨也不用修，我要把棚拆掉。”这个决定只涉及陈青自己的空棚，不危及他人，也无违法或违背公序良俗的情形。下雨后周宁仍为避免棚板受潮，未征得同意就请人堵漏花了800元。他只以“为你避免损失”为由，主张依无因管理第979条要求偿还这笔费用。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能按这条要求。周宁已经知道陈青决定拆棚、不再维修，这一意思合法且不危及他人。他仍违背该决定修补，不能只说自己是好心，就依第979条取得所主张的费用请求。",
        sources: ["civil-quasi-management-wishes979"],
        id: "civil-quasi-contract-management-known-refusal-repair-choice",
        kind: "objective",
        choiceMode: "single",
        title: "明知木棚将拆仍去修补：选择判断",
        prompt: "周宁能否仅以为陈青避免损失为由，依第979条要求这笔修补费用？",
        options: [
          {
            id: "a",
            text: "可以，只要管理人认为有好处，对方的任何真实意思都不重要",
            explanation: "第979条第二款明确要求考虑受益人的真实意思。",
          },
          {
            id: "b",
            text: "不能按第979条要求；他明知对方合法决定不修，仍违背其意思修补",
            explanation: "本案也没有真实意思违法或违背公序良俗的例外。",
          },
          {
            id: "c",
            text: "可以，因为受益人一旦表示拒绝就自动构成违法",
            explanation: "受益人有权合法决定自己空棚的处理方式。",
          },
          {
            id: "d",
            text: "不能，因为任何未经通知的紧急管理在所有情形下一概无效",
            explanation:
              "不能把本案明知合法拒绝扩成所有紧急保护都必须先获同意。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-quasi-contract-management-known-refusal-repair",
        relatedTopicIds: ["civil-management-wishes-method"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，陈青已安排拆除花园里的独立木棚，并提前明确告诉周宁：“棚内东西已搬空，漏雨也不用修，我要把棚拆掉。”这个决定只涉及陈青自己的空棚，不危及他人，也无违法或违背公序良俗的情形。下雨后周宁仍为避免棚板受潮，未征得同意就请人堵漏花了800元。他只以“为你避免损失”为由，主张依无因管理第979条要求偿还这笔费用。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能按这条要求。周宁已经知道陈青决定拆棚、不再维修，这一意思合法且不危及他人。他仍违背该决定修补，不能只说自己是好心，就依第979条取得所主张的费用请求。",
        sources: ["civil-quasi-management-wishes979"],
        id: "civil-quasi-contract-management-known-refusal-repair-written",
        kind: "subjective",
        title: "明知木棚将拆仍去修补：写出分析",
        prompt:
          "周宁能否仅以为陈青避免损失为由，依第979条要求这笔修补费用？请结合案情说明理由。",
        criteria: [
          {
            id: "management-known-lawful-wish",
            label: "合法真实意思不能被好心替代",
            meaning:
              "联系已明确不修且合法无公共危险，说明明知仍修不符合受益人真实意思，不能按979条请求本笔费用。",
            acceptable:
              "说人家早说要拆不用修，决定又合法，不能自己坚持修完就按这条逼人付钱即可。",
            boundary:
              "本题仅问979请求；不要求判断980条另有实际管理利益时的范围，不作所有支付路径一概排除。",
          },
        ],
      },
      {
        caseId: "civil-quasi-contract-management-drainage-abrupt-stop",
        relatedTopicIds: ["civil-management-wishes-method"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，陈青出差，仓库外积水上涨。没有合同或其他看管义务的邻居周宁，临时用排水泵保护库内货物。积水尚未退去，现场标线和周宁自己的测试都表明，只要停泵，水很快会进入仓库。他仍能安全继续，也可等半小时与已经赶来的陈青交接；他却只为回家看一场直播，立即收泵离开，未作替代安排。本题不计算后来损失。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能这样中断。周宁已经接手排水，明知停泵会使货物受损，又没有安全风险等正当理由，仅为看直播就立即离开，不符合管理义务。应继续必要管理，或先安排妥当交接再退出。",
        sources: ["civil-quasi-management-method981"],
        id: "civil-quasi-contract-management-drainage-abrupt-stop-choice",
        kind: "objective",
        choiceMode: "single",
        title: "积水未退就拔掉排水泵：选择判断",
        prompt:
          "周宁能否仅以自己没有合同义务为由，在这种状态下直接中断？应怎样处理退出？",
        options: [
          {
            id: "a",
            text: "可以，既然开始时没有合同，开始后也绝无任何管理义务",
            explanation: "无因管理开始后的处理仍受第981条约束。",
          },
          {
            id: "b",
            text: "可以，只要自己想离开，就永远属于正当理由",
            explanation: "本案理由与已知中断危险不相称。",
          },
          {
            id: "c",
            text: "不能，所以他必须不顾自身危险终身管理这座仓库",
            explanation: "义务不等于不顾危险或永久管理，本案有妥当交接方式。",
          },
          {
            id: "d",
            text: "不能这样停；中断会造成不利又无正当理由，应继续必要管理或妥当交接",
            explanation: "第981条直接约束这种不利中断。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-quasi-contract-management-drainage-abrupt-stop",
        relatedTopicIds: ["civil-management-wishes-method"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，陈青出差，仓库外积水上涨。没有合同或其他看管义务的邻居周宁，临时用排水泵保护库内货物。积水尚未退去，现场标线和周宁自己的测试都表明，只要停泵，水很快会进入仓库。他仍能安全继续，也可等半小时与已经赶来的陈青交接；他却只为回家看一场直播，立即收泵离开，未作替代安排。本题不计算后来损失。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能这样中断。周宁已经接手排水，明知停泵会使货物受损，又没有安全风险等正当理由，仅为看直播就立即离开，不符合管理义务。应继续必要管理，或先安排妥当交接再退出。",
        sources: ["civil-quasi-management-method981"],
        id: "civil-quasi-contract-management-drainage-abrupt-stop-written",
        kind: "subjective",
        title: "积水未退就拔掉排水泵：写出分析",
        prompt:
          "周宁能否仅以自己没有合同义务为由，在这种状态下直接中断？应怎样处理退出？请结合案情说明理由。",
        criteria: [
          {
            id: "management-stop-no-arbitrary",
            label: "不利时不得无正当理由中断",
            meaning:
              "联系停泵将入水、知情且仅为直播离开，说明没有合同也不能如此中断。",
            acceptable:
              "说既然已经在抽水，又知道一停就会淹货，不能只为看节目就拔泵走即可。",
            boundary: "不要求认定实际损失、赔偿数额或不存在的终身管理义务。",
          },
          {
            id: "management-stop-hand-over",
            label: "继续必要处理或先妥当交接",
            meaning:
              "说明应继续必要排水或先安排安全妥当交接再退出，不能留危险无人处理。",
            acceptable:
              "说要走也应等主人来接手或先找妥安排，不能直接把水患扔下即可。",
            boundary:
              "认可继续管理或妥当交接的等义路径，不要求写唯一设备方案。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-management-notice-report",
    title: "通知、等待与结束后的转交",
    headline:
      "能联系就及时通知；不急的事等待指示。管理结束后，要报告并转交取得的财产。",
    goal: "在本案状态下，周宁是否应通知陈青并等待指示？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "管理他人事务，能够通知受益人的，应及时通知。事务不需要紧急处理时，应等待其指示；急到不能等的情况，不能机械地套成一律先签字才能处理。",
      "管理结束后，应报告处理经过。因管理取得的属于受益人的财产，应及时转交；必要费用已经结清时，不能自行从其款项中留下所谓辛苦费。",
    ],
    example: {
      title: "能联系，事情也不紧急",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。2026年9月，陈青外出，邻居周宁发现他的独立储物间有一处外层遮雨瓦松动，打算临时帮助处理。现场另有完好内层防水板，天气资料显示未来数日晴天，维修人员确认当天没有进水或其他迫切危险。陈青手机可接通，周宁知道他当天就能回复；两人没有委托约定。周宁却不通知，直接决定整片更换，并称“既然是帮忙，主人就不用参加决定”。本题只问通知与等待义务。",
      analysis:
        "应当。陈青能够及时联系，事情也不需紧急处理，周宁应先通知并等待指示，不能仅因是帮忙就跳过主人自行决定整片更换。",
    },
    pitfall:
      "把联系得到的主人晾在一边擅自做非紧急决定，或管理结束后既不交代也不交还。",
    recall: {
      prompt: "在本案状态下，周宁是否应通知陈青并等待指示？",
      reference:
        "能联系就及时通知；不急的事等待指示。管理结束后，要报告并转交取得的财产。",
    },
    sources: [
      "civil-quasi-management-notice982",
      "civil-quasi-management-report983",
    ],
    exercises: [
      {
        caseId: "civil-quasi-contract-management-nonurgent-await-instruction",
        relatedTopicIds: ["civil-management-notice-report"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，陈青外出，邻居周宁发现他的独立储物间有一处外层遮雨瓦松动，打算临时帮助处理。现场另有完好内层防水板，天气资料显示未来数日晴天，维修人员确认当天没有进水或其他迫切危险。陈青手机可接通，周宁知道他当天就能回复；两人没有委托约定。周宁却不通知，直接决定整片更换，并称“既然是帮忙，主人就不用参加决定”。本题只问通知与等待义务。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "应当。陈青能够及时联系，事情也不需紧急处理，周宁应先通知并等待指示，不能仅因是帮忙就跳过主人自行决定整片更换。",
        sources: ["civil-quasi-management-notice982"],
        id: "civil-quasi-contract-management-nonurgent-await-instruction-choice",
        kind: "objective",
        choiceMode: "single",
        title: "能联系，事情也不紧急：选择判断",
        prompt: "在本案状态下，周宁是否应通知陈青并等待指示？",
        options: [
          {
            id: "a",
            text: "应当；能通知且不紧急，应及时联系并等待指示",
            explanation: "符合第982条的两项事实条件。",
          },
          {
            id: "b",
            text: "不必，任何管理都永远由管理人单方决定",
            explanation: "忽略通知和非紧急情况下等待的义务。",
          },
          {
            id: "c",
            text: "不必，只要以后把账单交给主人就等于已经及时通知",
            explanation: "事后交账单不能代替本应及时进行的联系。",
          },
          {
            id: "d",
            text: "应当，因为即使危及生命且完全联系不到，也一律不得先处理",
            explanation:
              "本题义务由能联系且不急支持，不能绝对化到所有紧急情况。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-quasi-contract-management-nonurgent-await-instruction",
        relatedTopicIds: ["civil-management-notice-report"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，陈青外出，邻居周宁发现他的独立储物间有一处外层遮雨瓦松动，打算临时帮助处理。现场另有完好内层防水板，天气资料显示未来数日晴天，维修人员确认当天没有进水或其他迫切危险。陈青手机可接通，周宁知道他当天就能回复；两人没有委托约定。周宁却不通知，直接决定整片更换，并称“既然是帮忙，主人就不用参加决定”。本题只问通知与等待义务。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "应当。陈青能够及时联系，事情也不需紧急处理，周宁应先通知并等待指示，不能仅因是帮忙就跳过主人自行决定整片更换。",
        sources: ["civil-quasi-management-notice982"],
        id: "civil-quasi-contract-management-nonurgent-await-instruction-written",
        kind: "subjective",
        title: "能联系，事情也不紧急：写出分析",
        prompt:
          "在本案状态下，周宁是否应通知陈青并等待指示？请结合案情说明理由。",
        criteria: [
          {
            id: "management-nonurgent-notify",
            label: "能联系且不紧急应通知等待",
            meaning:
              "联系手机可通、当天能回复及无迫切危险，说明应及时通知并等待陈青指示。",
            acceptable:
              "说联系得到主人，事情又不急，应先问一声等他回复，不能自己就换掉即可。",
            boundary:
              "只问管理义务，不要求计算维修费、判断授权合同或讨论违约赔偿。",
          },
        ],
      },
      {
        caseId: "civil-quasi-contract-management-end-report-money",
        relatedTopicIds: ["civil-management-notice-report"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，周宁在陈青外出且无法联系时，临时保护其温室花苗，双方此前没有委托或报酬约定。管理期间，合作苗场送来应退给陈青的周转箱押金800元，周宁代收并单独存放；款项来源、数额和归陈青所有没有争议。陈青回来后，管理已经结束，周宁为保护花苗垫付的必要费用也已全部另行报销。周宁拒绝说明处理经过，并自行留下其中200元当辛苦费，只愿交600元；不存在另行约定、留置或抵销争议。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "应向陈青报告管理经过，并及时转交全部800元押金退款。钱是管理中代陈青取得的，不会变成周宁的财产；必要费用已经结清，也没有报酬约定，不能私自留下200元当辛苦费。",
        sources: ["civil-quasi-management-report983"],
        id: "civil-quasi-contract-management-end-report-money-choice",
        kind: "objective",
        choiceMode: "single",
        title: "管理结束后留住押金退款：选择判断",
        prompt: "周宁在管理结束后应交代什么？这800元应如何处理？",
        options: [
          {
            id: "a",
            text: "不必报告，且管理人取得的任何钱都自动归自己",
            explanation: "第983条要求报告并转交管理取得的财产。",
          },
          {
            id: "b",
            text: "只交600元即可，因为管理人随时可自行决定报酬",
            explanation: "本案没有可从押金私留报酬的依据。",
          },
          {
            id: "c",
            text: "应报告管理情况，及时交还全部800元，不得自行扣200元",
            explanation: "符合报告和及时转交两项义务。",
          },
          {
            id: "d",
            text: "只要还钱就永久不必说明管理情况",
            explanation: "财产转交不能取代独立的报告义务。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-quasi-contract-management-end-report-money",
        relatedTopicIds: ["civil-management-notice-report"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，周宁在陈青外出且无法联系时，临时保护其温室花苗，双方此前没有委托或报酬约定。管理期间，合作苗场送来应退给陈青的周转箱押金800元，周宁代收并单独存放；款项来源、数额和归陈青所有没有争议。陈青回来后，管理已经结束，周宁为保护花苗垫付的必要费用也已全部另行报销。周宁拒绝说明处理经过，并自行留下其中200元当辛苦费，只愿交600元；不存在另行约定、留置或抵销争议。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "应向陈青报告管理经过，并及时转交全部800元押金退款。钱是管理中代陈青取得的，不会变成周宁的财产；必要费用已经结清，也没有报酬约定，不能私自留下200元当辛苦费。",
        sources: ["civil-quasi-management-report983"],
        id: "civil-quasi-contract-management-end-report-money-written",
        kind: "subjective",
        title: "管理结束后留住押金退款：写出分析",
        prompt:
          "周宁在管理结束后应交代什么？这800元应如何处理？请结合案情说明理由。",
        criteria: [
          {
            id: "management-end-report",
            label: "管理结束应报告情况",
            meaning: "说明周宁应向陈青报告管理处理经过，不能无故拒绝说明。",
            acceptable: "说替人照看完，要把做了什么、怎么处理的交代清楚即可。",
            boundary: "不要求规定报告格式、审计手续或列出未给定票据。",
          },
          {
            id: "management-end-transfer",
            label: "及时交还全部代收款",
            meaning:
              "联系800元归陈青、必要费用已报销且无报酬约定，说明应及时交还全额，不能私扣200元。",
            acceptable:
              "说这笔退款本来就是陈青的，应全交给他，不能自己拿两百当劳务费即可。",
            boundary:
              "不扩成即使存在另行约定或法定抗辩也永远不得处理，只判断本案明确前提。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-management-ratification",
    title: "事后追认与委托规则",
    headline:
      "受益人追认后，通常从管理开始时适用委托规则；管理人另有意思表示时除外。",
    goal: "本案经追认后，应从什么时候适用委托合同的有关规定？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "没有事前委托，不妨碍受益人事后明确追认管理。符合条件时，从管理事务开始之时起适用委托合同的有关规定，而不是只从追认那天算起。",
      "这项溯及规则保留管理人另有意思表示的例外。不能只凭受益人一方说“我追认”，就无视管理人的不同表示，强行把此前关系改成自始委托；具体费用等问题仍须按适用规则判断。",
    ],
    example: {
      title: "回来后明确追认临时管理",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。2026年9月10日起，陈青外出失联，周宁在没有事前委托的情况下，临时替其保管仓内货物并排除进水危险。9月15日陈青回来，查清处理情况后书面表示：“我追认你从9月10日开始替我保管、排水的这段管理。”周宁收到后明确认可，没有不同表示。双方仅争相关委托规则应从9月10日还是15日起适用，不争其他事实。",
      analysis:
        "从9月10日管理开始时起适用。陈青已经明确追认，周宁也没有不同表示，第984条的规则是追溯到管理开始，不是只从9月15日追认当天才适用。",
    },
    pitfall: "误以为事前没有合同就永远不能追认，或认为追认只有受益人说了算。",
    recall: {
      prompt: "本案经追认后，应从什么时候适用委托合同的有关规定？",
      reference:
        "受益人追认后，通常从管理开始时适用委托规则；管理人另有意思表示时除外。",
    },
    sources: ["civil-quasi-management-ratification984"],
    exercises: [
      {
        caseId: "civil-quasi-contract-management-ratification-relates-back",
        relatedTopicIds: ["civil-management-ratification"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月10日起，陈青外出失联，周宁在没有事前委托的情况下，临时替其保管仓内货物并排除进水危险。9月15日陈青回来，查清处理情况后书面表示：“我追认你从9月10日开始替我保管、排水的这段管理。”周宁收到后明确认可，没有不同表示。双方仅争相关委托规则应从9月10日还是15日起适用，不争其他事实。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "从9月10日管理开始时起适用。陈青已经明确追认，周宁也没有不同表示，第984条的规则是追溯到管理开始，不是只从9月15日追认当天才适用。",
        sources: ["civil-quasi-management-ratification984"],
        id: "civil-quasi-contract-management-ratification-relates-back-choice",
        kind: "objective",
        choiceMode: "single",
        title: "回来后明确追认临时管理：选择判断",
        prompt: "本案经追认后，应从什么时候适用委托合同的有关规定？",
        options: [
          {
            id: "a",
            text: "只能从9月15日起，因为法律不允许追认对先前管理发生任何作用",
            explanation: "第984条明确从管理开始时起适用。",
          },
          {
            id: "b",
            text: "从9月10日管理开始时起，双方给定的追认与无不同表示符合溯及规则",
            explanation: "追认生效的适用起点不等于追认消息发出日期。",
          },
          {
            id: "c",
            text: "从两人认识之日起，所有过去往来都自动成为委托",
            explanation: "追认限于该次管理，不扩到全部既往关系。",
          },
          {
            id: "d",
            text: "任何时候都不能适用，因为事前没有签委托合同",
            explanation: "事后追认正是本条允许的情形。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-quasi-contract-management-ratification-relates-back",
        relatedTopicIds: ["civil-management-ratification"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月10日起，陈青外出失联，周宁在没有事前委托的情况下，临时替其保管仓内货物并排除进水危险。9月15日陈青回来，查清处理情况后书面表示：“我追认你从9月10日开始替我保管、排水的这段管理。”周宁收到后明确认可，没有不同表示。双方仅争相关委托规则应从9月10日还是15日起适用，不争其他事实。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "从9月10日管理开始时起适用。陈青已经明确追认，周宁也没有不同表示，第984条的规则是追溯到管理开始，不是只从9月15日追认当天才适用。",
        sources: ["civil-quasi-management-ratification984"],
        id: "civil-quasi-contract-management-ratification-relates-back-written",
        kind: "subjective",
        title: "回来后明确追认临时管理：写出分析",
        prompt:
          "本案经追认后，应从什么时候适用委托合同的有关规定？请结合案情说明理由。",
        criteria: [
          {
            id: "management-ratification-start",
            label: "追认使规则从管理开始适用",
            meaning:
              "联系9月15日明确追认及周宁无不同表示，说明委托有关规定从9月10日管理开始时适用。",
            acceptable:
              "说后来已认可这次管理，规则就从十号开始，不是等十五号才起算即可。",
            boundary:
              "不要求讨论报酬金额，不把这次追认扩成所有过去事务都属于委托。",
          },
        ],
      },
      {
        caseId:
          "civil-quasi-contract-management-ratification-manager-disagrees",
        relatedTopicIds: ["civil-management-ratification"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月10日至12日，周宁没有事前委托，临时替外出的陈青保护仓内货物。陈青回来后书面说追认这段管理，并要求从开始时就按委托关系处理。周宁收到追认当日，立即明确回复：“我不同意把先前这段临时管理改成从开始就按委托处理。”表示已送达，双方对其内容没有争议。陈青认为只要自己追认，就可以完全不管周宁的不同表示。本题只问第984条的适用。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。第984条在追认溯及规则之外，明确保留管理人另有意思表示的例外。周宁已经明确反对这种自始委托处理，陈青不能只凭自己追认就强行适用该溯及规则。",
        sources: ["civil-quasi-management-ratification984"],
        id: "civil-quasi-contract-management-ratification-manager-disagrees-choice",
        kind: "objective",
        choiceMode: "single",
        title: "管理人明确提出不同表示：选择判断",
        prompt:
          "陈青能否仅凭自己追认，就无视周宁的明确不同表示，强制按自始委托处理？",
        options: [
          {
            id: "a",
            text: "能，因为追认一出，管理人的任何表示都自动无效",
            explanation: "忽略第984条明文保留的例外。",
          },
          {
            id: "b",
            text: "能，因为一切临时管理本来就必须当作有偿委托",
            explanation: "无事前委托的临时管理不当然是有偿委托。",
          },
          {
            id: "c",
            text: "不能，所以周宁此前全部行为及任何依法费用请求都自动消失",
            explanation: "不能强制溯及不等于先前管理与其他请求全部不存在。",
          },
          {
            id: "d",
            text: "不能；管理人已另有明确表示，不能无视该例外强制溯及",
            explanation: "直接适用第984条的但书。",
          },
        ],
        answer: "d",
      },
      {
        caseId:
          "civil-quasi-contract-management-ratification-manager-disagrees",
        relatedTopicIds: ["civil-management-ratification"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月10日至12日，周宁没有事前委托，临时替外出的陈青保护仓内货物。陈青回来后书面说追认这段管理，并要求从开始时就按委托关系处理。周宁收到追认当日，立即明确回复：“我不同意把先前这段临时管理改成从开始就按委托处理。”表示已送达，双方对其内容没有争议。陈青认为只要自己追认，就可以完全不管周宁的不同表示。本题只问第984条的适用。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。第984条在追认溯及规则之外，明确保留管理人另有意思表示的例外。周宁已经明确反对这种自始委托处理，陈青不能只凭自己追认就强行适用该溯及规则。",
        sources: ["civil-quasi-management-ratification984"],
        id: "civil-quasi-contract-management-ratification-manager-disagrees-written",
        kind: "subjective",
        title: "管理人明确提出不同表示：写出分析",
        prompt:
          "陈青能否仅凭自己追认，就无视周宁的明确不同表示，强制按自始委托处理？请结合案情说明理由。",
        criteria: [
          {
            id: "management-ratification-manager-exception",
            label: "管理人的不同表示应被考虑",
            meaning:
              "联系周宁收到追认后明确反对自始委托，说明触及984条例外，不能仅凭受益人追认强制溯及。",
            acceptable:
              "说这条不是主人单方面追认就全算委托，管理人明确说不同意，不能当作没听见即可。",
            boundary:
              "只问溯及委托规则，不要求取消全部管理义务、费用或其他可能请求。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-enrichment-basis",
    title: "没有法律根据与法定例外",
    headline:
      "先核对收款根据；错误汇款通常应返，真实债务的提前自愿清偿不能只因未到期就要回。",
    goal: "程蔚能否请求宋闻返还这1.2万元？是否必须先证明宋闻主动骗款？",
    prerequisite: "能核对给付原因、获知时间和利益的实际去向。",
    minutes: "6–10",
    paragraphs: [
      "一方没有法律根据取得利益、另一方因此受损时，受损者可依法请求返还。错误转到无交易关系的人名下，不会仅因付款方操作失误就变成赠与，也不以收款人先有欺骗为前提。",
      "第985条另列给付例外，包括履行道德义务的给付、债务到期前的清偿、明知无给付义务仍作出的债务清偿。提前还真实债务，不等于债务不存在；这里不要混成诉讼时效规则。",
    ],
    example: {
      title: "输错收款号码",
      facts:
        "本案为原创教学虚构，发生于2026年9月。9月2日，程蔚输入号码时误将1.2万元转给不认识的宋闻。两人之间没有交易、借贷、赠与或其他应给付款项的关系，也不是为他人履行债务。当日银行核验并通知双方，宋闻的账户中这笔1.2万元仍完整存在。宋闻只以“号码是你输错的，我没有骗你”为由拒绝返还。",
      analysis:
        "可以请求返还，不必先证明宋闻骗款。宋闻取得1.2万元，程蔚相应受损，而双方没有使宋闻保有该款的法律根据；付款操作失误不等于赠与，也不让收款人当然取得这笔钱。",
    },
    pitfall: "认为钱到账就归收款人，或把未到期直接当成没有债务。",
    recall: {
      prompt: "程蔚能否请求宋闻返还这1.2万元？是否必须先证明宋闻主动骗款？",
      reference:
        "先核对收款根据；错误汇款通常应返，真实债务的提前自愿清偿不能只因未到期就要回。",
    },
    sources: ["civil-quasi-enrichment-basis985"],
    exercises: [
      {
        caseId: "civil-quasi-contract-wrong-transfer-no-ground",
        relatedTopicIds: ["civil-enrichment-basis"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。9月2日，程蔚输入号码时误将1.2万元转给不认识的宋闻。两人之间没有交易、借贷、赠与或其他应给付款项的关系，也不是为他人履行债务。当日银行核验并通知双方，宋闻的账户中这笔1.2万元仍完整存在。宋闻只以“号码是你输错的，我没有骗你”为由拒绝返还。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "可以请求返还，不必先证明宋闻骗款。宋闻取得1.2万元，程蔚相应受损，而双方没有使宋闻保有该款的法律根据；付款操作失误不等于赠与，也不让收款人当然取得这笔钱。",
        sources: ["civil-quasi-enrichment-basis985"],
        id: "civil-quasi-contract-wrong-transfer-no-ground-choice",
        kind: "objective",
        choiceMode: "single",
        title: "输错收款号码：选择判断",
        prompt: "程蔚能否请求宋闻返还这1.2万元？是否必须先证明宋闻主动骗款？",
        options: [
          {
            id: "a",
            text: "可以返还，不以宋闻主动骗款为必要条件",
            explanation:
              "第985条关注无法律根据的得利与受损，不把主动欺骗列为本题返还前提。",
          },
          {
            id: "b",
            text: "不可以；只要转账由付款人自己操作，就自动变成赠与",
            explanation: "输入错误与真实赠与意思不同。",
          },
          {
            id: "c",
            text: "不可以；没有收款人欺骗，就不存在任何返还义务",
            explanation: "不当得利返还不以收款人实施欺骗为必要条件。",
          },
          {
            id: "d",
            text: "可以，但法律统一要求收款人另付三倍本金",
            explanation: "第985条没有本题所称的固定三倍赔偿规则。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-quasi-contract-wrong-transfer-no-ground",
        relatedTopicIds: ["civil-enrichment-basis"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。9月2日，程蔚输入号码时误将1.2万元转给不认识的宋闻。两人之间没有交易、借贷、赠与或其他应给付款项的关系，也不是为他人履行债务。当日银行核验并通知双方，宋闻的账户中这笔1.2万元仍完整存在。宋闻只以“号码是你输错的，我没有骗你”为由拒绝返还。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "可以请求返还，不必先证明宋闻骗款。宋闻取得1.2万元，程蔚相应受损，而双方没有使宋闻保有该款的法律根据；付款操作失误不等于赠与，也不让收款人当然取得这笔钱。",
        sources: ["civil-quasi-enrichment-basis985"],
        id: "civil-quasi-contract-wrong-transfer-no-ground-written",
        kind: "subjective",
        title: "输错收款号码：写出分析",
        prompt:
          "程蔚能否请求宋闻返还这1.2万元？是否必须先证明宋闻主动骗款？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-quasi-wrong-transfer-return",
            label: "无根据得利应返，不以骗款为前提",
            meaning:
              "结合误汇、双方无给付关系且原款仍在，认定可请求返还1.2万元；付款方输入错误或未证明欺骗不排除请求。",
            acceptable:
              "说明这是转错的钱，没有债务或赠与理由让对方留着，应还回去，不必先证明诈骗即可；接受等义表达。",
            boundary: "不要求评价犯罪、银行责任、损失赔偿或其他未问的请求。",
          },
        ],
      },
      {
        caseId: "civil-quasi-contract-voluntary-payment-before-due",
        relatedTopicIds: ["civil-enrichment-basis"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。程蔚向郁川所负的2万元借款真实有效，约定2026年12月1日到期。9月5日，程蔚知道尚未到期，仍主动提出提前还清，郁川同意并收下2万元；没有欺诈、胁迫或其他意思表示瑕疵，也无利息或提前还款损失争议。9月10日，程蔚又只以“9月付款时还没到期，所以没有债务要履行”为由，要求按不当得利把2万元退回来。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "不能。债务真实存在，程蔚明知未到期仍自愿提前清偿，属于第985条规定的债务到期前清偿情形，不能只因付款早于期限就按不当得利要回。未到期不等于没有债务。",
        sources: ["civil-quasi-enrichment-basis985"],
        id: "civil-quasi-contract-voluntary-payment-before-due-choice",
        kind: "objective",
        choiceMode: "single",
        title: "提前还掉的真实借款：选择判断",
        prompt: "程蔚能否仅凭付款时尚未到期，请求按不当得利返还这2万元？",
        options: [
          {
            id: "a",
            text: "能；凡到期前付款都等于完全没有债务",
            explanation: "债务的存在与履行期限是否届至是两个问题。",
          },
          {
            id: "b",
            text: "能；第985条第2项说的是诉讼时效届满后的付款",
            explanation: "该项实际规定的是债务到期之前的清偿。",
          },
          {
            id: "c",
            text: "不能；真实债务的自愿提前清偿，不能只因未到期按本条要回",
            explanation: "第985条第2项明确涉及债务到期前的清偿。",
          },
          {
            id: "d",
            text: "不能，但理由是所有转账无论有无根据都永远不能返还",
            explanation:
              "第985条原则上允许无根据得利的返还，本案适用的是特定给付规则。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-quasi-contract-voluntary-payment-before-due",
        relatedTopicIds: ["civil-enrichment-basis"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。程蔚向郁川所负的2万元借款真实有效，约定2026年12月1日到期。9月5日，程蔚知道尚未到期，仍主动提出提前还清，郁川同意并收下2万元；没有欺诈、胁迫或其他意思表示瑕疵，也无利息或提前还款损失争议。9月10日，程蔚又只以“9月付款时还没到期，所以没有债务要履行”为由，要求按不当得利把2万元退回来。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "不能。债务真实存在，程蔚明知未到期仍自愿提前清偿，属于第985条规定的债务到期前清偿情形，不能只因付款早于期限就按不当得利要回。未到期不等于没有债务。",
        sources: ["civil-quasi-enrichment-basis985"],
        id: "civil-quasi-contract-voluntary-payment-before-due-written",
        kind: "subjective",
        title: "提前还掉的真实借款：写出分析",
        prompt:
          "程蔚能否仅凭付款时尚未到期，请求按不当得利返还这2万元？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-quasi-early-payment-exception",
            label: "未到期的自愿清偿不因此返还",
            meaning:
              "联系真实有效借款、双方同意提前还款且无意思瑕疵，说明不能仅因未到期按不当得利请求返还，并区分未到期与债务不存在。",
            acceptable:
              "说明本来就欠这2万元，只是自愿提前还，不能因为早还就按不当得利要回即可；接受等义表达。",
            boundary:
              "不要求分析贷款利率、提前还款损害、诉讼时效或其他给付例外。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-enrichment-good-faith",
    title: "善意与利益存续",
    headline:
      "不知道且不应知道还不够，还要看利益是否已经不存在；账户原款或保留下的经济利益仍须核对。",
    goal: "陶薇能否仅以收款时不知道且不应知道为由，依第986条免除这8000元的返还？",
    prerequisite: "能核对给付原因、获知时间和利益的实际去向。",
    minutes: "6–10",
    paragraphs: [
      "第986条的不返还条件须同时具备：得利人不知道且不应知道没有法律根据，并且取得的利益已不存在。仅说自己最初没发现收错，不能免掉仍然存在的利益。",
      "看利益去向，不能只看账户余额。钱变成物品、替自己还债或省下本来要花的钱，可能仍留有经济利益；原物完全灭失且无残值、替代物、节省支出或其他价值替代时，才按本案已查明的范围判断。",
    ],
    example: {
      title: "还留在账户里的八千元",
      facts:
        "本案为原创教学虚构，发生于2026年9月。9月1日，燕澄公司因收款账号录入错误，将8000元转给陶薇，双方没有使陶薇保有该款的合同或其他根据。为限定本题，取得时陶薇不知道且不应知道该款没有法律根据，这一点没有争议。9月3日，银行完成核验并将错误情况告知陶薇、公司提出返还请求；当时8000元仍完整留在陶薇账户，未使用、未转出。陶薇只以自己收款时完全不知情为由主张可以不还。本题无迟延拒返损失。",
      analysis:
        "不能。第986条还要求取得的利益已经不存在。本案8000元仍完整在陶薇账户，利益并未消失；最初不知情不能单独免除这笔仍在利益的返还。",
    },
    pitfall:
      "把善意等同于必定不用返，或把钱花出、原物离手等同于所有利益都消失。",
    recall: {
      prompt:
        "陶薇能否仅以收款时不知道且不应知道为由，依第986条免除这8000元的返还？",
      reference:
        "不知道且不应知道还不够，还要看利益是否已经不存在；账户原款或保留下的经济利益仍须核对。",
    },
    sources: [
      "civil-quasi-enrichment-basis985",
      "civil-quasi-enrichment-good986",
    ],
    exercises: [
      {
        caseId: "civil-quasi-contract-innocent-receipt-money-remains",
        relatedTopicIds: ["civil-enrichment-good-faith"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。9月1日，燕澄公司因收款账号录入错误，将8000元转给陶薇，双方没有使陶薇保有该款的合同或其他根据。为限定本题，取得时陶薇不知道且不应知道该款没有法律根据，这一点没有争议。9月3日，银行完成核验并将错误情况告知陶薇、公司提出返还请求；当时8000元仍完整留在陶薇账户，未使用、未转出。陶薇只以自己收款时完全不知情为由主张可以不还。本题无迟延拒返损失。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "不能。第986条还要求取得的利益已经不存在。本案8000元仍完整在陶薇账户，利益并未消失；最初不知情不能单独免除这笔仍在利益的返还。",
        sources: [
          "civil-quasi-enrichment-basis985",
          "civil-quasi-enrichment-good986",
        ],
        id: "civil-quasi-contract-innocent-receipt-money-remains-choice",
        kind: "objective",
        choiceMode: "single",
        title: "还留在账户里的八千元：选择判断",
        prompt:
          "陶薇能否仅以收款时不知道且不应知道为由，依第986条免除这8000元的返还？",
        options: [
          {
            id: "a",
            text: "能；收款时善意就永久不必返还任何仍在的利益",
            explanation: "第986条还要求取得利益已经不存在，不能只看主观状态。",
          },
          {
            id: "b",
            text: "不能；8000元仍在，不满足利益已不存在的条件",
            explanation: "本案只具备最初不知且不应知，未具备利益灭失条件。",
          },
          {
            id: "c",
            text: "能；银行发出通知会自动让账户里的钱不再算利益",
            explanation: "通知不使账户原款自动消失。",
          },
          {
            id: "d",
            text: "不能，但法律统一要求她在本金外另付一倍赔偿",
            explanation: "本案没有已证明损失，第986条也没有固定加倍公式。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-quasi-contract-innocent-receipt-money-remains",
        relatedTopicIds: ["civil-enrichment-good-faith"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。9月1日，燕澄公司因收款账号录入错误，将8000元转给陶薇，双方没有使陶薇保有该款的合同或其他根据。为限定本题，取得时陶薇不知道且不应知道该款没有法律根据，这一点没有争议。9月3日，银行完成核验并将错误情况告知陶薇、公司提出返还请求；当时8000元仍完整留在陶薇账户，未使用、未转出。陶薇只以自己收款时完全不知情为由主张可以不还。本题无迟延拒返损失。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "不能。第986条还要求取得的利益已经不存在。本案8000元仍完整在陶薇账户，利益并未消失；最初不知情不能单独免除这笔仍在利益的返还。",
        sources: [
          "civil-quasi-enrichment-basis985",
          "civil-quasi-enrichment-good986",
        ],
        id: "civil-quasi-contract-innocent-receipt-money-remains-written",
        kind: "subjective",
        title: "还留在账户里的八千元：写出分析",
        prompt:
          "陶薇能否仅以收款时不知道且不应知道为由，依第986条免除这8000元的返还？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-quasi-innocent-existing-benefit",
            label: "善意但利益仍在，不能依本条免责",
            meaning:
              "联系8000元在通知和请求时仍完整存在，说明善意本身不足以满足第986条免责条件，应返还现存利益。",
            acceptable:
              "说明不知道收错不代表能留着，钱还在就不符合利益已消失的条件，应还8000元即可；接受等义表达。",
            boundary:
              "不要求补作善意认定；不增加无证据的利息、损失或惩罚赔偿。",
          },
        ],
      },
      {
        caseId: "civil-quasi-contract-innocent-display-destroyed",
        relatedTopicIds: ["civil-enrichment-good-faith"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。9月2日，禾景公司因交付清单错误，把一件价值3000元的普通展示品交给任澄；本题已查明并不存在使任澄保有该物的合同、赠与或其他根据。取得至下述事故发生前，任澄不知道且不应知道没有法律根据，这一非所考前提无争议。9月4日，该独立存放、尚未使用的展示品因意外事故完全毁损，任澄没有过错；物品无残值，也没有转卖所得、替代物、保险或赔偿请求权，未替任澄省下本来会支出的费用，也没有其他财产增益。事故责任不在本题范围。9月8日，公司才告知交付错误，并仅请求按不当得利返还该项已灭失利益的3000元价值。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "任澄不用按不当得利返还这3000元。他在收下物品到毁损前都不知道、也不应知道交付有误；在获知前物品已完全毁损，也没有留下残值、替代利益或节省支出，符合第986条的不返还条件。",
        sources: ["civil-quasi-enrichment-good986"],
        id: "civil-quasi-contract-innocent-display-destroyed-choice",
        kind: "objective",
        choiceMode: "single",
        title: "通知到来前毁损的展示品：选择判断",
        prompt: "就本次该项不当得利返还请求，任澄是否仍须返还3000元价值？",
        options: [
          {
            id: "a",
            text: "仍须返还，因为第986条从不考虑利益是否已经不存在",
            explanation: "该条明确把善意且利益已不存在作为不负该项返还的条件。",
          },
          {
            id: "b",
            text: "仍须返还，因为原物毁损就自动证明受领人知道交付错误",
            explanation:
              "毁损不等于知道或应当知道无根据，本题又已限定相关主观前提。",
          },
          {
            id: "c",
            text: "不须返还，并且无论另有什么独立行为都免除所有责任",
            explanation: "本条只处理相应不当得利返还，不能无限扩展免责。",
          },
          {
            id: "d",
            text: "就本次已灭失利益的返还不承担义务，不能扩成免除一切责任",
            explanation:
              "主观前提已限定，原物与所有价值替代均已不存在，符合第986条。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-quasi-contract-innocent-display-destroyed",
        relatedTopicIds: ["civil-enrichment-good-faith"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。9月2日，禾景公司因交付清单错误，把一件价值3000元的普通展示品交给任澄；本题已查明并不存在使任澄保有该物的合同、赠与或其他根据。取得至下述事故发生前，任澄不知道且不应知道没有法律根据，这一非所考前提无争议。9月4日，该独立存放、尚未使用的展示品因意外事故完全毁损，任澄没有过错；物品无残值，也没有转卖所得、替代物、保险或赔偿请求权，未替任澄省下本来会支出的费用，也没有其他财产增益。事故责任不在本题范围。9月8日，公司才告知交付错误，并仅请求按不当得利返还该项已灭失利益的3000元价值。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "任澄不用按不当得利返还这3000元。他在收下物品到毁损前都不知道、也不应知道交付有误；在获知前物品已完全毁损，也没有留下残值、替代利益或节省支出，符合第986条的不返还条件。",
        sources: ["civil-quasi-enrichment-good986"],
        id: "civil-quasi-contract-innocent-display-destroyed-written",
        kind: "subjective",
        title: "通知到来前毁损的展示品：写出分析",
        prompt:
          "就本次该项不当得利返还请求，任澄是否仍须返还3000元价值？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-quasi-innocent-extinguished-benefit",
            label: "善意且利益已经不存在",
            meaning:
              "结合获知前不知道且不应知道、原物完全毁损且无残值或任何价值替代，认定不承担本次该项不当得利返还义务。",
            acceptable:
              "说明当时不知道也不应知道收错，知道之前东西就全毁了，又没留下替代利益，依986不用返这项利益即可；接受等义表达。",
            boundary:
              "主观善意和事故无过错均作为不考前提；不要求判断事故责任，不得扩成所有法律关系下一概免责。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-enrichment-bad-faith",
    title: "知道或应当知道后的返还与损失",
    headline:
      "知道或应当知道无根据仍不能保有利益；有证据证明的损失依法赔，不能套固定加倍公式。",
    goal: "沈泊能否要求返还5万元，并请求赔偿这60元已证明的利息损失？",
    prerequisite: "能核对给付原因、获知时间和利益的实际去向。",
    minutes: "6–10",
    paragraphs: [
      "得利人知道或者应当知道利益没有法律根据时，受损者可以请求返还其取得的利益，并依法请求赔偿损失。不能把责任只限于本人亲口承认已经知道。",
      "损失要落到本案证据和因果关系，不从本金推一个统一赔偿倍数。用误收款清自己的真实债务、从而保留原本要还债的自有资金，也不能只凭收款账户余额为零就说利益全没了。",
    ],
    example: {
      title: "核验后仍然扣着款项",
      facts:
        "本案为原创教学虚构，发生于2026年9月。9月3日，沈泊把5万元货款误转给与其无交易、借贷或赠与关系的杜祺。9月4日，银行核验材料和双方通话已经让杜祺清楚知道收错，沈泊要求立即退回，说明原定货款将于9月6日到期。杜祺账户内5万元完整可退，却明确拒绝，直到9月10日仍扣着。证据已确认：沈泊因此只能向银行短期融资以按期付款，实际支付60元利息，这项利息支出必要合理，且由杜祺获知错误后的拒退造成。本题不存在另应扣减或重复赔偿的事实。",
      analysis:
        "可以。杜祺9月4日已经知道没有根据，却继续扣着可退的5万元，应返还；证据又确认这次拒退使沈泊发生必要合理的60元融资利息，可依第987条请求赔偿。60元来自本案已证明损失，不是按本金统一加倍。",
    },
    pitfall: "把没有亲口承认当作永远善意，或认为知道后只要赶快花掉就可以不返。",
    recall: {
      prompt: "沈泊能否要求返还5万元，并请求赔偿这60元已证明的利息损失？",
      reference:
        "知道或应当知道无根据仍不能保有利益；有证据证明的损失依法赔，不能套固定加倍公式。",
    },
    sources: [
      "civil-quasi-enrichment-bad987",
      "civil-quasi-enrichment-good986",
    ],
    exercises: [
      {
        caseId: "civil-quasi-contract-known-error-refusal-proven-loss",
        relatedTopicIds: ["civil-enrichment-bad-faith"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。9月3日，沈泊把5万元货款误转给与其无交易、借贷或赠与关系的杜祺。9月4日，银行核验材料和双方通话已经让杜祺清楚知道收错，沈泊要求立即退回，说明原定货款将于9月6日到期。杜祺账户内5万元完整可退，却明确拒绝，直到9月10日仍扣着。证据已确认：沈泊因此只能向银行短期融资以按期付款，实际支付60元利息，这项利息支出必要合理，且由杜祺获知错误后的拒退造成。本题不存在另应扣减或重复赔偿的事实。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "可以。杜祺9月4日已经知道没有根据，却继续扣着可退的5万元，应返还；证据又确认这次拒退使沈泊发生必要合理的60元融资利息，可依第987条请求赔偿。60元来自本案已证明损失，不是按本金统一加倍。",
        sources: ["civil-quasi-enrichment-bad987"],
        id: "civil-quasi-contract-known-error-refusal-proven-loss-choice",
        kind: "objective",
        choiceMode: "single",
        title: "核验后仍然扣着款项：选择判断",
        prompt: "沈泊能否要求返还5万元，并请求赔偿这60元已证明的利息损失？",
        options: [
          {
            id: "a",
            text: "可以返还5万元，并依法赔偿已证明的60元损失",
            explanation:
              "已知无根据后继续拒退，且该具体损失及因果关系已由证据确认，适用第987条。",
          },
          {
            id: "b",
            text: "只能返本金，因为不当得利在任何情况下都不能赔损失",
            explanation: "第987条明文允许依法赔偿损失。",
          },
          {
            id: "c",
            text: "本金可以不返，只要杜祺没有在转账前主动索要钱",
            explanation: "知道无根据后不能只以最初没有索要来保有利益。",
          },
          {
            id: "d",
            text: "应不问实际损失，一律按本金三倍赔偿",
            explanation: "第987条没有固定三倍公式，本题按已证明损失判断。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-quasi-contract-known-error-refusal-proven-loss",
        relatedTopicIds: ["civil-enrichment-bad-faith"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。9月3日，沈泊把5万元货款误转给与其无交易、借贷或赠与关系的杜祺。9月4日，银行核验材料和双方通话已经让杜祺清楚知道收错，沈泊要求立即退回，说明原定货款将于9月6日到期。杜祺账户内5万元完整可退，却明确拒绝，直到9月10日仍扣着。证据已确认：沈泊因此只能向银行短期融资以按期付款，实际支付60元利息，这项利息支出必要合理，且由杜祺获知错误后的拒退造成。本题不存在另应扣减或重复赔偿的事实。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "可以。杜祺9月4日已经知道没有根据，却继续扣着可退的5万元，应返还；证据又确认这次拒退使沈泊发生必要合理的60元融资利息，可依第987条请求赔偿。60元来自本案已证明损失，不是按本金统一加倍。",
        sources: ["civil-quasi-enrichment-bad987"],
        id: "civil-quasi-contract-known-error-refusal-proven-loss-written",
        kind: "subjective",
        title: "核验后仍然扣着款项：写出分析",
        prompt:
          "沈泊能否要求返还5万元，并请求赔偿这60元已证明的利息损失？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-quasi-known-error-return",
            label: "明知无根据应返本金",
            meaning:
              "结合9月4日明确获知错误后仍拒退，认定沈泊可请求杜祺返还5万元。",
            acceptable:
              "说明银行和通话已核清钱转错，他知道后还扣着，应还5万元即可；接受等义表达。",
            boundary: "不要求判断诈骗、侵占或银行责任。",
          },
          {
            id: "civil-quasi-proven-loss-compensation",
            label: "依法赔偿本案已证明损失",
            meaning:
              "联系证据确认拒退导致必要合理融资利息60元，认定可依法请求赔偿该损失，而非虚构固定倍数。",
            acceptable:
              "说明因为明知后拒退才多付的60元利息已经证明，可以请求赔这60元即可。",
            boundary:
              "损失数额与因果关系是题内已查明事实；不要求套利率公式，不额外增加精神损害、惩罚赔偿或全部维权费。",
          },
        ],
      },
      {
        caseId: "civil-quasi-contract-should-know-pay-own-debt",
        relatedTopicIds: ["civil-enrichment-bad-faith"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。9月1日，贺翊本人刚在结算单上签认应收货款只有5000元，却收到付款方夏岑转来的5万元，付款回单附言仍写着“本期结算5000元”。他看过回单，但未核对数额差别。9月2日，他把多收的4.5万元用于清偿自己真实、到期的个人借款；原本准备还债的4.5万元自有存款因而没有动用，仍留在他的另一账户。真实应收的5000元则已转入自己的经营账户。夏岑于9月3日正式通知多付并要求返还。贺翊只说自己从未亲口承认知道多付，收款账户余额又已为零，因此可以不还多收部分。本题不另请求损失赔偿。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "不能，应返还多收的4.5万元。贺翊本人刚签认5000元结算，又看过金额5万元、附言5000元的回单，至少应当知道存在多付，不能以没亲口承认为由回避第987条。多收款替他清了个人债，原备还的自有款仍保留下来，利益并未因收款账户归零而消失。",
        sources: [
          "civil-quasi-enrichment-good986",
          "civil-quasi-enrichment-bad987",
        ],
        id: "civil-quasi-contract-should-know-pay-own-debt-choice",
        kind: "objective",
        choiceMode: "single",
        title: "多收的钱用于还自己的债：选择判断",
        prompt:
          "贺翊能否以没有承认明知、收款账户余额为零为由，拒绝返还多收的4.5万元？",
        options: [
          {
            id: "a",
            text: "能；只有本人亲口承认知道才可能负返还义务",
            explanation: "第987条同时包括应当知道，不以承认作为唯一判断方式。",
          },
          {
            id: "b",
            text: "能；无论资金变成什么利益，只要原收款账户归零就永久免责",
            explanation:
              "账户余额不等于全部经济利益，本案仍保留了原备还的资金。",
          },
          {
            id: "c",
            text: "不能；本案至少应知多付，且还自己债务保留了等额自有资金",
            explanation:
              "第987条包括应当知道；案内清债和资金保留表明利益并未消失。",
          },
          {
            id: "d",
            text: "不能，但依法必须连真实应收的5000元也一起退回",
            explanation:
              "真实应收5000元有结算根据，本题应返的是额外多收的4.5万元。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-quasi-contract-should-know-pay-own-debt",
        relatedTopicIds: ["civil-enrichment-bad-faith"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。9月1日，贺翊本人刚在结算单上签认应收货款只有5000元，却收到付款方夏岑转来的5万元，付款回单附言仍写着“本期结算5000元”。他看过回单，但未核对数额差别。9月2日，他把多收的4.5万元用于清偿自己真实、到期的个人借款；原本准备还债的4.5万元自有存款因而没有动用，仍留在他的另一账户。真实应收的5000元则已转入自己的经营账户。夏岑于9月3日正式通知多付并要求返还。贺翊只说自己从未亲口承认知道多付，收款账户余额又已为零，因此可以不还多收部分。本题不另请求损失赔偿。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "不能，应返还多收的4.5万元。贺翊本人刚签认5000元结算，又看过金额5万元、附言5000元的回单，至少应当知道存在多付，不能以没亲口承认为由回避第987条。多收款替他清了个人债，原备还的自有款仍保留下来，利益并未因收款账户归零而消失。",
        sources: [
          "civil-quasi-enrichment-good986",
          "civil-quasi-enrichment-bad987",
        ],
        id: "civil-quasi-contract-should-know-pay-own-debt-written",
        kind: "subjective",
        title: "多收的钱用于还自己的债：写出分析",
        prompt:
          "贺翊能否以没有承认明知、收款账户余额为零为由，拒绝返还多收的4.5万元？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-quasi-should-know-overpayment",
            label: "依金额与结算事实认定应知并返多收款",
            meaning:
              "联系本人签认5000元、收到5万元并看过回单，说明至少应当知道多付，须返还多收4.5万元，不以本人承认明知为唯一条件。",
            acceptable:
              "说明自己刚对过账只应收5000元，却收到5万，不能装作没承认就留着，多的4.5万要还即可；接受等义表达。",
            boundary:
              "不要求证明主观故意或退回真实应收5000元；不额外生成损失或罚款。",
          },
          {
            id: "civil-quasi-own-debt-benefit-remains",
            label: "还个人债保留了相应经济利益",
            meaning:
              "联系误收款清偿本人真实债务、原备还自有款未动，说明利益仍在，不能仅凭原账户归零主张已不存在。",
            acceptable:
              "说明钱虽转出还债，但自己的债少了、原准备的钱还在，不能当成白白消失即可。",
            boundary:
              "结论来自本案明确保留自有资金的事实，不泛称所有消费都消失或所有支出都必定留下同等利益。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-enrichment-transfer",
    title: "无偿转给第三人",
    headline:
      "取得的利益无偿转给第三人，可在相应范围向第三人请求返还；转多少、已还多少都要核对。",
    goal: "江澜能否依第988条向顾晞请求返还？顾晞是否须仅因收过赠款就返还原误汇的全部6万元？",
    prerequisite: "能核对给付原因、获知时间和利益的实际去向。",
    minutes: "6–10",
    paragraphs: [
      "得利人把取得的利益无偿转给第三人，受损者可依第988条请求第三人在相应范围内返还。要查明转出的是哪部分利益、第三人是否支付对价及取得多少，不能自动把原误收全部都压给只收到一部分的人。",
      "本组仅考无偿且利益仍在的受领。相应返还不等于自动连带，也不允许就同一笔本金重复受偿；已有本金返还应作相应扣除。有偿受让及第三人利益另行灭失，不在本组结论内。",
    ],
    example: {
      title: "只赠出了其中两万元",
      facts:
        "本案为原创教学虚构，发生于2026年9月。9月1日，江澜误将6万元转给无交易、借贷、赠与或其他给付关系的顾礼，银行当日核验并告知顾礼。9月2日，顾礼仍把其中2万元无偿送给妹妹顾晞，顾晞没有支付任何对价，只收到这2万元。9月3日，顾晞获知原款系误汇；2万元始终完整留在她的账户，顾礼处余下4万元也未转给她。江澜尚未收到任何返还，本题只问能否及在多少本金范围内向顾晞请求。",
      analysis:
        "可以向顾晞请求，但本题范围为她无偿取得的2万元，不能把她从未取得的另外4万元也算上。顾礼将误收利益的一部分无偿转给她，且该款仍在，符合第988条的相应返还规则。",
    },
    pitfall:
      "认为给了亲友就不能追，或认为第三人一收礼就要为原误收全部承担连带责任。",
    recall: {
      prompt:
        "江澜能否依第988条向顾晞请求返还？顾晞是否须仅因收过赠款就返还原误汇的全部6万元？",
      reference:
        "取得的利益无偿转给第三人，可在相应范围向第三人请求返还；转多少、已还多少都要核对。",
    },
    sources: [
      "civil-quasi-enrichment-basis985",
      "civil-quasi-enrichment-transfer988",
    ],
    exercises: [
      {
        caseId: "civil-quasi-contract-partial-free-transfer-third",
        relatedTopicIds: ["civil-enrichment-transfer"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。9月1日，江澜误将6万元转给无交易、借贷、赠与或其他给付关系的顾礼，银行当日核验并告知顾礼。9月2日，顾礼仍把其中2万元无偿送给妹妹顾晞，顾晞没有支付任何对价，只收到这2万元。9月3日，顾晞获知原款系误汇；2万元始终完整留在她的账户，顾礼处余下4万元也未转给她。江澜尚未收到任何返还，本题只问能否及在多少本金范围内向顾晞请求。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "可以向顾晞请求，但本题范围为她无偿取得的2万元，不能把她从未取得的另外4万元也算上。顾礼将误收利益的一部分无偿转给她，且该款仍在，符合第988条的相应返还规则。",
        sources: [
          "civil-quasi-enrichment-basis985",
          "civil-quasi-enrichment-transfer988",
        ],
        id: "civil-quasi-contract-partial-free-transfer-third-choice",
        kind: "objective",
        choiceMode: "single",
        title: "只赠出了其中两万元：选择判断",
        prompt:
          "江澜能否依第988条向顾晞请求返还？顾晞是否须仅因收过赠款就返还原误汇的全部6万元？",
        options: [
          {
            id: "a",
            text: "完全不能；只要转给亲属，就永远不在第988条范围",
            explanation: "亲属关系不排除无偿第三人的相应返还义务。",
          },
          {
            id: "b",
            text: "可以在2万元范围请求；不能只因收礼就把全部6万元压给她",
            explanation:
              "第三人只无偿取得2万元，本题相应范围应与其取得部分对应。",
          },
          {
            id: "c",
            text: "可以直接要求她返还6万元，即使另4万元从未给她",
            explanation: "这超出本案无偿转入第三人的利益范围。",
          },
          {
            id: "d",
            text: "必须先虚构双方连带，才可讨论任何第三人返还",
            explanation:
              "第988条本身规定第三人相应返还，不以先推导自动连带为条件。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-quasi-contract-partial-free-transfer-third",
        relatedTopicIds: ["civil-enrichment-transfer"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。9月1日，江澜误将6万元转给无交易、借贷、赠与或其他给付关系的顾礼，银行当日核验并告知顾礼。9月2日，顾礼仍把其中2万元无偿送给妹妹顾晞，顾晞没有支付任何对价，只收到这2万元。9月3日，顾晞获知原款系误汇；2万元始终完整留在她的账户，顾礼处余下4万元也未转给她。江澜尚未收到任何返还，本题只问能否及在多少本金范围内向顾晞请求。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "可以向顾晞请求，但本题范围为她无偿取得的2万元，不能把她从未取得的另外4万元也算上。顾礼将误收利益的一部分无偿转给她，且该款仍在，符合第988条的相应返还规则。",
        sources: [
          "civil-quasi-enrichment-basis985",
          "civil-quasi-enrichment-transfer988",
        ],
        id: "civil-quasi-contract-partial-free-transfer-third-written",
        kind: "subjective",
        title: "只赠出了其中两万元：写出分析",
        prompt:
          "江澜能否依第988条向顾晞请求返还？顾晞是否须仅因收过赠款就返还原误汇的全部6万元？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-quasi-free-third-return",
            label: "无偿取得部分利益的第三人可被请求返还",
            meaning:
              "联系顾礼把误收利益2万元无偿给顾晞、后者未付对价且利益仍在，认定江澜可依第988条请求其相应返还。",
            acceptable:
              "说明她没付钱就接收了转错款中的2万，受损人可找她退这部分即可；接受等义表达。",
            boundary: "不要求分析赠与合同效力、刑事责任或先确认自动连带。",
          },
          {
            id: "civil-quasi-partial-transfer-scope",
            label: "范围限本案取得的2万元",
            meaning:
              "说明顾晞只取得2万元，不能仅凭这次无偿受领就让她返还原款全部6万元。",
            acceptable:
              "说明只收到了2万就只按这部分讨论，没收到的4万不因收礼自动由她负责即可。",
            boundary:
              "不推导有偿买家责任或其他独立法律关系，也不允许同一本金双重回收。",
          },
        ],
      },
      {
        caseId: "civil-quasi-contract-whole-free-transfer-part-returned",
        relatedTopicIds: ["civil-enrichment-transfer"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。9月5日，秦钧误将3万元转给与其无给付关系的赵澄，当日已告知并经银行核实。9月6日，赵澄仍把这3万元全部无偿转给朋友周遥，周遥未付对价。9月7日，周遥收到错误通知，3万元至今完整在其账户。9月10日，赵澄从自己的其他资金中向秦钧退回1万元，双方收据明确记载这1万元冲抵本次3万元误汇的本金。9月11日，秦钧仍要求周遥另外退足3万元，称向不同的人收款不用扣除已回本金。本题只问本金，没有另项损失或利息请求。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "按本题本金返还，尚可向周遥请求的相应未返部分为2万元，不能累计收回4万元。周遥无偿取得全部误汇利益，原本可被请求相应返还；但秦钧已经收回冲抵同一本金的1万元，应扣除，不能就同一损失重复受偿。",
        sources: [
          "civil-quasi-enrichment-basis985",
          "civil-quasi-enrichment-transfer988",
        ],
        id: "civil-quasi-contract-whole-free-transfer-part-returned-choice",
        kind: "objective",
        choiceMode: "single",
        title: "全部赠出但已有一万元退回：选择判断",
        prompt:
          "秦钧还能要求周遥返还多少本金？能否保留已收1万元，再向周遥另收足3万元？",
        options: [
          {
            id: "a",
            text: "不能向周遥请求任何返还，因为只有最初收款人会有义务",
            explanation: "第988条允许对无偿受让利益的第三人请求相应返还。",
          },
          {
            id: "b",
            text: "仍可另收足3万元，因为换了请求对象就不必扣除已返本金",
            explanation: "同一本金不能仅因向不同人请求而重复受偿。",
          },
          {
            id: "c",
            text: "应统一让两人各返3万元，法律规定无偿转让必定双倍返还",
            explanation: "第988条没有自动双倍或两人各返全额的规则。",
          },
          {
            id: "d",
            text: "尚可在未返2万元范围请求，已冲抵本金的1万元应扣除",
            explanation: "无偿第三人相应返还须结合本次误汇本金已经返还的部分。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-quasi-contract-whole-free-transfer-part-returned",
        relatedTopicIds: ["civil-enrichment-transfer"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。9月5日，秦钧误将3万元转给与其无给付关系的赵澄，当日已告知并经银行核实。9月6日，赵澄仍把这3万元全部无偿转给朋友周遥，周遥未付对价。9月7日，周遥收到错误通知，3万元至今完整在其账户。9月10日，赵澄从自己的其他资金中向秦钧退回1万元，双方收据明确记载这1万元冲抵本次3万元误汇的本金。9月11日，秦钧仍要求周遥另外退足3万元，称向不同的人收款不用扣除已回本金。本题只问本金，没有另项损失或利息请求。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "按本题本金返还，尚可向周遥请求的相应未返部分为2万元，不能累计收回4万元。周遥无偿取得全部误汇利益，原本可被请求相应返还；但秦钧已经收回冲抵同一本金的1万元，应扣除，不能就同一损失重复受偿。",
        sources: [
          "civil-quasi-enrichment-basis985",
          "civil-quasi-enrichment-transfer988",
        ],
        id: "civil-quasi-contract-whole-free-transfer-part-returned-written",
        kind: "subjective",
        title: "全部赠出但已有一万元退回：写出分析",
        prompt:
          "秦钧还能要求周遥返还多少本金？能否保留已收1万元，再向周遥另收足3万元？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-quasi-whole-transfer-third",
            label: "全额无偿受让仍可有相应返还义务",
            meaning:
              "联系周遥未付对价取得全部3万元且款项仍在，说明秦钧并非只能找最初收款人，可依法向第三人请求相应返还。",
            acceptable:
              "说明这3万全是无偿转给朋友，钱还在朋友那里，可以依988要求相应退回即可；接受等义表达。",
            boundary:
              "不要求将两人责任定为连带、补充或其他未经题目要求的类型。",
          },
          {
            id: "civil-quasi-no-double-recovery",
            label: "扣除已返本金，剩2万元",
            meaning:
              "联系已退1万元明确冲抵同一3万元本金，认定尚余2万元，不能保留1万元再收足3万元形成重复受偿。",
            acceptable:
              "说明总本金只有3万，已经拿回1万，只剩2万可再要，不能换个人再多拿一次即可。",
            boundary:
              "本题没有利息或其他损失，不把本金上限扩成任何案件所有给付合计都绝不能超过本金。",
          },
        ],
      },
    ],
  },
];

export const civilQuasiContractChapters = [
  {
    id: "CIV-MANAGEMENT-WITHOUT-MANDATE",
    title: "无因管理",
    section: "民法",
    topicIds: [
      "civil-management-necessity",
      "civil-management-wishes-method",
      "civil-management-notice-report",
      "civil-management-ratification",
    ],
  },
  {
    id: "CIV-UNJUST-ENRICHMENT",
    title: "不当得利",
    section: "民法",
    topicIds: [
      "civil-enrichment-basis",
      "civil-enrichment-good-faith",
      "civil-enrichment-bad-faith",
      "civil-enrichment-transfer",
    ],
  },
];

export const civilQuasiContractExercises = civilQuasiContractTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilQuasiContractContentPack = {
  revision: civilQuasiContractRevision,
  snapshot: {
    topics: civilQuasiContractTopics,
    sources: civilQuasiContractSources,
  },
};
export const civilQuasiContractDefaultQueues = {
  objective: civilQuasiContractExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilQuasiContractExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilQuasiContractQuestion(id: string) {
  const question = civilQuasiContractExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilQuasiContractTopicForQuestion(id: string) {
  return civilQuasiContractTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilQuasiContractSameCaseQuestions(id: string) {
  const question = civilQuasiContractQuestion(id);
  return question
    ? structuredClone(
        civilQuasiContractExercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function civilQuasiContractChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilQuasiContractChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilQuasiContractTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
