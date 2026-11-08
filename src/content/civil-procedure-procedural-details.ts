import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";

// Sixteen original cases for seven remaining civil-procedure groups.
export const civilProcedureProceduralDetailsRevision =
  "civil-procedure-procedural-details-2026-10-30.v1";
export const civilProcedureProceduralDetailsSources: ContentSources = {
  "civpro-detail-manager-law": {
    title: "《民事诉讼法》（2023年修正）第194—197条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-30核读。指定遗产管理人及其更换、撤销资格，属于特别程序；不能用私人投票代替法院撤销原指定。 原创虚构教学案例，不是官方真题。",
  },
  "civpro-detail-ownerless-law": {
    title: "《民事诉讼法》（2023年修正）第202—204条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-30核读。财产所在地基层法院；认领公告一年；原所有人或继承人在法定时效内出现，可经审查作新判决撤销原判决。 原创虚构教学案例，不是官方真题。",
  },
  "civpro-detail-voter-law": {
    title: "《民事诉讼法》（2023年修正）第185、187—189条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-30核读。须经选举委员会申诉处理，在选举日五日以前起诉，选举日前审结和送达；审判员合议庭、一审终审。 原创虚构教学案例，不是官方真题。",
  },
  "civpro-detail-coercion-law": {
    title: "《民事诉讼法》（2023年修正）第112、117—120条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-30核读。区分拘传、罚款和拘留的条件与程序；罚款拘留向上一级法院复议一次，复议不停止执行。 原创虚构教学案例，不是官方真题。",
  },
  "civpro-detail-coercion-procedure": {
    title: "《民诉法解释》（2022年修正）第174、175条",
    url: "https://www.quanzhou.gov.cn/zfb/xxgk/zfxxgkzl/fgwj/sfjs/202304/t20230412_2868534.htm",
    note: "2026-10-30核读。拘传票直接送达；拘传前说明拒不到庭后果，批评教育后仍拒不到庭才可实施。 原创虚构教学案例，不是官方真题。",
  },
  "civpro-detail-fee-mediation": {
    title: "《诉讼费用交纳办法》第15、31条",
    url: "https://xzfg.moj.gov.cn/front/law/detail?LawID=1555",
    note: "2026-10-30核读。法院调解结案减半交纳案件受理费；费用负担先由双方协商，协商不成由法院决定。 原创虚构教学案例，不是官方真题。",
  },
  "civpro-detail-fee-relief": {
    title: "《诉讼费用交纳办法》第44、45、48条",
    url: "https://xzfg.moj.gov.cn/front/law/detail?LawID=1555",
    note: "2026-10-30核读。无其他收入的最低生活保障对象申请司法救助，应准予免交；仍须提出书面申请并提交经济困难证明。免交仅适用于自然人。 原创虚构教学案例，不是官方真题。",
  },
  "civpro-detail-counterclaim-law": {
    title: "《仲裁法》（2025年修订）第32、36、38条",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026-10-30核读。2026-03-01施行。被申请人可以反驳，也有权提出反请求；未提交答辩书不影响仲裁进行。 原创虚构教学案例，不是官方真题。",
  },
  "civpro-detail-correction-law": {
    title: "《仲裁法》（2025年修订）第69、70条",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026-10-30核读。补正限于文字、计算错误或已经裁决但裁决书遗漏的事项；当事人自收到裁决书30日内请求仲裁庭补正。 原创虚构教学案例，不是官方真题。",
  },
  "civpro-detail-counterclaim-rules": {
    title: "《中国国际经济贸易仲裁委员会仲裁规则》（2024年版）第46条第1款",
    url: "https://www.cietac.org/articles/19384",
    note: "2026-10-30核读贸仲官方索引全文与官方PDF对应条款。题干明确选择2024版；本请求撤回不影响反请求审理和裁决。不作为所有仲裁机构的统一规则。原创虚构教学案例，不是官方真题。",
  },
};

