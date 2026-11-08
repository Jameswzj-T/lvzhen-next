import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilNeighborPossessionRevision =
  "civil-neighbor-possession-2026-10-24.v1";

export const civilNeighborPossessionSources: ContentSources = {
  "civil-neighbor-general288296": {
    title: "《民法典》第288、289、296条：公平合理与避免损害",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-24直接核读最高人民法院官方《民法典》正文。2020-05-28通过，2021-01-01施行。相邻利用须依法、公平合理并尽量避免损害。法条没有给予无限期、无限范围或当然免费的占用权。本组不设置当地习惯冲突、补偿价格或损失金额公式。",
  },
  "civil-neighbor-water290": {
    title: "《民法典》第290条：用水排水与自然流水",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-24直接核读最高人民法院官方《民法典》正文。2020-05-28通过，2021-01-01施行。用水案明确天然沟渠供水足够双方合理灌溉，上游不能因先引水就截走全部；排水案为原有自然流向的普通雨水，未加大汇流、未夹污，不是向邻地任意倾倒积水。未处理取水行政许可、跨区调配或排污责任。",
  },
  "civil-neighbor-access291": {
    title: "《民法典》第291条：必须利用相邻土地的通行",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-24直接核读最高人民法院官方《民法典》正文。2020-05-28通过，2021-01-01施行。正例经勘查只有邻院边缘旧道可安全连通公共路；反例有可正常使用的公共巷道，只为省7分钟。未设通行合同或地役权，必要通行不等于取得邻地所有权或任意扩大使用。",
  },
  "civil-neighbor-construction292": {
    title: "《民法典》第292、296条：建造修缮、管线施工的必要利用",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-24直接核读最高人民法院官方《民法典》正文。2020-05-28通过，2021-01-01施行。外墙修缮只能从邻地施工，方案仅用院边空地3天并有防护；既有合法水管更换可沿原槽1天完成，不能为方便堆料扩大为整院2周并毁花坛。工期为虚构案内事实，不是法定统一时限；管线原有敷设权不争。",
  },
  "civil-neighbor-light293": {
    title: "《民法典》第293条：通风采光日照与国家工程标准",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-24直接核读最高人民法院官方《民法典》正文。2020-05-28通过，2021-01-01施行。检测事实已限定真实无争议：邻屋原有指标符合适用国家工程建设标准，新建封闭储物间使通风采光日照不再符合要求，变化由新建部分造成。不虚构统一间距、米数、日照小时或用任何轻微感受代替技术事实。",
  },
  "civil-neighbor-safety295": {
    title: "《民法典》第295条：施工不得危及相邻不动产安全",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-24直接核读最高人民法院官方《民法典》正文。2020-05-28通过，2021-01-01施行。挖掘造成邻屋地基失稳危险由检测报告支持，技术前提不要求考生另算。只要求停止该段危险开挖并先支护，不扩大为所有建设一律停工或虚构赔偿数额。",
  },
  "civil-neighbor-remedy236": {
    title: "《民法典》第236条：排除妨害与消除危险",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-24直接核读最高人民法院官方《民法典》正文。2020-05-28通过，2021-01-01施行。用于采光妨害与有证据支持的安全危险。消除危险不以已经倒塌或先算出金钱损失为前提；不授予考生自行拆除邻屋、强行进场等自力执行权。",
  },
  "civil-possession-contract458": {
    title: "《民法典》第458条：合同产生的占有",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。占有与所有权分开。有效合同约定的使用期尚未结束，所有人不能只凭所有权跳过约定提前收回；约定归还期限届满且无继续占有依据时应归还。不涉及违约、解除或紧急救助等另有收回事由。",
  },
  "civil-possession-lease733": {
    title: "《民法典》第733—734条：租期届满与继续使用",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。租期已满且出租人明确反对继续使用，没有续租、留置或其他占有依据。明确排除出租人未提异议形成不定期续租的事实，不把所有到期继续使用都一概认定无权。",
  },
  "civil-possession-return460": {
    title: "《民法典》第460条：原物、孳息与必要费用",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。两案为仓库错送独立盆栽，双方确认物主未失去所有权且收件人没有继续占有依据，不讨论善意取得。善意期间的必要养护费用应支付，纯装饰费用不属本题必要费用；原物及尚在的果实不能因养护而据为己有。",
  },
  "civil-possession-damage459": {
    title: "《民法典》第459条：恶意占有中的使用损害",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。收件人看过物主凭证并已承认错送，仍违反设备负荷标识使用而造成确定修理损失，需依法赔偿。本题不把恶意当作日常道德评价，也不讨论正常损耗或因果不明的损失。",
  },
  "civil-possession-indemnity461": {
    title: "《民法典》第461条：毁损后取得的保险金",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。无继续占有依据的相机因雷击毁损，错收者已经实际取得相应保险金，物主要求返还。只考该笔毁损保险金的转交，不作保险合同承保资格评价，也不将善意期间毁损扩成占有人一概不需返还任何财产。",
  },
  "civil-possession-remedy462": {
    title: "《民法典》第462条：占有保护及一年期间",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。第一案为租赁期内承租人对陌生侵占人的返还请求，不要求承租人证明自己是所有人。第二案仅考原占有人以462条主张返还原物，一年自侵占发生起算，届满未行使则该项请求权消灭；不宣称所有权返还、合同或赔偿请求一并消灭，也不把及时起诉后审理超过一年当作未行使。",
  },
};