type CaseDraft = {
  id: string;
  topicId: string;
  title: string;
  facts: string;
  prompt: string;
  reference: string;
  answer: "a" | "b" | "c" | "d";
  options: { text: string; explanation: string }[];
  points: { label: string; meaning: string; boundary: string }[];
  sources: string[];
};
const cases: CaseDraft[] = [
  {
    id: "civpro-detail-manager-venue",
    topicId: "civpro-detail-estate-manager",
    title: "两地都有遗产，去哪申请指定管理人",
    facts:
      "许衡去世时住所位于青浦区，主要遗产是一处位于临川区的仓库，另有少量存款。他的两名子女对由谁清点、保管遗产争执不下，至今没有确定管理人。子女许宁现住安和区，准备申请法院指定遗产管理人。这次申请只解决管理人的人选，不请求法院分割遗产。",
    prompt: "许宁可以向哪些法院申请？法院应通过什么方式确定管理人？",
    reference:
      "可以向青浦区或临川区基层法院申请。青浦区是许衡死亡时住所地，临川区是主要遗产所在地；许宁自己的住所地不是本题的管辖依据。法院应审查核实，按有利于遗产管理的原则判决指定，不是在这个程序中分割遗产。",
    answer: "b",
    options: [
      {
        text: "只能向许宁现住的安和区基层法院申请",
        explanation: "申请人住所地不是这一特别程序规定的连接点。",
      },
      {
        text: "可向青浦区或临川区基层法院申请，由法院审查后判决指定",
        explanation: "死亡时住所地和主要遗产所在地均是法定管辖依据。",
      },
      {
        text: "必须先把全部遗产分完，法院才能指定管理人",
        explanation: "管理人负责清理和管理遗产，不以先完成分割为条件。",
      },
      {
        text: "只能由子女投票，法院无权指定",
        explanation: "对确定管理人有争议时，利害关系人可以申请法院指定。",
      },
    ],
    points: [
      {
        label: "找准两处管辖法院",
        meaning:
          "对应死亡时住所地与主要遗产所在地，指出青浦区或临川区基层法院均可受理。",
        boundary: "两处都是本问要求；不要求写条号，不需要讨论先受理规则。",
      },
      {
        label: "法院审查后判决指定",
        meaning:
          "说明法院按有利于遗产管理的原则审查并判决指定，区别于先分割遗产或纯私人投票。",
        boundary: "不要求替法院在两名子女之间选出具体人选。",
      },
    ],
    sources: ["civpro-detail-manager-law"],
  },
  {
    id: "civpro-detail-manager-removal",
    topicId: "civpro-detail-estate-manager",
    title: "法院指定的人，挪用了遗产怎么办",
    facts:
      "法院已判决指定杜青为遗产管理人。杜青随后把大笔遗产存款转入自己的经营账户，拒不说明去向，也不清偿已经核实的到期遗产债务。法院查明这些行为使遗产债权人的合法权益受到严重损害。债权人林川申请撤销杜青的资格并指定新人，杜青称原判决一审终审，谁也不能再改。",
    prompt: "债权人能否提出这项申请？法院可以如何处理杜青的管理人资格？",
    reference:
      "林川可以申请。杜青违反管理职责，已严重侵害遗产债权人的权益，法院可以撤销其管理人资格，并依法指定新的管理人。一审终审不意味着出现这类新情况后仍必须让杜青继续管理。",
    answer: "d",
    options: [
      {
        text: "债权人不是继承人，不能申请",
        explanation: "受严重侵害的遗产债权人属于利害关系人。",
      },
      {
        text: "原判决一审终审，杜青只能一直担任",
        explanation: "法律另有撤销管理人资格并指定新人的程序。",
      },
      {
        text: "债权人发一封通知，就自动撤销杜青资格",
        explanation: "需要法院依法处理，债权人不能单方替换法院指定的人。",
      },
      {
        text: "债权人可申请，法院可撤销资格并依法指定新人",
        explanation: "违反职责并严重侵害债权人权益，符合本题撤销事由。",
      },
    ],
    points: [
      {
        label: "债权人有申请资格",
        meaning:
          "联系遗产债权人权益严重受损，说明其属于可申请撤销资格的利害关系人。",
        boundary: "不要求扩展债权受偿顺序。",
      },
      {
        label: "依法撤销并指定新人",
        meaning:
          "联系挪用遗产、严重侵害权益，说明法院可以撤销资格并指定新人，原一审终审不妨碍此程序。",
        boundary: "不要求同时判断挪用行为是否构成犯罪。",
      },
    ],
    sources: ["civpro-detail-manager-law"],
  },
  {
    id: "civpro-detail-ownerless-notice",
    topicId: "civpro-detail-ownerless-property",
    title: "认领公告30天就能收归国家吗",
    facts:
      "海岚区一处旧库房内存有一批机器，长期无人管理。有关组织申请认定该批机器无主，海岚区基层法院受理并审查核实后发出认领公告。公告发出已满30日，仍无人认领。组织负责人建议法院立即判决收归国家，理由是民事公告送达满30日就完成了。",
    prompt: "现在能否按无主财产判决处理？应适用什么公告期间和后续程序？",
    reference:
      "现在还不能因满30日就认定无主。这里是财产认领公告，公告期为一年，和普通公告送达不同。满一年仍无人认领，法院才判决认定财产无主，收归国家或集体所有；不能由申请组织直接据为己有。",
    answer: "a",
    options: [
      {
        text: "应继续公告，满一年无人认领后由法院判决认定无主",
        explanation: "认领公告适用特别程序的一年期间。",
      },
      {
        text: "30日已满，应立即判决收归国家",
        explanation: "混用了普通公告送达的期间。",
      },
      {
        text: "申请组织找不到所有人时就自动取得机器所有权",
        explanation: "申请认定无主不使申请人自动取得财产。",
      },
      {
        text: "必须公告两年，法院没有其他处理方式",
        explanation: "本程序法定认领公告期是一年。",
      },
    ],
    points: [
      {
        label: "区分一年认领公告",
        meaning: "明确本案应公告一年，不能用普通公告送达30日替代。",
        boundary: "不要求计算具体公告期满日期。",
      },
      {
        label: "无人认领后由法院判决",
        meaning:
          "说明满一年仍无人认领，由法院判决认定无主并收归国家或集体，而非申请组织自行取得。",
        boundary: "不要求判断最终归国家还是具体集体。",
      },
    ],
    sources: ["civpro-detail-ownerless-law"],
  },
  {
    id: "civpro-detail-ownerless-return",
    topicId: "civpro-detail-ownerless-property",
    title: "已经认定无主，原所有人又出现了",
    facts:
      "一批旧设备经法定公告后，被法院判决认定无主并收归国家。数月后，原所有人季禾出现，提交购货合同、设备编号和保管记录，要求恢复对设备的权利。她的请求在民法典规定的诉讼时效期间内，法院已经审查确认她确是原所有人。保管单位认为财产已收归国家，原判决不可能撤销。",
    prompt: "保管单位的说法是否正确？法院应如何处理原判决？",
    reference:
      "保管单位的说法不对。原所有人在法定时效内出现并提出请求，法院核实属实后，应作出新判决，撤销原认定无主的判决。收归国家不排除这条法定救济途径。",
    answer: "c",
    options: [
      {
        text: "已经收归国家，原所有人的请求一律不再受理",
        explanation: "法律允许原所有人或继承人在法定期间内提出请求。",
      },
      {
        text: "只要有人来认领，保管单位就应自行宣布原判决无效",
        explanation: "需要法院审查并作出新判决。",
      },
      {
        text: "法院核实后应作出新判决，撤销原判决",
        explanation: "本题身份和请求期间均已满足法定条件。",
      },
      {
        text: "只能按普通二审上诉处理，不存在其他途径",
        explanation: "特别程序一审终审，但另有原所有人出现后的新判决程序。",
      },
    ],
    points: [
      {
        label: "原权利人仍可请求救济",
        meaning:
          "联系季禾系原所有人且在法定时效内提出请求，说明收归国家不使她当然失去救济。",
        boundary: "不要求计算题目已说明合法的时效。",
      },
      {
        label: "新判决撤销原判决",
        meaning:
          "说明法院审查属实后应作新判决撤销原无主判决，不能由保管单位自行宣布失效。",
        boundary: "不要求扩展设备已灭失时的赔偿问题。",
      },
    ],
    sources: ["civpro-detail-ownerless-law"],
  },
  {
    id: "civpro-detail-voter-filing",
    topicId: "civpro-detail-voter-qualification",
    title: "选民名单漏了名字，诉讼来不来得及",
    facts:
      "某选区定于11月20日进行选举。陈澄发现公布的选民名单没有自己，先向选举委员会申诉；委员会作出维持原名单的处理决定。陈澄仍不服，于11月10日准备起诉。她现住另一城区，听人说可以等收到处理决定后15日内再向自己住所地法院上诉。",
    prompt:
      "陈澄应在什么时候、向哪里提起什么诉讼？本次准备起诉的时间是否及时？",
    reference:
      "她应向选区所在地基层法院提起选民资格诉讼，时间须在选举日五日以前。11月10日距离11月20日选举尚有十日，符合本题起诉时间要求。这里不是对普通一审判决上诉，不能套用15日上诉期，也不以她现在的住所地确定法院。",
    answer: "b",
    options: [
      {
        text: "按普通上诉处理，收到处理决定后15日内交住所地法院",
        explanation: "这是选民资格特别程序，不是普通二审上诉。",
      },
      {
        text: "向选区所在地基层法院起诉，11月10日符合选举日五日以前的要求",
        explanation: "已先申诉且时间足够，管辖和程序均符合规定。",
      },
      {
        text: "只要在选举日当天投票结束前起诉都来得及",
        explanation: "法律要求在选举日五日以前起诉。",
      },
      {
        text: "选举委员会已经处理，法院不能再受理",
        explanation: "不服申诉处理决定，依法可以提起选民资格诉讼。",
      },
    ],
    points: [
      {
        label: "正确选择诉讼和法院",
        meaning:
          "联系已向选举委员会申诉，说明可向选区所在地基层法院提起选民资格诉讼。",
        boundary: "不要求审查题目未给出争议的实体选民资格。",
      },
      {
        label: "适用选举日前起诉期限",
        meaning:
          "指出须在选举日五日以前起诉，11月10日起诉及时，不能套普通15日上诉期。",
        boundary: "不要求讨论临界日遇节假日的计算。",
      },
    ],
    sources: ["civpro-detail-voter-law"],
  },
  {
    id: "civpro-detail-voter-trial",
    topicId: "civpro-detail-voter-qualification",
    title: "选举在下周，法院能延后再判吗",
    facts:
      "法院已依法受理周望的选民资格案件，选举日就在下周。承办法官准备独任审理，并打算以工作繁忙为由报院长批准，等选举结束后再判。他还告诉周望，不服判决可以像普通民事案件一样上诉，二审期间再解决能否投票。",
    prompt: "这一审理安排有哪些问题？本案应怎样组织审理并完成裁判？",
    reference:
      "应由审判员组成合议庭审理，实行一审终审，不能安排普通二审上诉。法院必须在选举日前审结并送达判决，不能因工作繁忙拖到选举后；审理时应让起诉人、选举委员会代表和有关公民参加。",
    answer: "d",
    options: [
      {
        text: "普通程序能独任，本案也可以直接独任",
        explanation: "选民资格案件特别规定由审判员组成合议庭。",
      },
      {
        text: "院长批准后，就可以在选举结束后判决",
        explanation: "选民资格案件必须在选举日前审结。",
      },
      {
        text: "先独任判决，再靠普通二审解决投票资格",
        explanation: "本案一审终审，不设普通二审上诉。",
      },
      {
        text: "审判员组成合议庭，选举日前审结送达，一审终审",
        explanation: "须确保裁判在选举前实际发挥作用。",
      },
    ],
    points: [
      {
        label: "合议庭和一审终审",
        meaning:
          "说明选民资格案件应由审判员组成合议庭，并实行一审终审，纠正独任和普通上诉安排。",
        boundary: "不要求列出所有其他特别程序的审判组织。",
      },
      {
        label: "选举日前完成审理送达",
        meaning:
          "说明必须在选举日前审结并送达，不能因繁忙延后；可补充法定参加人的要求。",
        boundary:
          "参加人列举是补充，不能因未逐一列名扣掉已正确回答的期限要点。",
      },
    ],
    sources: ["civpro-detail-voter-law"],
  },
  {
    id: "civpro-detail-summons",
    topicId: "civpro-detail-coercive-measures",
    title: "两次拒不到庭，法院可以怎么办",
    facts:
      "在一起赡养费诉讼中，法院依法认定被告韩宁必须本人到庭，才能查清赡养安排等关键事实。法院先后两次向他合法送达传票，他没有疾病、交通受阻等正当理由，只说不想来，两次都未到庭。法院向他说明后果并批评教育后，他仍拒绝到庭。原告要求自己找人把韩宁带来；承办法官则考虑依法采取拘传。",
    prompt: "本案是否具备拘传条件？采取拘传需要哪些批准和文书手续？",
    reference:
      "具备可以拘传的条件。韩宁是必须到庭的被告，两次收到传票仍无正当理由拒不到庭。拘传由法院依法决定，须经院长批准，使用拘传票并直接送达；实施前说明后果、批评教育仍拒不到庭的，才依法拘传。不能让原告自己找人强行带他来。",
    answer: "a",
    options: [
      {
        text: "法院可以依法拘传，须经院长批准并发拘传票",
        explanation: "必须到庭、两次传票、无正当理由拒不到庭均已具备。",
      },
      {
        text: "只要原告愿意，便可自行强行带被告到庭",
        explanation: "私人不能替法院实施拘传。",
      },
      {
        text: "拒绝到庭就必然构成犯罪，应直接逮捕",
        explanation: "拘传与刑事逮捕不同，不到庭不当然构成犯罪。",
      },
      {
        text: "被告拒收出庭安排时，法院永远只能等下去",
        explanation: "对符合条件的必须到庭被告，法院有法定拘传措施。",
      },
    ],
    points: [
      {
        label: "认定拘传条件已具备",
        meaning:
          "联系必须到庭、两次合法传票和无正当理由拒不到庭，说明法院可以拘传。",
        boundary:
          "认可概括连接事实，不要求照抄每句题干；不能把可以拘传写成必然犯罪。",
      },
      {
        label: "拘传程序和实施主体",
        meaning:
          "说明由法院依法采取，须院长批准、使用并直接送达拘传票，原告不能私自强行带人。",
        boundary:
          "不要求扩展拘传持续时间；题干已给出说明后果和批评教育，不将重复该事实作为额外要点。",
      },
    ],
    sources: ["civpro-detail-coercion-law", "civpro-detail-coercion-procedure"],
  },
  {
    id: "civpro-detail-detention-review",
    topicId: "civpro-detail-coercive-measures",
    title: "对拘留不服，申请复议就能先离开吗",
    facts:
      "杜衡为阻止法院取证，故意毁掉重要账册。法院依法查明后，经院长批准，制作并送达拘留十日的决定书。杜衡第二天提出异议，要求把材料交上一级法院，同时认为一提出异议就应立即停止拘留，等复议结果出来再说。",
    prompt: "杜衡可以采取什么救济？提出救济后是否自动停止拘留？",
    reference:
      "杜衡可以向上一级法院申请复议一次，但复议期间不停止拘留决定的执行。提出异议并不等于已经获准解除拘留，也不能按普通判决上诉来处理。",
    answer: "c",
    options: [
      {
        text: "应当按普通判决提起二审上诉，拘留当然停止",
        explanation: "罚款、拘留决定适用复议，不是普通上诉。",
      },
      {
        text: "既已拘留就没有任何法定救济",
        explanation: "不服决定可以向上一级法院申请复议一次。",
      },
      {
        text: "可以向上一级法院复议一次，复议不停止执行",
        explanation: "救济权与原决定继续执行可以同时存在。",
      },
      {
        text: "向原告表达反对后，原告可以决定是否解除拘留",
        explanation: "解除司法拘留不能由对方当事人决定。",
      },
    ],
    points: [
      {
        label: "采用上级法院复议救济",
        meaning: "说明不服拘留决定可向上一级法院申请复议一次，而非普通上诉。",
        boundary: "题目次日提出已在期间内，不要求另外背出复议期间。",
      },
      {
        label: "复议不停止执行",
        meaning: "明确提出复议不会自动停止拘留，仍按原决定执行。",
        boundary: "不要求讨论后续纠正决定或提前解除的其他情形。",
      },
    ],
    sources: ["civpro-detail-coercion-law"],
  },
  {
    id: "civpro-detail-assistance-refusal",
    topicId: "civpro-detail-coercive-measures",
    title: "银行拒绝协助划拨，能处理谁",
    facts:
      "法院依法执行一笔生效判决债务，向银行送达手续齐备的协助划拨通知。银行有能力履行，却以担心失去客户为由拒绝。法院责令协助并对银行及直接责任人员依法罚款后，相关负责人仍指示员工拒绝办理；本案没有争议款项归第三人等其他理由。",
    prompt:
      "法院能否处罚拒绝协助的银行？在本题后续情况下，能否对责任人员采取拘留？",
    reference:
      "可以。银行收到合法协助执行通知仍拒绝履行，法院可责令履行并予罚款，也可对主要负责人或直接责任人员罚款。本题经处理仍不协助，可以对相应责任人员拘留；不是对银行这个单位本身实行拘留。",
    answer: "b",
    options: [
      {
        text: "银行不是债务人，因此没有协助执行义务",
        explanation: "是否负协助义务与是否为债务人不同。",
      },
      {
        text: "可责令银行协助并罚款；仍不履行时可拘留相应责任人员",
        explanation: "区分单位的责任和自然人责任人员可受的措施。",
      },
      {
        text: "应当把整个银行单位拘留十日",
        explanation: "拘留适用于自然人，不能拘留单位本身。",
      },
      {
        text: "只要交过罚款，银行就不必再协助划拨",
        explanation: "受处罚不免除继续履行协助义务。",
      },
    ],
    points: [
      {
        label: "银行有协助义务并可被罚款",
        meaning:
          "联系合法协助通知、能够协助却拒绝，说明可责令履行并对银行罚款，不因其非债务人而免除义务。",
        boundary: "不要求背诵罚款金额上下限。",
      },
      {
        label: "仍不履行可拘留责任人员",
        meaning:
          "联系依法处理后仍拒绝协助，说明可对主要负责人或直接责任人员拘留，而非拘留单位。",
        boundary: "不要求额外判断责任人员已构成犯罪。",
      },
    ],
    sources: ["civpro-detail-coercion-law"],
  },
  {
    id: "civpro-detail-private-collection",
    topicId: "civpro-detail-coercive-measures",
    title: "有生效判决，就能自己扣人收债吗",
    facts:
      "陆舟已取得要求何宁还款的生效判决。何宁迟迟不付款，陆舟没有申请法院执行，而是带人把何宁锁在办公室，私自扣走其电脑，称这是代法院“拘留、查封”，只要欠款真实就合法。",
    prompt: "陆舟能否凭生效判决这样收债？他应走什么程序实现债权？",
    reference:
      "不能。生效判决让陆舟可以依法申请强制执行，并不授予他拘留、查封的权力。私人锁人、扣财产追债属于违法强制行为，应依法承担相应责任；应向法院申请执行，由法院依法采取执行措施。",
    answer: "d",
    options: [
      {
        text: "有生效判决就可以自行代法院拘留、查封",
        explanation: "生效判决不把司法强制权交给债权人。",
      },
      {
        text: "只要电脑价值不超过欠款，锁人扣电脑都合法",
        explanation: "违法限制人身和私自扣押不能因金额较小合法化。",
      },
      {
        text: "法院作出判决后，后续收债只能全靠债权人自己",
        explanation: "可以依法申请人民法院强制执行。",
      },
      {
        text: "不能私自拘禁扣押，应依法申请法院执行",
        explanation: "区分胜诉债权与实施司法强制措施的权限。",
      },
    ],
    points: [
      {
        label: "否定私人拘禁扣押",
        meaning:
          "说明即使债权和判决真实，也不能自行拘禁、私自扣押财产代替法院强制措施。",
        boundary: "不要求精确定罪；可概括为违法并依法承担责任。",
      },
      {
        label: "指出申请法院执行",
        meaning: "说明应申请法院强制执行，由法院依法实施执行措施。",
        boundary: "不要求计算申请执行时效或列出所有执行措施。",
      },
    ],
    sources: ["civpro-detail-coercion-law"],
  },
  {
    id: "civpro-detail-mediation-fees",
    topicId: "civpro-detail-litigation-fees",
    title: "法院调解结案，诉讼费由谁承担",
    facts:
      "两家公司的一审买卖合同纠纷按普通程序审理，原告已按正常标准预交案件受理费。双方后来在法院主持下达成调解协议并以调解方式结案，但始终无法就案件受理费由谁负担达成一致。被告说调解结案就应全部免交；原告说这笔费必然全由被告负担。题目不涉及其他收费项目。",
    prompt: "案件受理费应如何收取？双方谈不拢负担比例时由谁决定？",
    reference:
      "案件受理费减半交纳，并非全部免交。调解案件的诉讼费用负担由双方协商，协商不成由法院决定；不能只因对方是被告，就认定案件受理费必须由其全部承担。",
    answer: "a",
    options: [
      {
        text: "受理费减半，双方协商不成时由法院决定负担",
        explanation: "分别解决收费数额与由谁负担两个问题。",
      },
      {
        text: "只要调解成功，全部受理费自动免交",
        explanation: "调解结案的通常规则是减半，不是全免。",
      },
      {
        text: "受理费必须全额收取，减半只适用于简易程序",
        explanation: "调解方式结案也是减半交纳受理费的法定情形。",
      },
      {
        text: "受理费减半，但只要协商不成就一律由被告全负担",
        explanation: "协商不成时由法院决定，并无本题所说一律规则。",
      },
    ],
    points: [
      {
        label: "调解结案受理费减半",
        meaning: "明确本案案件受理费减半交纳，而非全免或仍按全额。",
        boundary: "题目排除了其他费用，不要求计算具体金额或其他减半情形。",
      },
      {
        label: "协商不成由法院决定",
        meaning:
          "说明诉讼费用负担先由双方协商，谈不拢由法院决定，不一律归被告。",
        boundary: "不要求替法院确定具体比例。",
      },
    ],
    sources: ["civpro-detail-fee-mediation"],
  },
  {
    id: "civpro-detail-fee-relief",
    topicId: "civpro-detail-litigation-fees",
    title: "低保收入之外没有收入，能申请免交吗",
    facts:
      "赵禾起诉要求商家返还预付款。她是最低生活保障对象，除低保金外没有其他收入，确实无力交纳诉讼费用。起诉时，她提交了书面免交申请、低保证明和无其他收入的证明，法院已核实情况属实。商家说这不是赡养费、抚养费案件，法院最多只能让她晚一点缴费。",
    prompt: "商家的说法是否正确？法院应如何处理赵禾的申请？",
    reference:
      "商家的说法不对。赵禾是没有其他收入的低保对象，符合免交诉讼费用的条件；她已书面申请并提交证明，法院核实后应准予免交，不只限于缓交。免交不是只对赡养费、抚养费案件开放。",
    answer: "c",
    options: [
      {
        text: "只要不是赡养费、抚养费案件，就不得免交",
        explanation: "无其他收入的低保对象也是法定免交情形。",
      },
      {
        text: "她可以不申请、不提交证明，直接自行不缴费",
        explanation: "司法救助需要依法申请和审查，不能自行宣布免交。",
      },
      {
        text: "已申请并证实符合条件，法院应准予免交",
        explanation: "身份、收入及申请材料均符合本题免交要求。",
      },
      {
        text: "个人符合条件也只能缓交，不能免交",
        explanation: "法律规定缓交、减交和免交，并非只准缓交。",
      },
    ],
    points: [
      {
        label: "识别法定免交条件",
        meaning:
          "联系低保对象且无其他收入，说明符合免交条件，不限于赡养费等特定案由。",
        boundary: "不要求列全其他免交情形。",
      },
      {
        label: "经申请核实应准予免交",
        meaning:
          "联系书面申请、证明已提交且法院核实，明确应准予免交，不能只允许缓交或由本人自行免交。",
        boundary: "不要求讨论商家作为法人能否申请其他司法救助。",
      },
    ],
    sources: ["civpro-detail-fee-relief"],
  },
  {
    id: "civpro-detail-counterclaim-request",
    topicId: "civpro-detail-arbitration-counterclaim",
    title: "否认欠款之外，还要对方赔钱",
    facts:
      "2026年，两家公司依有效仲裁协议，就供货合同的一切争议提交仲裁。卖方请求买方支付余款，买方一方面主张余款已付清，要求驳回卖方请求；另一方面要求卖方因迟延交货赔偿另行发生的停工损失。该赔偿主张属于仲裁协议范围，买方已按适用规则及时提出独立请求、事实理由和证据。卖方认为买方是被申请人，只能答辩，不能要求自己赔偿。",
    prompt: "买方的两项主张有什么区别？被申请人身份是否妨碍提出赔偿请求？",
    reference:
      "要求驳回余款请求是对本请求的反驳；要求卖方另赔停工损失，是反请求。被申请人有权提出反请求，不是只能答辩。本题赔偿请求在仲裁协议范围内，也已按规则提出，应依法处理，不能仅以买方的被申请人身份拒绝。",
    answer: "b",
    options: [
      {
        text: "两项都只能写在普通答辩中，仲裁庭无权受理独立赔偿请求",
        explanation: "被申请人依法有权提出反请求。",
      },
      {
        text: "否认余款是反驳，另求赔偿是反请求，被申请人有权提出",
        explanation: "根据请求的内容区分抗辩与独立给付请求。",
      },
      {
        text: "被申请人可以反驳，但永远不能向申请人提出请求",
        explanation: "仲裁法明确赋予反请求权。",
      },
      {
        text: "买方一提出反请求，卖方原请求便自动撤销",
        explanation: "反请求不使原请求自动消失。",
      },
    ],
    points: [
      {
        label: "区分反驳与反请求",
        meaning: "结合余款已付与另赔停工损失，分别识别反驳和反请求。",
        boundary: "不要求使用民诉中的反诉术语。",
      },
      {
        label: "认可符合条件的反请求权",
        meaning:
          "说明被申请人可以提出反请求，本题已在协议范围内并按规则提出，不能以身份为由拒绝。",
        boundary: "不要求直接判断停工损失实体上必然获赔。",
      },
    ],
    sources: ["civpro-detail-counterclaim-law"],
  },
  {
    id: "civpro-detail-counterclaim-withdrawal",
    topicId: "civpro-detail-arbitration-counterclaim",
    title: "本请求撤回，反请求也一起结束吗",
    facts:
      "两家公司约定把供货争议交中国国际经济贸易仲裁委员会，适用2024年仲裁规则。卖方请求货款，买方另提质量损失反请求，该反请求已被受理，仲裁庭也已组成。卖方随后撤回自己的全部仲裁请求，但买方明确表示仍继续主张反请求，没有撤回。卖方要求仲裁庭把整个案件一并撤销。",
    prompt: "卖方撤回本请求，会不会使买方的反请求自动结束？仲裁庭应如何处理？",
    reference:
      "不会。依本案约定适用的贸仲2024规则，撤回全部仲裁请求不影响反请求的审理和裁决。买方仍坚持已经受理的反请求，仲裁庭可以就撤回的本请求作相应处理，并继续审理反请求，不能把整个案件一并撤销。",
    answer: "d",
    options: [
      {
        text: "本请求一撤回，反请求当然一起撤回",
        explanation: "本案适用规则明确区分本请求与反请求的撤回效果。",
      },
      {
        text: "反请求只能留到法院另行起诉，仲裁庭不得再审",
        explanation:
          "有效协议与已受理反请求仍在，不能仅因本请求撤回而排除仲裁。",
      },
      {
        text: "买方不同意撤回，就使卖方永远不能撤回自己的请求",
        explanation: "不影响反请求，不等于必须强迫本请求继续。",
      },
      {
        text: "本请求撤回不影响反请求，仲裁庭继续处理后者",
        explanation: "本案规则和反请求仍被坚持的事实决定了其独立延续。",
      },
    ],
    points: [
      {
        label: "反请求不会自动结束",
        meaning:
          "联系已受理且买方未撤回，依本案贸仲规则说明本请求撤回不影响反请求。",
        boundary: "不把此处写成所有仲裁机构规则的具体内容都相同。",
      },
      {
        label: "区分两项请求的后续处理",
        meaning:
          "说明可处理本请求的撤回并继续审理反请求，不能一并撤销整个案件。",
        boundary: "不要求背诵贸仲条号或判断质量损失的实体结果。",
      },
    ],
    sources: [
      "civpro-detail-counterclaim-law",
      "civpro-detail-counterclaim-rules",
    ],
  },
  {
    id: "civpro-detail-award-arithmetic",
    topicId: "civpro-detail-award-correction",
    title: "裁决的加法算错，应该找谁改",
    facts:
      "2026年，仲裁裁决明确认定应付本金8万元、利息1万元，却在合计栏写成19万元。双方均确认只是合计计算错误，不争议本金和利息的认定。买方收到裁决书后第20日请求纠正，卖方称裁决一裁终局，数字再明显也不能更改。",
    prompt: "买方能否请求纠正？应向谁提出，是否在法定期间内？",
    reference:
      "可以请求仲裁庭补正。8万元加1万元应为9万元，合计19万元是计算错误，属于补正范围。买方在收到裁决书第20日提出，未超过30日；一裁终局不妨碍纠正这类错误。",
    answer: "a",
    options: [
      {
        text: "可在收到裁决书30日内向仲裁庭请求补正，本次及时",
        explanation: "对象、机关与申请期间均符合补正规则。",
      },
      {
        text: "必须向法院提起普通二审上诉来重算",
        explanation: "仲裁裁决没有普通二审上诉，计算错误可请求仲裁庭补正。",
      },
      {
        text: "一裁终局意味着计算错误也永远不能改",
        explanation: "补正本来就是对一裁终局裁决的法定纠错方式之一。",
      },
      {
        text: "只能在作出裁决之日起7日内请求，本次已超期",
        explanation: "当事人请求补正的法定期间为收到裁决书起30日。",
      },
    ],
    points: [
      {
        label: "计算错误属于补正范围",
        meaning:
          "结合8万加1万却合计19万，说明是计算错误，可补正为9万元，不是重审责任。",
        boundary: "不要求扩展撤销裁决的其他事由。",
      },
      {
        label: "向仲裁庭及时请求",
        meaning: "说明向仲裁庭提出，期间为收到裁决书起30日，第20日仍及时。",
        boundary: "收到与作出应分清；不要求计算具体日历日期。",
      },
    ],
    sources: ["civpro-detail-correction-law"],
  },
  {
    id: "civpro-detail-award-omission",
    topicId: "civpro-detail-award-correction",
    title: "已经裁决的费用漏写，能连赔偿一起改吗",
    facts:
      "某2026年仲裁案中，仲裁庭已对检测费5000元的承担作出裁决，但制作裁决书时遗漏了这项内容，仲裁庭核对记录确认漏写。同时，裁决书已完整载明只支持买方6万元损失赔偿。买方收到裁决书后第10日，一并请求补上检测费，并以“补正”为名要求重新评价证据，把已裁明的赔偿从6万元提高到10万元。",
    prompt: "这两项请求能否都按裁决补正处理？请说明区别。",
    reference:
      "漏写的检测费可以补正，因为仲裁庭已经裁决，只是裁决书遗漏。把6万元赔偿改成10万元，要求重新评价证据和实体金额，不属于补正。补正不是再审一次案件，不能借此改动已经完整裁明的实体结论。",
    answer: "c",
    options: [
      {
        text: "两项都可以补正，因为当事人在30日内提出",
        explanation: "期间及时不意味着任何实体请求都属于补正范围。",
      },
      {
        text: "两项都不能补正，因为裁决已经生效",
        explanation: "已裁决但文书遗漏的事项属于法定补正范围。",
      },
      {
        text: "检测费漏写可补正，重评证据增加赔偿不属于补正",
        explanation: "区分书面遗漏与要求重新裁判实体争议。",
      },
      {
        text: "只要说裁决漏写，仲裁庭就可补上从未裁决的新请求",
        explanation: "已经裁决但漏写与根本未裁决不是同一情形。",
      },
    ],
    points: [
      {
        label: "已裁决但漏写可以补正",
        meaning: "结合已对检测费作出裁决、仅文书遗漏，明确可补正该项。",
        boundary: "不能把所有尚未裁决的请求一概说成可按此条补正。",
      },
      {
        label: "实体重评不属于补正",
        meaning:
          "说明6万元结论已完整裁明，重新评证据提高到10万元超出补正范围。",
        boundary: "不要求指出题干未提供事由的其他救济能否成功。",
      },
    ],
    sources: ["civpro-detail-correction-law"],
  },
];

const topicDrafts = [
  {
    id: "civpro-detail-estate-manager",
    chapterId: "CIVPRO-DETAIL-ESTATE-MANAGER",
    title: "指定与更换遗产管理人",
    headline: "对谁来管遗产有争议，可以请法院指定。",
    paragraphs: [
      "利害关系人可以向被继承人死亡时住所地或主要遗产所在地的基层法院申请。法院核实后，按有利于遗产管理的原则判决指定。",
      "原管理人无法继续履职，可以申请另行指定；违反职责并严重侵害继承人、受遗赠人或债权人权益的，可以申请撤销其资格并指定新人。",
    ],
    pitfall:
      "把指定管理人与分割遗产混在一起，或者认为一审终审就永远不能更换管理人。",
  },
  {
    id: "civpro-detail-ownerless-property",
    chapterId: "CIVPRO-DETAIL-OWNERLESS-PROPERTY",
    title: "认定财产无主",
    headline: "先公告寻找权利人，满一年无人认领再作判决。",
    paragraphs: [
      "申请交给财产所在地基层法院。法院核实并发出认领公告，满一年无人认领，才判决认定无主，收归国家或集体所有。",
      "判决后原所有人或继承人出现，在法定诉讼时效期间提出请求，法院核实后作新判决撤销原判决。",
    ],
    pitfall:
      "把一年认领公告记成普通送达的30日，或者把无主判决当成原权利人永远不能请求返还。",
  },
  {
    id: "civpro-detail-voter-qualification",
    chapterId: "CIVPRO-DETAIL-VOTER-QUALIFICATION",
    title: "选民资格诉讼",
    headline: "先向选举委员会申诉，仍有异议再及时起诉。",
    paragraphs: [
      "不服选举委员会对选民资格申诉的处理，可以在选举日五日以前向选区所在地基层法院起诉。",
      "由审判员组成合议庭，一审终审。必须在选举日前审结、送达判决，并让起诉人、选举委员会代表和有关公民参加审理。",
    ],
    pitfall:
      "从收到处理决定起套用普通15日上诉期限，或以案件繁忙为由拖到选举后再判。",
  },
  {
    id: "civpro-detail-coercive-measures",
    chapterId: "CIVPRO-DETAIL-COERCIVE-MEASURES",
    title: "妨害诉讼的强制措施",
    headline: "是否采取强制措施，由法院按法定条件决定。",
    paragraphs: [
      "必须到庭的被告，经两次传票传唤，无正当理由拒不到庭，可以拘传。拘传、罚款、拘留须经院长批准；拘传用拘传票，罚款、拘留用决定书。",
      "不服罚款、拘留决定，可以向上一级法院申请复议一次，复议不停止执行。单位拒绝协助执行，可被责令履行并罚款；对责任人员可罚款，仍不履行的可拘留。",
      "追索债务不能靠私自关人、扣财产。司法强制措施和私人讨债是两回事。",
    ],
    pitfall: "把拒不到庭直接当成犯罪，或认为提出复议就可以不执行拘留决定。",
  },
  {
    id: "civpro-detail-litigation-fees",
    chapterId: "CIVPRO-DETAIL-LITIGATION-FEES",
    title: "诉讼费用与司法救助",
    headline: "调解结案可以减半收费，困难当事人可以依法申请救助。",
    paragraphs: [
      "以法院调解方式结案，案件受理费减半；由谁负担先协商，协商不成由法院决定。减半不等于全部免费。",
      "缴费确有困难，可申请缓交、减交或免交。无其他收入的低保对象符合免交条件；应提交书面申请和经济困难证明，由法院审查。免交仅适用于自然人。",
    ],
    pitfall: "把调解成功理解成诉讼费用全免，或因为自己困难就不申请、不缴费。",
  },
  {
    id: "civpro-detail-arbitration-counterclaim",
    chapterId: "CIVPRO-DETAIL-ARBITRATION-COUNTERCLAIM",
    title: "仲裁反请求",
    headline: "反驳对方的请求，与要求对方另行给付，是不同的主张。",
    paragraphs: [
      "被申请人既可以答辩，也有权提出反请求。要求驳回货款请求是反驳；要求对方赔偿另一笔损失，应按适用规则提出反请求。",
      "反请求须符合仲裁协议和受理条件。具体期限与撤回后的处理要看适用规则；本组第二案明确采用贸仲2024规则，不把机构规则当作所有仲裁的统一条文。",
    ],
    pitfall:
      "以为被申请人只能防守，或者认为本请求一撤回，已经受理的反请求就自动消失。",
  },
  {
    id: "civpro-detail-award-correction",
    chapterId: "CIVPRO-DETAIL-AWARD-CORRECTION",
    title: "仲裁裁决补正",
    headline: "补正改笔误、算错和书面漏写，不重判实体争议。",
    paragraphs: [
      "对裁决书的文字、计算错误，或已经裁决却在文书中遗漏的事项，可以请求仲裁庭补正。当事人提出请求的期间是收到裁决书起30日。",
      "不能把“我觉得赔少了”包装成补正，要求重新认定责任和数额。“已经裁决但漏写”也不同于尚未作出裁决。",
    ],
    pitfall: "把一裁终局理解为笔误也不能改，或把补正当成一次实体上诉。",
  },
];