export const civilNeighborPossessionTopics: FaultTopic[] = [
  {
    id: "civil-neighbor-water",
    title: "用水与排水",
    headline:
      "自然流水要合理分配，排水要尊重自然流向；上下游位置都不是任意堵水的理由。",
    goal: "郑澈能否凭上游位置和先修引水口，拒绝为下游保留合理用水？",
    prerequisite: "能识别相邻双方的利用需求、可行替代办法与影响。",
    minutes: "6–10",
    paragraphs: [
      "相邻权利人应为彼此用水、排水提供必要便利。自然流水应合理分配，不能只因先取水、地在上游，就把下游正常需要的水全部截走。",
      "自然排水应尊重原有流向，利用邻地也要尽量避免损害。正常雨水的自然通过，与人为集中增大水量、排污或随意泼水，不是同一情形。",
    ],
    example: {
      title: "上游新装的引水闸",
      facts:
        "本案为原创教学虚构，发生于2026年9月。郑澈与杜禾承包上下游相邻菜地，一条天然小沟依次流经两块地。现场记录表明，现有水量足够两家按作物实际需要灌溉。郑澈在上游加闸，把全部水引进自己的蓄水池，水池满后还向别处溢流，下游菜地却断水。杜禾要求调整引水量，郑澈说自己先修了引水口，所以可以一直截取全部来水。",
      analysis:
        "不能。自然流水应在相邻权利人之间合理分配。现有水量足够两家正常灌溉，郑澈却把水全部截走并造成下游断水，应调整引水方式，不能凭先修引水口独占。",
    },
    pitfall: "把上游等同于独占水源，或认为流经自己用地就可完全堵断自然排水。",
    recall: {
      prompt: "郑澈能否凭上游位置和先修引水口，拒绝为下游保留合理用水？",
      reference:
        "自然流水要合理分配，排水要尊重自然流向；上下游位置都不是任意堵水的理由。",
    },
    sources: ["civil-neighbor-water290", "civil-neighbor-general288296"],
    exercises: [
      {
        caseId: "civil-neighbor-possession-water-fair-share",
        relatedTopicIds: ["civil-neighbor-water"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。郑澈与杜禾承包上下游相邻菜地，一条天然小沟依次流经两块地。现场记录表明，现有水量足够两家按作物实际需要灌溉。郑澈在上游加闸，把全部水引进自己的蓄水池，水池满后还向别处溢流，下游菜地却断水。杜禾要求调整引水量，郑澈说自己先修了引水口，所以可以一直截取全部来水。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。自然流水应在相邻权利人之间合理分配。现有水量足够两家正常灌溉，郑澈却把水全部截走并造成下游断水，应调整引水方式，不能凭先修引水口独占。",
        sources: ["civil-neighbor-water290", "civil-neighbor-general288296"],
        id: "civil-neighbor-possession-water-fair-share-choice",
        kind: "objective",
        choiceMode: "single",
        title: "上游新装的引水闸：选择判断",
        prompt: "郑澈能否凭上游位置和先修引水口，拒绝为下游保留合理用水？",
        options: [
          {
            id: "a",
            text: "不能，应调整引水方式并合理分配自然流水",
            explanation:
              "第290条规定合理分配，先引水不产生对下游需要的当然排除权。",
          },
          {
            id: "b",
            text: "能，只要地在上游就可以占有全部自然来水",
            explanation: "上游位置不能取代相邻用水的合理分配规则。",
          },
          {
            id: "c",
            text: "能，谁先修取水口，谁就永久排除其他相邻用水",
            explanation: "自行先修设施不自动创设这种排他权。",
          },
          {
            id: "d",
            text: "不能，所以法律在所有情形下都强制每家各分一半",
            explanation: "合理分配应结合具体需要，法条未规定一律各半。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-neighbor-possession-water-fair-share",
        relatedTopicIds: ["civil-neighbor-water"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。郑澈与杜禾承包上下游相邻菜地，一条天然小沟依次流经两块地。现场记录表明，现有水量足够两家按作物实际需要灌溉。郑澈在上游加闸，把全部水引进自己的蓄水池，水池满后还向别处溢流，下游菜地却断水。杜禾要求调整引水量，郑澈说自己先修了引水口，所以可以一直截取全部来水。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。自然流水应在相邻权利人之间合理分配。现有水量足够两家正常灌溉，郑澈却把水全部截走并造成下游断水，应调整引水方式，不能凭先修引水口独占。",
        sources: ["civil-neighbor-water290", "civil-neighbor-general288296"],
        id: "civil-neighbor-possession-water-fair-share-written",
        kind: "subjective",
        title: "上游新装的引水闸：写出分析",
        prompt:
          "郑澈能否凭上游位置和先修引水口，拒绝为下游保留合理用水？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-neighbor-water-reasonable-share",
            label: "应合理分水，不能凭先用而独占",
            meaning:
              "联系水量足够两家正常灌溉、上游全截导致下游断水，说明应调整引水并合理分配，先修设施不能独占。",
            acceptable:
              "说明水够两家用，上游不能全拦住让下游没水，应给下游合理用水即可；接受等义表达。",
            boundary:
              "不要求提出分配百分比、取水许可方案或认定天然水归个人所有。",
          },
        ],
      },
      {
        caseId: "civil-neighbor-possession-water-natural-drainage",
        relatedTopicIds: ["civil-neighbor-water"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。林苒的院地高于相邻孟行的院地，普通降雨一直沿地势通过院边旧沟排向外侧公共排水渠。林苒没有改变地形、集中增加水量或排入污水。孟行为铺平院地，把自己一侧的旧沟填实，雨水随即在上游积存。勘查表明，保留院边原沟即可排水，不会冲入孟行房屋，也不必改动其余院内设施。孟行仍说用地由自己使用，就可以全部封住。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。自然排水应尊重地势形成的原有流向，并提供必要便利。本案没有加大汇流或夹带污水，恢复院边原沟又不会冲入孟行房屋，孟行不能把通路全部堵住，让上游积水。",
        sources: ["civil-neighbor-water290", "civil-neighbor-general288296"],
        id: "civil-neighbor-possession-water-natural-drainage-choice",
        kind: "objective",
        choiceMode: "single",
        title: "被填平的旧排水沟：选择判断",
        prompt: "孟行能否以自己使用院地为由，完全堵住这条自然排水通路？",
        options: [
          {
            id: "a",
            text: "能，排水经过谁的用地，谁就可以随意完全截断",
            explanation: "用地权利仍受相邻自然排水规则限制。",
          },
          {
            id: "b",
            text: "不能，但林苒因此可把任何污水和新增积水都排进邻院",
            explanation: "本案必要便利不等于允许任意排污或加重相邻负担。",
          },
          {
            id: "c",
            text: "不能，应尊重原有自然流向并保留必要排水便利",
            explanation: "第290条与本案未新增负担、院边原沟可行的事实相符。",
          },
          {
            id: "d",
            text: "能，因为上游只能强迫水逆着地势另行流走",
            explanation: "法律要求尊重自然流向，不能仅凭邻地权利任意倒置。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-neighbor-possession-water-natural-drainage",
        relatedTopicIds: ["civil-neighbor-water"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。林苒的院地高于相邻孟行的院地，普通降雨一直沿地势通过院边旧沟排向外侧公共排水渠。林苒没有改变地形、集中增加水量或排入污水。孟行为铺平院地，把自己一侧的旧沟填实，雨水随即在上游积存。勘查表明，保留院边原沟即可排水，不会冲入孟行房屋，也不必改动其余院内设施。孟行仍说用地由自己使用，就可以全部封住。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。自然排水应尊重地势形成的原有流向，并提供必要便利。本案没有加大汇流或夹带污水，恢复院边原沟又不会冲入孟行房屋，孟行不能把通路全部堵住，让上游积水。",
        sources: ["civil-neighbor-water290", "civil-neighbor-general288296"],
        id: "civil-neighbor-possession-water-natural-drainage-written",
        kind: "subjective",
        title: "被填平的旧排水沟：写出分析",
        prompt:
          "孟行能否以自己使用院地为由，完全堵住这条自然排水通路？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-neighbor-water-natural-flow",
            label: "应保留本案必要自然排水便利",
            meaning:
              "联系原有地势雨水、未增水排污、院边原沟可行且不冲房屋，说明不能全堵，应尊重自然流向提供必要便利。",
            acceptable:
              "说明这是原来顺地势排走的正常雨水，不是另加污水，恢复边沟就行，不能一堵让上游积水即可；接受等义表达。",
            boundary:
              "不把自然排水扩成可以向邻院无限增水或排污，不要求计算排水量、赔偿或工程尺寸。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-neighbor-access",
    title: "必要通行",
    headline: "没有可行出路与只是想抄近路，要分开判断；必要便利不是任意占地。",
    goal: "周敏能否仅凭院地由自己使用，完全拒绝许朔沿旧道作上述日常通行？",
    prerequisite: "能识别相邻双方的利用需求、可行替代办法与影响。",
    minutes: "6–10",
    paragraphs: [
      "因通行必须利用相邻土地时，相邻权利人应提供必要便利。判断要看现场出入口、其他道路是否安全可行，以及日常使用的实际需要。",
      "已有能够正常通行的道路，仅因穿邻院更近，不能当然强迫邻人开路。必要通行的范围也应适合需求，不能随意扩成停车、堆货或占用整个院落。",
    ],
    example: {
      title: "通往公共路的院边旧道",
      facts:
        "本案为原创教学虚构，发生于2026年9月。许朔与周敏分别合法使用相邻宅地并居住。许朔住宅一侧临河，另一侧是无法安全通行的陡坡，现场勘查确认，连通公共道路只能经过周敏院边的一条旧道。许朔只要求沿旧道步行及搬运日常生活物品，不要求停车或堆货。周敏新装大门后将旧道完全锁住，理由是院地由自己使用，任何邻居都无权经过。双方没有另设通行合同或地役权。",
      analysis:
        "不能。旧道是许朔住宅连接公共路唯一安全可行的出路，日常通行必须利用这段邻地。周敏应提供必要便利，许朔则应按日常通行需要使用，不能另作停车堆货。",
    },
    pitfall: "把方便生活理解为只要自己更方便，邻人就必须让路。",
    recall: {
      prompt: "周敏能否仅凭院地由自己使用，完全拒绝许朔沿旧道作上述日常通行？",
      reference:
        "没有可行出路与只是想抄近路，要分开判断；必要便利不是任意占地。",
    },
    sources: ["civil-neighbor-access291", "civil-neighbor-general288296"],
    exercises: [
      {
        caseId: "civil-neighbor-possession-access-only-safe-route",
        relatedTopicIds: ["civil-neighbor-access"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。许朔与周敏分别合法使用相邻宅地并居住。许朔住宅一侧临河，另一侧是无法安全通行的陡坡，现场勘查确认，连通公共道路只能经过周敏院边的一条旧道。许朔只要求沿旧道步行及搬运日常生活物品，不要求停车或堆货。周敏新装大门后将旧道完全锁住，理由是院地由自己使用，任何邻居都无权经过。双方没有另设通行合同或地役权。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。旧道是许朔住宅连接公共路唯一安全可行的出路，日常通行必须利用这段邻地。周敏应提供必要便利，许朔则应按日常通行需要使用，不能另作停车堆货。",
        sources: ["civil-neighbor-access291", "civil-neighbor-general288296"],
        id: "civil-neighbor-possession-access-only-safe-route-choice",
        kind: "objective",
        choiceMode: "single",
        title: "通往公共路的院边旧道：选择判断",
        prompt:
          "周敏能否仅凭院地由自己使用，完全拒绝许朔沿旧道作上述日常通行？",
        options: [
          {
            id: "a",
            text: "能，院地权利足以排除一切邻里必要通行",
            explanation: "第291条明确规定必须利用相邻土地通行时的必要便利。",
          },
          {
            id: "b",
            text: "不能，本案应沿唯一安全出路提供必要通行便利",
            explanation:
              "有明确现场条件证明必须利用，需求限于步行和生活物品搬运。",
          },
          {
            id: "c",
            text: "不能，所以许朔自动取得整片院地的所有权",
            explanation: "提供通行便利不等于转移邻地权属。",
          },
          {
            id: "d",
            text: "能，只要未签合同，法律就完全不保护必要通行",
            explanation: "本题依据法定相邻关系，不以先有通行合同为前提。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-neighbor-possession-access-only-safe-route",
        relatedTopicIds: ["civil-neighbor-access"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。许朔与周敏分别合法使用相邻宅地并居住。许朔住宅一侧临河，另一侧是无法安全通行的陡坡，现场勘查确认，连通公共道路只能经过周敏院边的一条旧道。许朔只要求沿旧道步行及搬运日常生活物品，不要求停车或堆货。周敏新装大门后将旧道完全锁住，理由是院地由自己使用，任何邻居都无权经过。双方没有另设通行合同或地役权。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。旧道是许朔住宅连接公共路唯一安全可行的出路，日常通行必须利用这段邻地。周敏应提供必要便利，许朔则应按日常通行需要使用，不能另作停车堆货。",
        sources: ["civil-neighbor-access291", "civil-neighbor-general288296"],
        id: "civil-neighbor-possession-access-only-safe-route-written",
        kind: "subjective",
        title: "通往公共路的院边旧道：写出分析",
        prompt:
          "周敏能否仅凭院地由自己使用，完全拒绝许朔沿旧道作上述日常通行？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-neighbor-access-necessity",
            label: "唯一可行出路应提供必要通行",
            meaning:
              "联系临河、陡坡及唯一安全旧道，认定日常通行必须借助邻地，周敏不能仅凭使用权完全阻断。",
            acceptable:
              "说明别处走不通，这条旧道是正常出门必经之路，邻居应让必要通行即可；接受等义表达。",
            boundary:
              "不要求设定通行费或转移土地权属；便利限题内日常需求，不扩成停车堆货权。",
          },
        ],
      },
      {
        caseId: "civil-neighbor-possession-access-shortcut-not-necessary",
        relatedTopicIds: ["civil-neighbor-access"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆音住宅自有出入口直接通向公共巷道，巷道平整、安全，步行和日常物品运输都能正常使用。沿巷道走到主路，比穿过邻居顾澄的院子多花约七分钟。陆音没有身体行动困难或运输障碍，只想从邻院抄近路；双方也无通行合同或其他约定。顾澄不愿为此在院墙另开门，陆音要求法院依据必要通行规则强制开路。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。陆音已有可正常使用的公共巷道，没有必须利用顾澄院地的事实。少走七分钟只是更便利，不能据此强制邻人另开通路。",
        sources: ["civil-neighbor-access291", "civil-neighbor-general288296"],
        id: "civil-neighbor-possession-access-shortcut-not-necessary-choice",
        kind: "objective",
        choiceMode: "single",
        title: "能少走七分钟的近路：选择判断",
        prompt: "陆音能否仅因穿邻院少走七分钟，按必要通行规则强制顾澄开路？",
        options: [
          {
            id: "a",
            text: "能，只要有更近路线，邻人就必须为其开门",
            explanation: "便利程度不等于第291条要求的必须利用。",
          },
          {
            id: "b",
            text: "能，因为所有院墙在相邻关系中都不得存在",
            explanation: "相邻关系没有普遍禁止院墙的规则。",
          },
          {
            id: "c",
            text: "不能，因为任何相邻通行都必须先买下土地",
            explanation:
              "必要通行依法可以成立，并不一律要求购买土地；本案问题是缺少必要性。",
          },
          {
            id: "d",
            text: "不能，已有正常可用路线，仅为抄近路不足以强制开路",
            explanation: "本案没有必须借助相邻院地才能通行的条件。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-neighbor-possession-access-shortcut-not-necessary",
        relatedTopicIds: ["civil-neighbor-access"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆音住宅自有出入口直接通向公共巷道，巷道平整、安全，步行和日常物品运输都能正常使用。沿巷道走到主路，比穿过邻居顾澄的院子多花约七分钟。陆音没有身体行动困难或运输障碍，只想从邻院抄近路；双方也无通行合同或其他约定。顾澄不愿为此在院墙另开门，陆音要求法院依据必要通行规则强制开路。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。陆音已有可正常使用的公共巷道，没有必须利用顾澄院地的事实。少走七分钟只是更便利，不能据此强制邻人另开通路。",
        sources: ["civil-neighbor-access291", "civil-neighbor-general288296"],
        id: "civil-neighbor-possession-access-shortcut-not-necessary-written",
        kind: "subjective",
        title: "能少走七分钟的近路：写出分析",
        prompt:
          "陆音能否仅因穿邻院少走七分钟，按必要通行规则强制顾澄开路？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-neighbor-access-convenience-only",
            label: "仅为省路不足以强制邻人开路",
            meaning:
              "联系现有公共巷道安全平整、日常使用无障碍，说明只是节省路程而非必须利用邻地，不能据291强制开门。",
            acceptable:
              "说明自己的路本来能正常走，只是嫌绕一点，不能因此强迫邻院开路即可；接受等义表达。",
            boundary:
              "七分钟只是案情差异，不是法律划定必要通行的统一时间标准；不讨论自愿订约或地役权价格。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-neighbor-construction",
    title: "施工与管线的必要利用",
    headline:
      "确实必须借邻地施工，应提供必要便利；使用范围、工期和做法仍要减损。",
    goal: "周岚能否一概拒绝这项进场方案？陈霁进场后应怎样使用该区域？",
    prerequisite: "能识别相邻双方的利用需求、可行替代办法与影响。",
    minutes: "6–10",
    paragraphs: [
      "建造、修缮建筑物或铺设管线必须利用相邻土地、建筑物时，相邻权利人应提供必要便利。先核对现场是否确有其他可行施工办法，不能只听施工方说这样省事。",
      "必要利用应限于工程需要，并尽量避免损害。能沿边缘短时施工，就不能为堆料方便扩大占用、毁掉院内设施；临时进场也不能自行变成长久堆场。",
    ],
    example: {
      title: "修外墙要借院边空地",
      facts:
        "本案为原创教学虚构，发生于2026年9月。陈霁的住宅西外墙渗漏，需要从墙外修缮。墙边紧接周岚依法使用的院地，施工勘查确认，受墙体和檐口结构限制，无法从陈霁自家一侧完成作业。方案只在邻院边缘空地搭架三天，事先铺保护板、保留周岚出入，完工即撤架清场。周岚没有指出其他施工障碍，只以“院地由我使用，别人永远不能进”为由拒绝。",
      analysis:
        "周岚不能一概拒绝，应提供这项必要的临时施工便利。外墙确实只能从邻地修，方案又限定在院边三天。陈霁应按范围和工期施工，做好防护、保留出入，完工撤场，不能擅自扩大占用。",
    },
    pitfall:
      "把必要施工等同于邻人可以一概拒绝，或反过来当成任意扩大占用的许可。",
    recall: {
      prompt: "周岚能否一概拒绝这项进场方案？陈霁进场后应怎样使用该区域？",
      reference:
        "确实必须借邻地施工，应提供必要便利；使用范围、工期和做法仍要减损。",
    },
    sources: ["civil-neighbor-construction292", "civil-neighbor-general288296"],
    exercises: [
      {
        caseId: "civil-neighbor-possession-construction-wall-repair-entry",
        relatedTopicIds: ["civil-neighbor-construction"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陈霁的住宅西外墙渗漏，需要从墙外修缮。墙边紧接周岚依法使用的院地，施工勘查确认，受墙体和檐口结构限制，无法从陈霁自家一侧完成作业。方案只在邻院边缘空地搭架三天，事先铺保护板、保留周岚出入，完工即撤架清场。周岚没有指出其他施工障碍，只以“院地由我使用，别人永远不能进”为由拒绝。",
        hint: "直接说明结论和案情理由。",
        reference:
          "周岚不能一概拒绝，应提供这项必要的临时施工便利。外墙确实只能从邻地修，方案又限定在院边三天。陈霁应按范围和工期施工，做好防护、保留出入，完工撤场，不能擅自扩大占用。",
        sources: [
          "civil-neighbor-construction292",
          "civil-neighbor-general288296",
        ],
        id: "civil-neighbor-possession-construction-wall-repair-entry-choice",
        kind: "objective",
        choiceMode: "single",
        title: "修外墙要借院边空地：选择判断",
        prompt: "周岚能否一概拒绝这项进场方案？陈霁进场后应怎样使用该区域？",
        options: [
          {
            id: "a",
            text: "不能一概拒绝；应给必要临时便利，施工方仍须限范围减损",
            explanation:
              "第292条规定必要便利，第296条要求利用邻地时尽量避免损害。",
          },
          {
            id: "b",
            text: "可以一概拒绝，因为房屋渗漏从来不涉及相邻便利",
            explanation: "修缮建筑物必须利用邻地正是第292条规定的情形。",
          },
          {
            id: "c",
            text: "不能拒绝，所以施工方可永久免费占用整个院子",
            explanation:
              "必要临时利用不产生无限期、无限范围或当然免费的占用权。",
          },
          {
            id: "d",
            text: "可以拒绝，只有新建房屋才有相邻施工便利，修缮一律没有",
            explanation: "第292条明确同时包括建造与修缮。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-neighbor-possession-construction-wall-repair-entry",
        relatedTopicIds: ["civil-neighbor-construction"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陈霁的住宅西外墙渗漏，需要从墙外修缮。墙边紧接周岚依法使用的院地，施工勘查确认，受墙体和檐口结构限制，无法从陈霁自家一侧完成作业。方案只在邻院边缘空地搭架三天，事先铺保护板、保留周岚出入，完工即撤架清场。周岚没有指出其他施工障碍，只以“院地由我使用，别人永远不能进”为由拒绝。",
        hint: "直接说明结论和案情理由。",
        reference:
          "周岚不能一概拒绝，应提供这项必要的临时施工便利。外墙确实只能从邻地修，方案又限定在院边三天。陈霁应按范围和工期施工，做好防护、保留出入，完工撤场，不能擅自扩大占用。",
        sources: [
          "civil-neighbor-construction292",
          "civil-neighbor-general288296",
        ],
        id: "civil-neighbor-possession-construction-wall-repair-entry-written",
        kind: "subjective",
        title: "修外墙要借院边空地：写出分析",
        prompt:
          "周岚能否一概拒绝这项进场方案？陈霁进场后应怎样使用该区域？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-neighbor-repair-necessary-entry",
            label: "确有必要的修缮进场应提供便利",
            meaning:
              "联系墙体檐口条件使作业不能从自家完成、方案仅用院边空地，认定周岚不能仅凭用地权一概拒绝。",
            acceptable:
              "说明修墙确实必须借邻院，邻人应提供这项必要临时便利即可；接受等义表达。",
            boundary:
              "不要求工程计算或处理土地权属；不授予施工方强行进入的自力执行权。",
          },
          {
            id: "civil-neighbor-repair-limited-use",
            label: "限期限范围并采取减损措施",
            meaning:
              "说明施工方应按院边三天方案防护、保留出入，完工撤架清场，不得擅自扩大为长期占用。",
            acceptable:
              "说明只能用修墙需要的地方和时间，要保护地面、不堵人出门，干完撤走即可。",
            boundary:
              "三天是本案工期，不是统一法定期限；不据此判定所有利用一律免费或设固定补偿额。",
          },
        ],
      },
      {
        caseId: "civil-neighbor-possession-construction-pipe-least-impact",
        relatedTopicIds: ["civil-neighbor-construction"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。司桥需要更换一段老化供水管，管线原本依法敷设在邻居陆芩院边地下，原有敷设权和施工进场需要均无争议。勘查有两种同样安全可行的安排：沿院边原槽铺垫防护，一天完成；或为方便堆料占用整个院子两周，并铲除中央花坛。前一种不会增加不合理成本。陆芩愿配合院边一天的方案，司桥却坚持修管需要邻地，就可以自行选择整院堆料方案。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。必须借邻地修管，不等于可以任意扩大占用。沿院边原槽一天即可安全完成，又能保住花坛，应按这个减损方案利用邻地，不能只为堆料方便占满院子两周。",
        sources: [
          "civil-neighbor-construction292",
          "civil-neighbor-general288296",
        ],
        id: "civil-neighbor-possession-construction-pipe-least-impact-choice",
        kind: "objective",
        choiceMode: "single",
        title: "换水管不必占满院子：选择判断",
        prompt: "司桥能否凭需要更换管线，强求整院两周堆料并铲掉花坛？",
        options: [
          {
            id: "a",
            text: "能；一旦涉及管线，邻院所有设施都必须无条件让位",
            explanation: "法条没有赋予任意毁损或扩大利用的权利。",
          },
          {
            id: "b",
            text: "能；只要施工方觉得省事，就等于法律上的必须利用",
            explanation: "主观省事不能替代具体必要性和可行减损办法。",
          },
          {
            id: "c",
            text: "不能；应采用可行的院边短时减损方案，不能借必要修管任意扩占",
            explanation: "必要便利仍受工程所需范围和第296条避免损害要求约束。",
          },
          {
            id: "d",
            text: "不能，因此陆芩可连已经确认必要的院边进场也一并阻断",
            explanation:
              "陆芩可拒绝过度方案，不等于取消必要合理进场的便利义务。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-neighbor-possession-construction-pipe-least-impact",
        relatedTopicIds: ["civil-neighbor-construction"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。司桥需要更换一段老化供水管，管线原本依法敷设在邻居陆芩院边地下，原有敷设权和施工进场需要均无争议。勘查有两种同样安全可行的安排：沿院边原槽铺垫防护，一天完成；或为方便堆料占用整个院子两周，并铲除中央花坛。前一种不会增加不合理成本。陆芩愿配合院边一天的方案，司桥却坚持修管需要邻地，就可以自行选择整院堆料方案。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。必须借邻地修管，不等于可以任意扩大占用。沿院边原槽一天即可安全完成，又能保住花坛，应按这个减损方案利用邻地，不能只为堆料方便占满院子两周。",
        sources: [
          "civil-neighbor-construction292",
          "civil-neighbor-general288296",
        ],
        id: "civil-neighbor-possession-construction-pipe-least-impact-written",
        kind: "subjective",
        title: "换水管不必占满院子：写出分析",
        prompt:
          "司桥能否凭需要更换管线，强求整院两周堆料并铲掉花坛？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-neighbor-pipe-limited-necessary-use",
            label: "必要修管不能扩大为无必要的损害占用",
            meaning:
              "联系院边原槽一天同样安全可行、成本合理且可保花坛，说明应选择减损方案，不能强求整院两周及铲花坛。",
            acceptable:
              "说明确实要借地修管，也只能按够用且少损害的办法做；一天沿边能做，就不能为堆料占全院两周毁花坛即可；接受等义表达。",
            boundary:
              "管线原有敷设权与进场需要不考；不创设永久管线权、固定费用或不限时间的占用。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-neighbor-light-safety",
    title: "通风采光与安全",
    headline:
      "建在自用地内也不能违反标准妨碍邻屋；已有证据表明施工危险时，可先请求消除危险。",
    goal: "卫明能否仅凭没有越界，拒绝排除已查明的通风采光日照妨碍？",
    prerequisite: "能识别相邻双方的利用需求、可行替代办法与影响。",
    minutes: "6–10",
    paragraphs: [
      "建造建筑物不得违反国家有关工程建设标准，不得妨碍相邻建筑物的通风、采光和日照。是否越过边界并不是唯一判断，技术影响应结合适用标准和可靠证据。",
      "开挖、建房、铺管、装设备都不得危及相邻不动产安全。物权已受妨害或有受妨害危险，可以请求排除妨害、消除危险，不必等到房屋倒塌。",
    ],
    example: {
      title: "没越界的新储物间",
      facts:
        "本案为原创教学虚构，发生于2026年9月。卫明在自己依法使用的院地上加建封闭储物间，没有越过地界。相邻陶若原有合法住宅的通风、采光、日照指标原本符合适用的国家工程建设标准。检测报告和现场记录确认，加建后这些指标已不符合相应要求，变化由储物间遮挡造成；报告真实性与技术结论无争议。陶若要求消除这项妨碍，卫明只说建筑全部在自己地界内，无需调整。",
      analysis:
        "不能。建在自用地界内也要遵守相邻保护规则。报告已确认加建部分使邻屋通风、采光、日照不符合适用国家标准，卫明应排除这项妨碍，不能只用没有越界拒绝。",
    },
    pitfall: "只看是否在自己边界内，或认为没有实际倒塌就永远不能请求消除危险。",
    recall: {
      prompt: "卫明能否仅凭没有越界，拒绝排除已查明的通风采光日照妨碍？",
      reference:
        "建在自用地内也不能违反标准妨碍邻屋；已有证据表明施工危险时，可先请求消除危险。",
    },
    sources: [
      "civil-neighbor-light293",
      "civil-neighbor-remedy236",
      "civil-neighbor-general288296",
      "civil-neighbor-safety295",
    ],
    exercises: [
      {
        caseId: "civil-neighbor-possession-light-own-boundary-not-exemption",
        relatedTopicIds: ["civil-neighbor-light-safety"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。卫明在自己依法使用的院地上加建封闭储物间，没有越过地界。相邻陶若原有合法住宅的通风、采光、日照指标原本符合适用的国家工程建设标准。检测报告和现场记录确认，加建后这些指标已不符合相应要求，变化由储物间遮挡造成；报告真实性与技术结论无争议。陶若要求消除这项妨碍，卫明只说建筑全部在自己地界内，无需调整。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。建在自用地界内也要遵守相邻保护规则。报告已确认加建部分使邻屋通风、采光、日照不符合适用国家标准，卫明应排除这项妨碍，不能只用没有越界拒绝。",
        sources: [
          "civil-neighbor-light293",
          "civil-neighbor-remedy236",
          "civil-neighbor-general288296",
        ],
        id: "civil-neighbor-possession-light-own-boundary-not-exemption-choice",
        kind: "objective",
        choiceMode: "single",
        title: "没越界的新储物间：选择判断",
        prompt: "卫明能否仅凭没有越界，拒绝排除已查明的通风采光日照妨碍？",
        options: [
          {
            id: "a",
            text: "能；只要建筑未越界，相邻通风采光永远不受保护",
            explanation: "第293条约束建造对邻屋的影响，不仅处理越界。",
          },
          {
            id: "b",
            text: "不能；应依法排除有技术证据支持的相邻妨碍",
            explanation: "适用第293条与第236条，且本案标准和因果事实已明确。",
          },
          {
            id: "c",
            text: "不能；法律对全国所有住宅都统一规定同一间距和日照小时",
            explanation:
              "本题没有、也不能凭空设定跨建筑地区类型一律相同的技术数字。",
          },
          {
            id: "d",
            text: "能；检测已经查明不符合标准，也只能等邻屋先坍塌",
            explanation: "采光妨害无需等到房屋坍塌才可请求排除。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-neighbor-possession-light-own-boundary-not-exemption",
        relatedTopicIds: ["civil-neighbor-light-safety"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。卫明在自己依法使用的院地上加建封闭储物间，没有越过地界。相邻陶若原有合法住宅的通风、采光、日照指标原本符合适用的国家工程建设标准。检测报告和现场记录确认，加建后这些指标已不符合相应要求，变化由储物间遮挡造成；报告真实性与技术结论无争议。陶若要求消除这项妨碍，卫明只说建筑全部在自己地界内，无需调整。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。建在自用地界内也要遵守相邻保护规则。报告已确认加建部分使邻屋通风、采光、日照不符合适用国家标准，卫明应排除这项妨碍，不能只用没有越界拒绝。",
        sources: [
          "civil-neighbor-light293",
          "civil-neighbor-remedy236",
          "civil-neighbor-general288296",
        ],
        id: "civil-neighbor-possession-light-own-boundary-not-exemption-written",
        kind: "subjective",
        title: "没越界的新储物间：写出分析",
        prompt:
          "卫明能否仅凭没有越界，拒绝排除已查明的通风采光日照妨碍？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-neighbor-light-no-boundary-defense",
            label: "未越界仍须排除已证实的相邻妨碍",
            meaning:
              "联系原合法住宅指标符合标准、加建造成不符合要求且检测无争议，说明卫明不能仅以未越界拒绝，应排除本项妨碍。",
            acceptable:
              "说明自己的地里建也不能这样挡住邻屋，标准不达标且原因已查清，就应处理遮挡妨碍即可；接受等义表达。",
            boundary:
              "技术标准及因果作为已核实前提，不要求背米数时数、指定整栋拆除或计算赔偿。",
          },
        ],
      },
      {
        caseId: "civil-neighbor-possession-safety-excavation-before-collapse",
        relatedTopicIds: ["civil-neighbor-light-safety"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。梁序在自己依法使用的院地挖土扩建，挖掘点紧靠相邻丁禾住宅地基，尚未设置支护。监测已发现基底土体移动，检测报告确认，继续开挖会使丁禾房屋基础失稳；该技术结论无争议。监理提出，暂停这段开挖并先做支护即可消除当前危险。房屋尚未倒塌，梁序因此拒绝调整，称丁禾只能发生实际倒塌后再来主张。",
        hint: "直接说明结论和案情理由。",
        reference:
          "可以现在请求，不必等倒塌。报告已证明当前开挖危及邻屋基础，梁序应停止这段危险作业并先采取支护。相邻施工不得危及安全，权利人也可在损害发生前请求消除危险。",
        sources: ["civil-neighbor-safety295", "civil-neighbor-remedy236"],
        id: "civil-neighbor-possession-safety-excavation-before-collapse-choice",
        kind: "objective",
        choiceMode: "single",
        title: "还没倒塌的邻屋：选择判断",
        prompt:
          "丁禾能否现在请求停止这段危险开挖并先做支护？是否必须等房屋倒塌？",
        options: [
          {
            id: "a",
            text: "不能，消除危险请求一律要求先发生倒塌损失",
            explanation:
              "第236条保护已经受妨害或可能受妨害的物权，不以先倒塌为前提。",
          },
          {
            id: "b",
            text: "不能，因为在自用院地开挖就完全不受相邻安全限制",
            explanation: "第295条明确开挖土地等行为不得危及相邻不动产安全。",
          },
          {
            id: "c",
            text: "可以，并且因此可不问其他情况永久停止梁序所有项目",
            explanation:
              "本题只要求消除这一有证据支持的危险，不能无限扩大范围。",
          },
          {
            id: "d",
            text: "可以请求停止这段危险开挖并先支护，无须等待倒塌",
            explanation:
              "报告和可行支护措施均明确，符合相邻安全与消除危险规则。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-neighbor-possession-safety-excavation-before-collapse",
        relatedTopicIds: ["civil-neighbor-light-safety"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。梁序在自己依法使用的院地挖土扩建，挖掘点紧靠相邻丁禾住宅地基，尚未设置支护。监测已发现基底土体移动，检测报告确认，继续开挖会使丁禾房屋基础失稳；该技术结论无争议。监理提出，暂停这段开挖并先做支护即可消除当前危险。房屋尚未倒塌，梁序因此拒绝调整，称丁禾只能发生实际倒塌后再来主张。",
        hint: "直接说明结论和案情理由。",
        reference:
          "可以现在请求，不必等倒塌。报告已证明当前开挖危及邻屋基础，梁序应停止这段危险作业并先采取支护。相邻施工不得危及安全，权利人也可在损害发生前请求消除危险。",
        sources: ["civil-neighbor-safety295", "civil-neighbor-remedy236"],
        id: "civil-neighbor-possession-safety-excavation-before-collapse-written",
        kind: "subjective",
        title: "还没倒塌的邻屋：写出分析",
        prompt:
          "丁禾能否现在请求停止这段危险开挖并先做支护？是否必须等房屋倒塌？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-neighbor-safety-danger-established",
            label: "有证据证明危及邻屋应消除危险",
            meaning:
              "结合基底土体移动和失稳报告，说明该段开挖已危及相邻安全，应停止危险作业并先采取可行支护。",
            acceptable:
              "说明检测已看出会把邻屋地基挖得不稳，应先停这段、把支护做好即可；接受等义表达。",
            boundary: "不要求另算工程参数、证明主观故意或永久停止所有建设。",
          },
          {
            id: "civil-neighbor-safety-no-collapse-required",
            label: "不用等实际倒塌才请求",
            meaning:
              "明确丁禾可现在请求消除危险，无须先有房屋倒塌或已量化财产损失。",
            acceptable: "说明可以在危险阶段要求处理，不能等房倒了才管即可。",
            boundary:
              "不把纯粹猜测也当成已证危险；本题已有无争议技术报告，不讨论强行自力停工或赔偿数额。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-possession-contract",
    title: "合同占有与返还期限",
    headline: "占有不等于所有。能否继续使用，要看有效约定和归还期限。",
    goal: "许岚能否仅凭自己是所有人，要求周宁跳过约定提前交回？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "借用、租赁等合同可以让非所有人合法占有并使用物品。约定仍有效、使用期限未满时，不能仅因物品归自己所有，就跳过合同要求对方提前交回。",
      "租期届满应返还；承租人继续使用、出租人没有异议时，可能转为不定期租赁。出租人已明确反对继续使用、也没有其他占有依据的，承租人不能只凭以前付过租金一直占着。",
    ],
    example: {
      title: "约定借用期还没结束",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。2026年9月，许岚把投影仪交给周宁，双方签字约定无偿借用至10月31日，仅用于室内教学，到期归还。10月10日，周宁一直按约使用、妥善保管，也没有其他提前返还事由。许岚没有提出任何解除或违约理由，只说“投影仪是我的，你不是物主”，要求当天交回，周宁希望按约用到10月31日。",
      analysis:
        "不能只凭所有权要求提前交回。周宁是依据有效借用约定占有投影仪，使用期还没结束，也没有其他提前返还事由。他虽不是物主，仍可按约使用到10月31日，并在到期时归还。",
    },
    pitfall: "一见物主要求就忽略未到期的合同，或把过去付过租金当成永久使用权。",
    recall: {
      prompt: "许岚能否仅凭自己是所有人，要求周宁跳过约定提前交回？",
      reference: "占有不等于所有。能否继续使用，要看有效约定和归还期限。",
    },
    sources: ["civil-possession-contract458", "civil-possession-lease733"],
    exercises: [
      {
        caseId: "civil-neighbor-possession-possession-borrowed-projector-term",
        relatedTopicIds: ["civil-possession-contract"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，许岚把投影仪交给周宁，双方签字约定无偿借用至10月31日，仅用于室内教学，到期归还。10月10日，周宁一直按约使用、妥善保管，也没有其他提前返还事由。许岚没有提出任何解除或违约理由，只说“投影仪是我的，你不是物主”，要求当天交回，周宁希望按约用到10月31日。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能只凭所有权要求提前交回。周宁是依据有效借用约定占有投影仪，使用期还没结束，也没有其他提前返还事由。他虽不是物主，仍可按约使用到10月31日，并在到期时归还。",
        sources: ["civil-possession-contract458"],
        id: "civil-neighbor-possession-possession-borrowed-projector-term-choice",
        kind: "objective",
        choiceMode: "single",
        title: "约定借用期还没结束：选择判断",
        prompt: "许岚能否仅凭自己是所有人，要求周宁跳过约定提前交回？",
        options: [
          {
            id: "a",
            text: "不能仅凭所有权提前收回；周宁在有效借用期内可按约使用",
            explanation: "第458条要求按合同处理使用和返还问题。",
          },
          {
            id: "b",
            text: "可以，非所有人即使有未到期的有效合同也绝不可能占有",
            explanation: "合同可以提供占有和使用的依据。",
          },
          {
            id: "c",
            text: "不能，所以投影仪所有权已转给周宁",
            explanation: "借用只提供合同使用依据，不转移所有权。",
          },
          {
            id: "d",
            text: "可以，因为任何借用合同都可被物主一句话自动取消",
            explanation: "本案没有约定或法定的提前收回事由。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-neighbor-possession-possession-borrowed-projector-term",
        relatedTopicIds: ["civil-possession-contract"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，许岚把投影仪交给周宁，双方签字约定无偿借用至10月31日，仅用于室内教学，到期归还。10月10日，周宁一直按约使用、妥善保管，也没有其他提前返还事由。许岚没有提出任何解除或违约理由，只说“投影仪是我的，你不是物主”，要求当天交回，周宁希望按约用到10月31日。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能只凭所有权要求提前交回。周宁是依据有效借用约定占有投影仪，使用期还没结束，也没有其他提前返还事由。他虽不是物主，仍可按约使用到10月31日，并在到期时归还。",
        sources: ["civil-possession-contract458"],
        id: "civil-neighbor-possession-possession-borrowed-projector-term-written",
        kind: "subjective",
        title: "约定借用期还没结束：写出分析",
        prompt:
          "许岚能否仅凭自己是所有人，要求周宁跳过约定提前交回？请结合案情说明理由。",
        criteria: [
          {
            id: "possession-borrowed-valid-term",
            label: "有效借用期内可依约占有",
            meaning:
              "联系借用约定有效、10月31日才到期且无其他提前返还事由，说明不能仅凭所有权要求当天交回。",
            acceptable:
              "说东西虽是许岚的，但答应借到月底、周宁也没违约，就应按约用到期再还即可。",
            boundary: "不要求列举全部解除事由，也不把暂时占有说成取得所有权。",
          },
        ],
      },
      {
        caseId: "civil-neighbor-possession-possession-lease-end-objection",
        relatedTopicIds: ["civil-possession-contract"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许岚把独立仓房租给周宁存放画框，书面租期至2026年9月30日，租金已按约付清。9月20日，许岚书面告知到期收回，不再续租；10月1日又明确要求周宁腾退。周宁收到两次通知，仍使用仓房，没有续租、留置或其他继续占有依据，只说“以前的租金都付了，我就能一直用”。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "周宁应返还仓房，过去的租金只对应原租期，不能换成永久使用权。租期已满，许岚又明确反对继续使用，本案没有形成出租人无异议的不定期续租。",
        sources: ["civil-possession-contract458", "civil-possession-lease733"],
        id: "civil-neighbor-possession-possession-lease-end-objection-choice",
        kind: "objective",
        choiceMode: "single",
        title: "租期结束，房东明确不续租：选择判断",
        prompt:
          "周宁能否仅凭以前已经付清租金继续占用？这里是否形成了到期后无异议的续租？",
        options: [
          {
            id: "a",
            text: "能，只要曾付清一期租金就可一直使用",
            explanation: "已付租金不能代替新的占有依据。",
          },
          {
            id: "b",
            text: "应返还，但因为原租赁合同从来没有效过",
            explanation: "原租期有效，争议在期限结束后能否继续。",
          },
          {
            id: "c",
            text: "应返还；租期已满且房东明确反对继续使用，没有无异议续租",
            explanation: "符合第733条，且不具备第734条的无异议条件。",
          },
          {
            id: "d",
            text: "能，房东明确催还也必然形成无异议续租",
            explanation: "将明确异议说成没有异议，与事实相反。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-neighbor-possession-possession-lease-end-objection",
        relatedTopicIds: ["civil-possession-contract"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许岚把独立仓房租给周宁存放画框，书面租期至2026年9月30日，租金已按约付清。9月20日，许岚书面告知到期收回，不再续租；10月1日又明确要求周宁腾退。周宁收到两次通知，仍使用仓房，没有续租、留置或其他继续占有依据，只说“以前的租金都付了，我就能一直用”。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "周宁应返还仓房，过去的租金只对应原租期，不能换成永久使用权。租期已满，许岚又明确反对继续使用，本案没有形成出租人无异议的不定期续租。",
        sources: ["civil-possession-contract458", "civil-possession-lease733"],
        id: "civil-neighbor-possession-possession-lease-end-objection-written",
        kind: "subjective",
        title: "租期结束，房东明确不续租：写出分析",
        prompt:
          "周宁能否仅凭以前已经付清租金继续占用？这里是否形成了到期后无异议的续租？请结合案情说明理由。",
        criteria: [
          {
            id: "possession-lease-end-return",
            label: "到期且无续租依据应返还",
            meaning:
              "联系租期已满、出租人明确异议，说明应返还，已付旧租金不能支持一直占用，也不成立无异议续租。",
            acceptable:
              "说房东到期前后都明确不让继续用，不能靠过去租金把仓房一直占着即可。",
            boundary:
              "不把所有租期届满继续使用都一律排除续租，仅按本案明确异议判断。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-possession-return-cost",
    title: "原物、孳息与养护费用",
    headline:
      "无权继续占有就应返还原物和孳息；善意期间的必要养护费，应由权利人支付。",
    goal: "周宁能否以照料过为由留下6个柠檬？应交还哪些东西？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "善意收到不属于自己的物品，不等于已经取得所有权。确认没有继续占有依据后，原物和应返还的孳息都应交给权利人；给物品浇水养护，不会自动把物品或果实变成自己的。",
      "善意占有人为维护物品支出的必要费用，权利人应当支付。要分清保住物品所必需的开支和自己喜欢而加的装饰，不能把所有花费都称为必要费用。",
    ],
    example: {
      title: "错送的柠檬树结了果",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。2026年8月，苗圃仓库把许岚寄存的一盆柠檬树误送到周宁家；外包装贴着周宁的同款订单，周宁按订单照片收货并正常浇水，以为是自己买的那盆。9月仓库查清错送，双方也确认这盆树一直归许岚，周宁没有继续占有依据。树仍完好，新结的6个柠檬也尚在。周宁说自己照料过，所以可以只还树、把这6个柠檬留下；必要养护费用双方另行结清，本题不再计算。",
      analysis:
        "应把柠檬树和6个柠檬一并交还。树属于许岚，所结的果实是其孳息，周宁没有继续占有的依据。收货时不知错送、后来有过照料，都不使他当然取得这盆树或果实。",
    },
    pitfall: "把好好照料误当成取得所有权，或把纯装饰也算进必要养护费。",
    recall: {
      prompt: "周宁能否以照料过为由留下6个柠檬？应交还哪些东西？",
      reference:
        "无权继续占有就应返还原物和孳息；善意期间的必要养护费，应由权利人支付。",
    },
    sources: ["civil-possession-return460"],
    exercises: [
      {
        caseId: "civil-neighbor-possession-possession-return-lemon-fruits",
        relatedTopicIds: ["civil-possession-return-cost"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年8月，苗圃仓库把许岚寄存的一盆柠檬树误送到周宁家；外包装贴着周宁的同款订单，周宁按订单照片收货并正常浇水，以为是自己买的那盆。9月仓库查清错送，双方也确认这盆树一直归许岚，周宁没有继续占有依据。树仍完好，新结的6个柠檬也尚在。周宁说自己照料过，所以可以只还树、把这6个柠檬留下；必要养护费用双方另行结清，本题不再计算。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "应把柠檬树和6个柠檬一并交还。树属于许岚，所结的果实是其孳息，周宁没有继续占有的依据。收货时不知错送、后来有过照料，都不使他当然取得这盆树或果实。",
        sources: ["civil-possession-return460"],
        id: "civil-neighbor-possession-possession-return-lemon-fruits-choice",
        kind: "objective",
        choiceMode: "single",
        title: "错送的柠檬树结了果：选择判断",
        prompt: "周宁能否以照料过为由留下6个柠檬？应交还哪些东西？",
        options: [
          {
            id: "a",
            text: "可以留下全部果实，任何照料都自动转移果实所有权",
            explanation: "维护物品与取得孳息所有权不是一回事。",
          },
          {
            id: "b",
            text: "应交还树和6个柠檬；善意收货和照料不当然让果实归自己",
            explanation: "第460条规定返还原物及孳息，费用另行处理。",
          },
          {
            id: "c",
            text: "可以留下树，只须归还6个柠檬",
            explanation: "原物也应返还。",
          },
          {
            id: "d",
            text: "可以树和果实都留下，因为包装写错姓名会永久转移所有权",
            explanation: "本案已明确没有所有权转移和继续占有依据。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-neighbor-possession-possession-return-lemon-fruits",
        relatedTopicIds: ["civil-possession-return-cost"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年8月，苗圃仓库把许岚寄存的一盆柠檬树误送到周宁家；外包装贴着周宁的同款订单，周宁按订单照片收货并正常浇水，以为是自己买的那盆。9月仓库查清错送，双方也确认这盆树一直归许岚，周宁没有继续占有依据。树仍完好，新结的6个柠檬也尚在。周宁说自己照料过，所以可以只还树、把这6个柠檬留下；必要养护费用双方另行结清，本题不再计算。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "应把柠檬树和6个柠檬一并交还。树属于许岚，所结的果实是其孳息，周宁没有继续占有的依据。收货时不知错送、后来有过照料，都不使他当然取得这盆树或果实。",
        sources: ["civil-possession-return460"],
        id: "civil-neighbor-possession-possession-return-lemon-fruits-written",
        kind: "subjective",
        title: "错送的柠檬树结了果：写出分析",
        prompt:
          "周宁能否以照料过为由留下6个柠檬？应交还哪些东西？请结合案情说明理由。",
        criteria: [
          {
            id: "possession-return-original-fruits",
            label: "原物和果实一并返还",
            meaning:
              "说明应返还树及6个柠檬，果实属于原物孳息，善意收货和养护不提供留下果实的依据。",
            acceptable:
              "说树和结的果子都应还给物主，照料过可以另算必要费用，不能就把果子留下即可。",
            boundary:
              "本案果实仍在，不要求讨论已经消费的孳息、善意取得或未给出的租赁收益约定。",
          },
        ],
      },
      {
        caseId:
          "civil-neighbor-possession-possession-care-necessary-decoration",
        relatedTopicIds: ["civil-possession-return-cost"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年8月，仓库错送一盆许岚所有的柠檬树给周宁，包装和订单照片使周宁以为收到的是自己的树，收货与养护时均无错送线索。发现树遭病虫害后，他依园艺人员建议支付100元药费，票据及当时照片证实这是保住树所需的开支。他又只为好看加买80元彩绘外盆套，外盆套对树的保存、生长没有作用。9月错送查清，双方确认树归许岚、周宁应交还，且无另行装饰委托。周宁要求许岚把180元都按必要养护费支付。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "许岚应支付100元必要药费，80元装饰套不属于这项必要费用。周宁不知道也不应知道错送时，为保住树花的药费受保护；外盆套只为装饰，对维护树没有必要，不能一并要求按必要养护费报销。",
        sources: ["civil-possession-return460"],
        id: "civil-neighbor-possession-possession-care-necessary-decoration-choice",
        kind: "objective",
        choiceMode: "single",
        title: "救树的药费和装饰套：选择判断",
        prompt: "许岚应支付哪笔必要养护费？80元装饰套也属于这项费用吗？",
        options: [
          {
            id: "a",
            text: "两笔都不付，因为树不是周宁的，他就不能有任何养护费用请求",
            explanation: "第460条保护善意占有人的必要维护费用。",
          },
          {
            id: "b",
            text: "两笔都必须付，善意占有人喜欢买什么都算必要费用",
            explanation: "善意不等于每笔支出都必要。",
          },
          {
            id: "c",
            text: "只付80元装饰费，100元救树药费必须自负",
            explanation: "把必要养护与装饰支出倒置。",
          },
          {
            id: "d",
            text: "支付100元必要药费，80元纯装饰费不按必要养护费用支付",
            explanation: "分别核对善意期间、维护目的和必要性。",
          },
        ],
        answer: "d",
      },
      {
        caseId:
          "civil-neighbor-possession-possession-care-necessary-decoration",
        relatedTopicIds: ["civil-possession-return-cost"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年8月，仓库错送一盆许岚所有的柠檬树给周宁，包装和订单照片使周宁以为收到的是自己的树，收货与养护时均无错送线索。发现树遭病虫害后，他依园艺人员建议支付100元药费，票据及当时照片证实这是保住树所需的开支。他又只为好看加买80元彩绘外盆套，外盆套对树的保存、生长没有作用。9月错送查清，双方确认树归许岚、周宁应交还，且无另行装饰委托。周宁要求许岚把180元都按必要养护费支付。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "许岚应支付100元必要药费，80元装饰套不属于这项必要费用。周宁不知道也不应知道错送时，为保住树花的药费受保护；外盆套只为装饰，对维护树没有必要，不能一并要求按必要养护费报销。",
        sources: ["civil-possession-return460"],
        id: "civil-neighbor-possession-possession-care-necessary-decoration-written",
        kind: "subjective",
        title: "救树的药费和装饰套：写出分析",
        prompt:
          "许岚应支付哪笔必要养护费？80元装饰套也属于这项费用吗？请结合案情说明理由。",
        criteria: [
          {
            id: "possession-care-necessary-cost",
            label: "善意期间的必要药费应支付",
            meaning:
              "联系收货养护时无错送线索，100元用于保住树且有必要，说明许岚应支付。",
            acceptable:
              "说他当时有理由以为树是自己的，为救树必须花的100元应还给他即可。",
            boundary: "不要求复述照片、票据全部细节，不要求固定术语。",
          },
          {
            id: "possession-decoration-not-necessary",
            label: "纯装饰不能当必要养护费",
            meaning:
              "联系外盆套只为好看且对维护无用，说明80元不在本题必要费用范围。",
            acceptable:
              "说另外80元只是装饰，不能跟救树药费一起按必要费用报销即可。",
            boundary:
              "只考必要费用请求，不要求进一步计算装饰可拆除或物主另行同意受让的价款。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-possession-loss",
    title: "使用损害与毁损保险金",
    headline:
      "明知无权还使用并损坏，应赔偿；物品毁损后取得的保险金也应交给权利人。",
    goal: "周宁能否以没有故意毁坏为由免赔这1200元？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "占有人已知道自己无权占有，还继续使用并使物品受损，应依法赔偿。判断要落到知情时间、使用行为和损害之间的联系，不用日常所说的好心或坏心替代法律条件。",
      "物品毁损、灭失后，占有人因此取得的保险金、赔偿金等，应返还权利人。收货时善意，也不是留下这笔替代物品价值款项的理由；恶意占有造成弥补不足的，还可能承担不足部分。",
    ],
    example: {
      title: "确认错送后仍超负荷使用",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。2026年9月，物流把许岚的切割机错送给周宁。许岚当天出示购买和寄运凭证要求取回，周宁核对机身号码后回复“确实不是我的，明天交还”。他当晚仍为赶自己的活，违反清楚标注的负荷上限持续使用，烧坏电机。检测确认损坏由这次超负荷使用造成，合理修理费1200元，无其他损坏原因。周宁称自己只是使用，没有故意毁坏，不应赔。",
      analysis:
        "不能免赔。周宁已经确认切割机不属于自己、应当交回，却仍超负荷使用并直接造成电机损坏，应承担这1200元修理损失。这里不要求他还有故意把机器毁掉的目的。",
    },
    pitfall:
      "以没有故意破坏为由免去明知无权使用造成的损失，或以善意为由留下毁损保险金。",
    recall: {
      prompt: "周宁能否以没有故意毁坏为由免赔这1200元？",
      reference:
        "明知无权还使用并损坏，应赔偿；物品毁损后取得的保险金也应交给权利人。",
    },
    sources: ["civil-possession-damage459", "civil-possession-indemnity461"],
    exercises: [
      {
        caseId: "civil-neighbor-possession-possession-knowing-use-damage",
        relatedTopicIds: ["civil-possession-loss"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，物流把许岚的切割机错送给周宁。许岚当天出示购买和寄运凭证要求取回，周宁核对机身号码后回复“确实不是我的，明天交还”。他当晚仍为赶自己的活，违反清楚标注的负荷上限持续使用，烧坏电机。检测确认损坏由这次超负荷使用造成，合理修理费1200元，无其他损坏原因。周宁称自己只是使用，没有故意毁坏，不应赔。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能免赔。周宁已经确认切割机不属于自己、应当交回，却仍超负荷使用并直接造成电机损坏，应承担这1200元修理损失。这里不要求他还有故意把机器毁掉的目的。",
        sources: ["civil-possession-damage459"],
        id: "civil-neighbor-possession-possession-knowing-use-damage-choice",
        kind: "objective",
        choiceMode: "single",
        title: "确认错送后仍超负荷使用：选择判断",
        prompt: "周宁能否以没有故意毁坏为由免赔这1200元？",
        options: [
          {
            id: "a",
            text: "不能；他明知无权仍使用，并因此造成确定修理损失，应赔1200元",
            explanation: "符合第459条的恶意占有、使用致损。",
          },
          {
            id: "b",
            text: "能，只要不是专为破坏而使用，就绝不用赔",
            explanation: "赔偿不以故意毁坏为唯一条件。",
          },
          {
            id: "c",
            text: "能，承诺明天归还就相当于物主已同意今晚任意使用",
            explanation: "承诺归还不是取得使用授权。",
          },
          {
            id: "d",
            text: "不能，所以即使损坏与使用无关，也一律按机器全新价双倍赔偿",
            explanation:
              "本案按已证明的使用致损和实际修理损失处理，不能任意扩张。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-neighbor-possession-possession-knowing-use-damage",
        relatedTopicIds: ["civil-possession-loss"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，物流把许岚的切割机错送给周宁。许岚当天出示购买和寄运凭证要求取回，周宁核对机身号码后回复“确实不是我的，明天交还”。他当晚仍为赶自己的活，违反清楚标注的负荷上限持续使用，烧坏电机。检测确认损坏由这次超负荷使用造成，合理修理费1200元，无其他损坏原因。周宁称自己只是使用，没有故意毁坏，不应赔。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能免赔。周宁已经确认切割机不属于自己、应当交回，却仍超负荷使用并直接造成电机损坏，应承担这1200元修理损失。这里不要求他还有故意把机器毁掉的目的。",
        sources: ["civil-possession-damage459"],
        id: "civil-neighbor-possession-possession-knowing-use-damage-written",
        kind: "subjective",
        title: "确认错送后仍超负荷使用：写出分析",
        prompt: "周宁能否以没有故意毁坏为由免赔这1200元？请结合案情说明理由。",
        criteria: [
          {
            id: "possession-knowing-damage-liability",
            label: "明知无权使用致损应赔偿",
            meaning:
              "联系已核对承认无权占有，仍超负荷使用致损，说明应赔1200元，不以专门故意破坏为必要。",
            acceptable:
              "说已经知道机器不是自己的，还拿去超负荷干活烧坏了，就要赔修理费，不是非得故意砸坏才赔即可。",
            boundary:
              "不要求推定惩罚性赔偿、计算未给出的其他损失，也不把一切正常损耗都算赔偿。",
          },
        ],
      },
      {
        caseId: "civil-neighbor-possession-possession-good-faith-insurance",
        relatedTopicIds: ["civil-possession-loss"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年8月，仓库将许岚的相机错送给周宁，订单标签与周宁购买的同型号相机一致，周宁一直没有发现错送线索。9月保管处遭雷击，相机被烧毁，周宁无保管、使用过错。他依已经生效的理赔结论实际收到与这台相机毁损对应的6000元保险金。随后错送查清，双方确认许岚一直是物主，许岚要求交付这6000元。周宁称自己收货时并不知情，所以保险金可以自己留下。本题不争议保险合同和理赔资格，只问这笔已收到的保险金归还。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能，应把6000元保险金交给许岚。这笔钱是因许岚的相机毁损而取得的，依法应返还给权利人；周宁收货时不知道错送，也不能把替代相机价值的款项留作自己的钱。",
        sources: ["civil-possession-indemnity461"],
        id: "civil-neighbor-possession-possession-good-faith-insurance-choice",
        kind: "objective",
        choiceMode: "single",
        title: "相机烧毁后收到保险金：选择判断",
        prompt: "周宁能否仅以收货时不知道错送为由，留下这6000元保险金？",
        options: [
          {
            id: "a",
            text: "能，善意收货意味着原物毁损后取得的款项都归收件人",
            explanation: "善意不排除第461条的保险金返还。",
          },
          {
            id: "b",
            text: "不能，因为任何保险金都必须交给国家而不是物主",
            explanation: "第461条要求返还权利人。",
          },
          {
            id: "c",
            text: "不能；应把因这台相机毁损取得的6000元交给物主",
            explanation: "物已毁损，替代其价值的保险金仍应交还权利人。",
          },
          {
            id: "d",
            text: "能，因为相机一旦烧毁，所有与它有关的返还义务都消失",
            explanation: "实物毁损不消除对已取得保险金的返还。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-neighbor-possession-possession-good-faith-insurance",
        relatedTopicIds: ["civil-possession-loss"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年8月，仓库将许岚的相机错送给周宁，订单标签与周宁购买的同型号相机一致，周宁一直没有发现错送线索。9月保管处遭雷击，相机被烧毁，周宁无保管、使用过错。他依已经生效的理赔结论实际收到与这台相机毁损对应的6000元保险金。随后错送查清，双方确认许岚一直是物主，许岚要求交付这6000元。周宁称自己收货时并不知情，所以保险金可以自己留下。本题不争议保险合同和理赔资格，只问这笔已收到的保险金归还。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能，应把6000元保险金交给许岚。这笔钱是因许岚的相机毁损而取得的，依法应返还给权利人；周宁收货时不知道错送，也不能把替代相机价值的款项留作自己的钱。",
        sources: ["civil-possession-indemnity461"],
        id: "civil-neighbor-possession-possession-good-faith-insurance-written",
        kind: "subjective",
        title: "相机烧毁后收到保险金：写出分析",
        prompt:
          "周宁能否仅以收货时不知道错送为由，留下这6000元保险金？请结合案情说明理由。",
        criteria: [
          {
            id: "possession-insurance-return",
            label: "毁损保险金应返还权利人",
            meaning:
              "说明6000元应交给物主，它是因相机毁损取得的保险金，善意收货不免除这项返还。",
            acceptable:
              "说相机虽烧了，但赔相机的6000元还是应给许岚，当初不知错送也不能留着即可。",
            boundary:
              "只判断这笔实际已收到的保险金，不要求另算保险合同效力或不存在的其他过错赔偿。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-possession-protection",
    title: "占有保护与一年期间",
    headline:
      "非所有人也能依法保护占有；因侵占要求返还原物，要注意自侵占发生起一年的期间。",
    goal: "周宁不是车主，就不能向林岳请求返还吗？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "物品被他人侵占，原占有人可以依法请求返还；受到妨害或危险，也可以请求排除、消除。承租人虽不是所有人，对陌生侵占人仍有占有保护，不能只因没有所有权就否定其请求。",
      "第462条的占有返还请求，自侵占发生之日起一年内未行使就消灭。这不是所有返还路径的统一期限，也不是要求法院必须在一年内审结；已经及时行使和一直没有行使要分清。",
    ],
    example: {
      title: "租来的自行车被陌生人拿走",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。2026年9月1日，周宁从正规车行租用一辆自行车至10月31日，按约在校内骑行。9月15日，陌生人林岳未经任何授权，把周宁停在车棚的自行车搬到自己屋里并拒绝交还。9月18日，周宁要求返还，林岳只说“你只是租车的，车又不是你的，所以没资格要”。车行没有授权林岳取车，租赁也未解除。",
      analysis:
        "周宁可以要求林岳返还。自行车原由他依租赁合同占有，林岳没有授权却搬走并拒还，侵占了他的占有。占有保护不只属于所有人，承租人也能依法提出返还请求。",
    },
    pitfall:
      "认为只有所有人才有权要回被侵占物，或把占有返还的一年期间扩成全部民事请求一并消灭。",
    recall: {
      prompt: "周宁不是车主，就不能向林岳请求返还吗？",
      reference:
        "非所有人也能依法保护占有；因侵占要求返还原物，要注意自侵占发生起一年的期间。",
    },
    sources: ["civil-possession-remedy462"],
    exercises: [
      {
        caseId: "civil-neighbor-possession-possession-lessee-against-stranger",
        relatedTopicIds: ["civil-possession-protection"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月1日，周宁从正规车行租用一辆自行车至10月31日，按约在校内骑行。9月15日，陌生人林岳未经任何授权，把周宁停在车棚的自行车搬到自己屋里并拒绝交还。9月18日，周宁要求返还，林岳只说“你只是租车的，车又不是你的，所以没资格要”。车行没有授权林岳取车，租赁也未解除。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "周宁可以要求林岳返还。自行车原由他依租赁合同占有，林岳没有授权却搬走并拒还，侵占了他的占有。占有保护不只属于所有人，承租人也能依法提出返还请求。",
        sources: ["civil-possession-remedy462"],
        id: "civil-neighbor-possession-possession-lessee-against-stranger-choice",
        kind: "objective",
        choiceMode: "single",
        title: "租来的自行车被陌生人拿走：选择判断",
        prompt: "周宁不是车主，就不能向林岳请求返还吗？",
        options: [
          {
            id: "a",
            text: "不能，租赁物只能由车主找回，承租人一概没有占有保护",
            explanation: "第462条保护占有人，不仅是所有人。",
          },
          {
            id: "b",
            text: "可以；周宁是原占有人，林岳无权搬走，非车主也可依法请求返还",
            explanation: "未到一年，原占有人可向侵占人提出占有返还请求。",
          },
          {
            id: "c",
            text: "可以，所以租车合同已把自行车所有权转给周宁",
            explanation: "占有保护不等于取得所有权。",
          },
          {
            id: "d",
            text: "不能，林岳把车搬回屋就自动优先取得所有权",
            explanation: "搬走他人物品不产生所称权利。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-neighbor-possession-possession-lessee-against-stranger",
        relatedTopicIds: ["civil-possession-protection"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月1日，周宁从正规车行租用一辆自行车至10月31日，按约在校内骑行。9月15日，陌生人林岳未经任何授权，把周宁停在车棚的自行车搬到自己屋里并拒绝交还。9月18日，周宁要求返还，林岳只说“你只是租车的，车又不是你的，所以没资格要”。车行没有授权林岳取车，租赁也未解除。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "周宁可以要求林岳返还。自行车原由他依租赁合同占有，林岳没有授权却搬走并拒还，侵占了他的占有。占有保护不只属于所有人，承租人也能依法提出返还请求。",
        sources: ["civil-possession-remedy462"],
        id: "civil-neighbor-possession-possession-lessee-against-stranger-written",
        kind: "subjective",
        title: "租来的自行车被陌生人拿走：写出分析",
        prompt: "周宁不是车主，就不能向林岳请求返还吗？请结合案情说明理由。",
        criteria: [
          {
            id: "possession-lessee-return-remedy",
            label: "承租人也有占有返还保护",
            meaning:
              "联系周宁依有效租赁占有，林岳未经授权搬走拒还，说明周宁可依法请求返还，不以是车主为条件。",
            acceptable:
              "说租来的车也在周宁合法占用中，陌生人不能拿走不还，他不是车主也可以要回来即可。",
            boundary:
              "不要求证明周宁取得所有权，不讨论未给出的车行违约或留置。",
          },
        ],
      },
      {
        caseId: "civil-neighbor-possession-possession-return-one-year",
        relatedTopicIds: ["civil-possession-protection"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2025年1月，周宁按有效约定借用许岚的测绘仪至2027年底，仪器所有权仍属许岚。2025年3月1日，林岳在没有授权的情况下把仪器搬走并一直占着，周宁当天知道此事，却一直没有提出返还要求、起诉或作其他行使占有返还请求的行为。2026年10月1日，周宁才第一次以自己是原占有人为由，依据《民法典》第462条要求林岳返还。本题仅判断周宁的这项占有返还请求，不处理许岚的所有权返还或其他请求。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "这项占有返还请求已经消灭。一年从2025年3月1日侵占发生时起算，周宁在一年内从未行使，到2026年10月才首次提出，已经超过期间。这里只判断第462条这项请求，不等于林岳因此取得仪器所有权，也不等于其他人的全部请求都消失。",
        sources: ["civil-possession-remedy462"],
        id: "civil-neighbor-possession-possession-return-one-year-choice",
        kind: "objective",
        choiceMode: "single",
        title: "侵占一年后才第一次要求归还：选择判断",
        prompt: "周宁的第462条占有返还请求，是否已因超过一年未行使而消灭？",
        options: [
          {
            id: "a",
            text: "没有消灭，因为只有周宁第一次想到起诉时才开始算一年",
            explanation: "第462条明确从侵占发生之日起算。",
          },
          {
            id: "b",
            text: "没有消灭，因为占有返还在任何情况下都没有期间限制",
            explanation: "忽略法定一年期间。",
          },
          {
            id: "c",
            text: "已经消灭，所以林岳自动取得所有权，任何人都再无权提出任何请求",
            explanation:
              "该项请求消灭不等于侵占人取得所有权或全部路径一并消灭。",
          },
          {
            id: "d",
            text: "这项请求已消灭；侵占发生后一年内未行使，但不据此认定林岳取得所有权",
            explanation: "准确限定第462条占有返还请求及其后果。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-neighbor-possession-possession-return-one-year",
        relatedTopicIds: ["civil-possession-protection"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2025年1月，周宁按有效约定借用许岚的测绘仪至2027年底，仪器所有权仍属许岚。2025年3月1日，林岳在没有授权的情况下把仪器搬走并一直占着，周宁当天知道此事，却一直没有提出返还要求、起诉或作其他行使占有返还请求的行为。2026年10月1日，周宁才第一次以自己是原占有人为由，依据《民法典》第462条要求林岳返还。本题仅判断周宁的这项占有返还请求，不处理许岚的所有权返还或其他请求。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "这项占有返还请求已经消灭。一年从2025年3月1日侵占发生时起算，周宁在一年内从未行使，到2026年10月才首次提出，已经超过期间。这里只判断第462条这项请求，不等于林岳因此取得仪器所有权，也不等于其他人的全部请求都消失。",
        sources: ["civil-possession-remedy462"],
        id: "civil-neighbor-possession-possession-return-one-year-written",
        kind: "subjective",
        title: "侵占一年后才第一次要求归还：写出分析",
        prompt:
          "周宁的第462条占有返还请求，是否已因超过一年未行使而消灭？请结合案情说明理由。",
        criteria: [
          {
            id: "possession-return-expired",
            label: "自侵占发生一年未行使则消灭",
            meaning:
              "联系2025年3月1日侵占、2026年10月才首次主张，说明第462条这项返还请求因一年内未行使而消灭。",
            acceptable:
              "说从被搬走那天算一年，期间一直没要求返还，过了一年半才要，这项占有返还请求已过期即可。",
            boundary:
              "不得要求法院一年内审结，不要求一并认定许岚所有权或其他赔偿请求消灭。",
          },
        ],
      },
    ],
  },
];

export const civilNeighborPossessionChapters = [
  {
    id: "CIV-NEIGHBORING-RIGHTS",
    title: "相邻关系",
    section: "民法",
    topicIds: [
      "civil-neighbor-water",
      "civil-neighbor-access",
      "civil-neighbor-construction",
      "civil-neighbor-light-safety",
    ],
  },
  {
    id: "CIV-POSSESSION",
    title: "占有",
    section: "民法",
    topicIds: [
      "civil-possession-contract",
      "civil-possession-return-cost",
      "civil-possession-loss",
      "civil-possession-protection",
    ],
  },
];

export const civilNeighborPossessionExercises =
  civilNeighborPossessionTopics.flatMap((topic) => topic.exercises);
export const civilNeighborPossessionContentPack = {
  revision: civilNeighborPossessionRevision,
  snapshot: {
    topics: civilNeighborPossessionTopics,
    sources: civilNeighborPossessionSources,
  },
};
export const civilNeighborPossessionDefaultQueues = {
  objective: civilNeighborPossessionExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilNeighborPossessionExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilNeighborPossessionQuestion(id: string) {
  const question = civilNeighborPossessionExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilNeighborPossessionTopicForQuestion(id: string) {
  return civilNeighborPossessionTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilNeighborPossessionSameCaseQuestions(id: string) {
  const question = civilNeighborPossessionQuestion(id);
  return question
    ? structuredClone(
        civilNeighborPossessionExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilNeighborPossessionChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilNeighborPossessionChapters.find(
    (c) => c.id === chapterId,
  );
  return chapter
    ? civilNeighborPossessionTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