function pair(item: CaseDraft): UnitExercise[] {
  const common = {
    caseId: item.id,
    relatedTopicIds: [item.topicId],
    facts: item.facts,
    prompt: item.prompt,
    hint: "先回答本题所问，再结合案情说明理由。",
    reference: item.reference,
    sources: item.sources,
  };
  const criteria: Criterion[] = item.points.map((point, index) => ({
    id: `${item.id}-${index + 1}`,
    ...point,
    acceptable: "认可法律含义相同的自然表达，不要求固定句式或条号。",
  }));
  return [
    {
      ...common,
      id: `${item.id}-choice`,
      title: `${item.title}（单选）`,
      kind: "objective",
      choiceMode: "single",
      answer: item.answer,
      options: item.options.map((option, i) => ({
        id: ["a", "b", "c", "d"][i],
        ...option,
      })),
    },
    {
      ...common,
      id: `${item.id}-written`,
      title: `${item.title}（自由作答）`,
      kind: "subjective",
      answer: "",
      prompt: `${item.prompt}请结合案情说明理由。`,
      criteria,
    },
  ];
}
export const civilProcedureProceduralDetailsTopics: FaultTopic[] =
  topicDrafts.map((topic) => {
    const related = cases.filter((item) => item.topicId === topic.id);
    const first = related[0];
    return {
      id: topic.id,
      title: topic.title,
      headline: topic.headline,
      goal: first.prompt,
      prerequisite: "知道民事诉讼用于解决当事人之间的民事争议。",
      minutes: "约8分钟",
      paragraphs: topic.paragraphs,
      pitfall: topic.pitfall,
      recall: {
        prompt: "本组各类情形应分别怎样处理？",
        reference: topic.headline,
      },
      sources: [...new Set(related.flatMap((item) => item.sources))],
      example: {
        title: first.title,
        facts: first.facts,
        analysis: first.reference,
      },
      exercises: related.flatMap(pair),
    };
  });
export const civilProcedureProceduralDetailsChapters = topicDrafts.map(
  (topic) => ({
    id: topic.chapterId,
    title: topic.title,
    section: "民事诉讼法",
    topicIds: [topic.id],
  }),
);
export const civilProcedureProceduralDetailsExercises =
  civilProcedureProceduralDetailsTopics.flatMap((topic) => topic.exercises);
export const civilProcedureProceduralDetailsContentPack = {
  revision: civilProcedureProceduralDetailsRevision,
  snapshot: {
    topics: civilProcedureProceduralDetailsTopics,
    sources: civilProcedureProceduralDetailsSources,
  },
};
export const civilProcedureProceduralDetailsDefaultQueues = {
  objective: civilProcedureProceduralDetailsExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProcedureProceduralDetailsExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProcedureProceduralDetailsQuestion(id: string) {
  const question = civilProcedureProceduralDetailsExercises.find(
    (q) => q.id === id,
  );
  return question ? structuredClone(question) : undefined;
}
export function civilProcedureProceduralDetailsTopicForQuestion(id: string) {
  return civilProcedureProceduralDetailsTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilProcedureProceduralDetailsSameCaseQuestions(id: string) {
  const question = civilProcedureProceduralDetailsQuestion(id);
  return question
    ? structuredClone(
        civilProcedureProceduralDetailsExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilProcedureProceduralDetailsChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilProcedureProceduralDetailsChapters.find(
    (c) => c.id === chapterId,
  );
  return chapter
    ? civilProcedureProceduralDetailsTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
