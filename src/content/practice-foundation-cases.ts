import type { UnitExercise } from "./fault-unit";

// Fact-based foundation practice. Shared stems stay identical across the choice
// and writing versions. These are authored teaching cases, not official exams.
// New practice never expands the required exercise list of a legacy lesson.
export const practiceFoundationRevision = "practice-foundation-2026-09-14.v1";

const exhibitFacts =
  "会场撤场时，甲将沉重的展板装上推车，准备从短坡运入走廊。同伴指着走廊里来往的人提醒：‘先等他们过去，车滑下去会撞人。’甲朝走廊看了一眼，为赶离场时间，抽走车轮前的挡块，将车用力推出后松开扶手，转身去搬剩下的物品。推车沿坡滑入走廊，撞伤一名路人。";
const exhibitReference =
  "甲对路人受伤属于间接故意。同伴的明确提醒和甲的查看，支持其已经认识到撞人风险；他仍抽掉挡块、推出重车并松手离开，让车无人控制地滑入有人通行的走廊，支持其为赶进度而放任附带伤人。依据是这些事实的结合，不能只凭继续搬运就认定故意，也不能自行补出甲依赖某种条件避免撞人。";
const slopeFacts =
  "甲准备将装满器材的滑车推下坡道。同伴指着坡下的人说：‘满车会冲下去碰人，先卸一些。’甲以前曾在平地拉停半载的滑车，答道：‘半车我一拉就停，这车我也拉得住。’他抓紧手柄随车下坡。车速越来越快，甲双手后拉仍未能停住，滑车撞伤行人。";
const slopeReference =
  "甲对撞伤行人属于过于自信的过失。同伴指出坡下的人和失控风险，甲也明确回应，说明其已预见撞人。他却把平地拉停半载车的经验用于满载下坡，并抓住手柄试图控制，支持其轻信自身力量能避免受伤。关键是错误依赖的具体经验及其失据之处，不能仅凭继续搬运认定放任。";
const inspectionFacts =
  "甲负责开放活动区，受训时学过每天开放前须逐段推拉护栏、检查固定销。当日一段护栏的固定销掉在立柱旁，轻推便会晃动。甲忙着领取入场票，提前在检查表上签名，未走近护栏便开放入口。行人乙扶栏时跌倒受伤，甲赶来按住护栏，才发现立柱旁的固定销。";
const inspectionReference =
  "甲对乙跌伤属于疏忽大意的过失。逐段检查是其职责，他也接受过相应培训；固定销外露、轻推即晃，说明危险在当时能够发现。甲忙于领票而未检查，直到事故后才发现固定销，支持其本应且能够预见，却因疏忽没有预见。不能只凭已经跌伤倒推过失，也不能因实际没想到就认定意外事件。";
const hiddenFacts =
  "甲按规程检查搬运车，制动试验、低速试行均正常，随后按规定速度和载重运货。车内转向销突然断裂，车辆偏转撞伤乙。拆检发现销轴内部有细小气孔，只有切开销轴才能查出，常规检修及当日试行均未显露异常。录像与鉴定显示，从销轴断裂到碰撞的间隔小于该车紧急制动所需时间。";
const hiddenReference =
  "依题设，甲对本次伤人无故意或过失，属于意外事件。按规程检查、试行及正常使用，支持其已履行有关注意要求；气孔只有切开销轴才能发现，说明合理的使用前检查无法识别本次风险。异常发生到碰撞又短于紧急制动所需时间，不是发现后仍有机会制止却置之不理。完成检查本身并不当然免责，结论还依赖缺陷性质和当时的具体条件。";
const turntableFacts =
  "现场录像中，乙指着展台外沿提醒甲：‘启动转台会碰到旁边的人。’甲看向站在边上的丙，回答‘看到了’，随后按下启动键。转台碰伤丙。录像只拍到操作区，转台周围的防护设施不在画面内。";
const turntableReference =
  "提醒、查看和回应表明甲已认识到碰人的风险，但据此还不能确定是放任还是轻信避免。应核实甲当时依赖什么防护或控制条件、了解其效能的依据，以及操作前后的相关言行。若这些事实支持接受伤人，指向间接故意；若支持错误依赖某种避免条件，指向过于自信的过失。不能把录像没拍到防护设施当作现场没有设施，也不能替甲补出某种信心。";

export const practiceFoundationCases: {
  topicId: "intent" | "confidence" | "negligence" | "accident";
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: "intent",
    replaces: "intent-tolerate-choice",
    exercise: {
      id: "intent-tolerate-choice-v2",
      kind: "objective",
      optional: true,
      title: "撤场的推车",
      facts: exhibitFacts,
      prompt: "甲对路人受伤的罪过属于哪一种？",
      options: [
        {
          id: "a",
          text: "直接故意。",
          explanation:
            "甲在赶搬运进度，案情没有显示伤人是其追求的结果；主动推车不等于主动追求伤人。",
        },
        {
          id: "b",
          text: "间接故意。",
          explanation:
            "甲被提醒并看见通行的人，仍让重车脱离控制滑入走廊；结合其离开的行为，可以判断对伤人结果的放任。",
        },
        {
          id: "c",
          text: "过于自信的过失。",
          explanation:
            "甲主动撤去挡块、松手并离开，未显示其依赖何种条件控制车辆、避免撞人；不能自行补入这样的事实。",
        },
      ],
      answer: "b",
      hint: "提醒和查看说明什么？抽走挡块、松手离开又说明什么？",
      reference: exhibitReference,
      sources: ["law"],
    },
  },
  {
    topicId: "intent",
    replaces: "intent-possible",
    exercise: {
      id: "intent-possible-v2",
      kind: "objective",
      optional: true,
      title: "检修平台",
      facts:
        "甲与乙争执后，将乙引到离地一米多的检修平台上。乙走到边缘时，甲突然拉开一侧支撑。乙抓住护栏没有掉下，甲见状又绕到另一侧猛拉支撑，乙这次跌落，腿部骨折。",
      prompt: "关于甲对乙摔伤的罪过，下列判断正确的是：",
      options: [
        {
          id: "a",
          text: "间接故意，因为第一次操作并没有使乙摔下。",
          explanation:
            "第一次未成功，不能说明甲只容忍而不追求伤害；再次针对支撑动手恰好需要纳入判断。",
        },
        {
          id: "b",
          text: "过于自信的过失，因为护栏曾经挡住乙。",
          explanation: "甲在乙抓稳后再次拉动支撑，并非依赖护栏来避免乙受伤。",
        },
        {
          id: "c",
          text: "直接故意，甲连续针对平台支撑动手以使乙跌落受伤。",
          explanation:
            "先争执、引到平台边缘，再于乙站稳后继续拉动另一侧支撑，支持其追求摔伤；不以每次动作一定成功为条件。",
        },
      ],
      answer: "c",
      hint: "第一次没有摔下以后，甲接着做了什么？",
      reference:
        "甲对乙摔伤属于直接故意。引乙到高处边缘、第一次拉开支撑未得逞后再次猛拉，连贯地显示其追求乙跌落受伤。结果是否必然出现，与行为人是否希望结果出现是不同判断；第一次没有成功不改变这一态度。这里只分析罪过，具体犯罪另须审查其他条件。",
      sources: ["law"],
    },
  },
  {
    topicId: "intent",
    replaces: "intent-tolerate",
    exercise: {
      id: "intent-tolerate-v2",
      kind: "subjective",
      optional: true,
      title: "撤场的推车：说明理由",
      facts: exhibitFacts,
      prompt: "甲对路人受伤是什么罪过？请结合案情说明理由。",
      hint: "把他接收到的危险信息，与之后如何处理推车联系起来。",
      reference: exhibitReference,
      criteria: [
        {
          id: "awareness",
          label: "已经认识到撞人风险",
          meaning:
            "同伴指出走廊有人及推车伤人的危险，甲又朝走廊查看，支持实际预见。",
          acceptable:
            "用提醒、查看中的具体事实说明甲知道可能撞人；不要求照抄原句。",
          boundary:
            "只有赶时间不能证明风险认识；不能改写成甲完全没看到走廊的人。",
        },
        {
          id: "attitude",
          label: "行为支持放任伤人",
          meaning:
            "抽掉挡块、推出重车后松手离开，使车无人控制地进入有人通行的走廊，支持其放任伤人。",
          acceptable:
            "联系整段行为说明把伤人风险置于搬运进度之后，而非仅复述放任一词。",
          boundary:
            "不能仅凭继续搬运自动认定放任，也不能虚构甲会及时刹车或相信行人会躲开。",
        },
        {
          id: "conclusion",
          label: "事实与罪过结论相连",
          meaning:
            "将实际预见、放任伤人与间接故意相连，区别于追求伤人和轻信避免。",
          acceptable:
            "用日常语言清楚表达已知风险而容忍结果，也可以构成实质正确的论证。",
          boundary:
            "只写术语没有说明事实属于理由不足；不凭这一个结论直接判定具体罪名。",
        },
      ],
      sources: ["law"],
    },
  },
  {
    topicId: "confidence",
    replaces: "confidence-skill",
    exercise: {
      id: "confidence-skill-v2",
      kind: "objective",
      optional: true,
      title: "满载滑车下坡",
      facts: slopeFacts,
      prompt: "甲对行人受伤的罪过属于哪一种？",
      options: [
        {
          id: "a",
          text: "过于自信的过失。",
          explanation:
            "甲收到明确提醒，却套用平地半载车的经验，并抓柄试图控制满载下坡的车，支持其轻信能够避免。",
        },
        {
          id: "b",
          text: "间接故意。",
          explanation:
            "不能省略甲所依赖的旧经验与控制动作，仅凭收到提醒还继续搬运就判断放任。",
        },
        {
          id: "c",
          text: "疏忽大意的过失。",
          explanation:
            "甲对伤人提醒作出了直接回应，其问题在于误判控制能力，并非没有预见撞人风险。",
        },
      ],
      answer: "a",
      hint: "过去成功拉停滑车的条件，与本次一样吗？",
      reference: slopeReference,
      sources: ["law"],
    },
  },
  {
    topicId: "confidence",
    replaces: "confidence-skill-reason",
    exercise: {
      id: "confidence-skill-reason-v2",
      kind: "subjective",
      optional: true,
      title: "满载滑车：说明理由",
      facts: slopeFacts,
      prompt: "甲对行人受伤是什么罪过？请说明你的案情依据。",
      hint: "比较提醒、甲的回应，以及他援引的经验与本次条件。",
      reference: slopeReference,
      criteria: [
        {
          id: "foresight",
          label: "已经预见撞人风险",
          meaning:
            "同伴指着坡下的人作出警告，甲直接回应自己拉得住，支持实际预见伤人。",
          acceptable: "从提醒和回应说明甲意识到了撞人的可能。",
          boundary: "不能因最后拉不住，就说甲此前完全没有预见。",
        },
        {
          id: "avoidance",
          label: "错误依赖具体经验",
          meaning:
            "甲依赖平地拉停半载车的经验，并抓住手柄控制；满载和坡道使该经验不足以保证安全。",
          acceptable: "说明旧经验与本次重量、坡度不符，从而支持轻信避免。",
          boundary:
            "只说他做了控制动作，还没有说明何以认定轻信；不能把经验说成客观可靠的保证。",
        },
        {
          id: "conclusion",
          label: "过于自信的过失",
          meaning: "根据实际预见和错误依赖，判断其轻信避免而非接受伤人。",
          acceptable: "论证含义清楚即可，术语和表达规范另外反馈。",
          boundary:
            "不把过于自信与疏忽未预见混同；不直接由此确定具体罪名成立。",
        },
      ],
      sources: ["law"],
    },
  },
  {
    topicId: "confidence",
    replaces: "focus-result",
    exercise: {
      id: "focus-result-v2",
      kind: "objective",
      optional: true,
      title: "广告牌倒下之前",
      facts:
        "丙为报复店方，拆下广告牌的固定件，准备将牌子弄坏。他看到管理员站在牌子旁，大声喊：‘快离开，牌子要倒！’管理员回头看了一眼。丙对同伴说：‘他听见了，走两步就过去了。’随即拉下最后一个固定件。管理员正在收拾地上的工具，尚未离开就被倒下的广告牌砸伤。",
      prompt: "只评价丙对管理员受伤的罪过，下列判断正确的是：",
      options: [
        {
          id: "a",
          text: "直接故意，因为丙有意拆掉广告牌。",
          explanation:
            "故意毁坏广告牌不能直接转成对管理员受伤的故意，需要分别评价结果。",
        },
        {
          id: "b",
          text: "过于自信的过失，因为丙误把回头和喊话当作及时离开的保证。",
          explanation:
            "喊话表明其认识伤人风险；回应中的判断和立即拆件显示其轻信管理员会及时躲开。",
        },
        {
          id: "c",
          text: "意外事件，因为丙已经向管理员喊话。",
          explanation:
            "管理员尚在危险位置，丙未等待就拆下固定件，不能用已经喊话排除该误判中的过失。",
        },
      ],
      answer: "b",
      hint: "不要把对牌子损坏的目的，直接移到对管理员受伤的判断上。",
      reference:
        "丙对管理员受伤属于过于自信的过失。他已通过喊话显露对伤人危险的认识，却从管理员回头就判断其会及时离开，没有等待而拆下最后固定件。这个具体误判支持轻信避免；其毁坏广告牌的目的不能代替对伤人结果的分析。",
      sources: ["law"],
    },
  },
  {
    topicId: "confidence",
    replaces: "confidence-contrast",
    exercise: {
      id: "confidence-contrast-v2",
      kind: "subjective",
      optional: true,
      title: "两种搬架方式",
      facts:
        "甲移动装满器材的高货架，已听到旁边乙喊‘架子在晃，会压到我’。分别考虑两种情形：一，同伴提出先用支架固定，甲踢开支架，拖动货架后撒手走开。二，甲曾独自扶稳同一货架的空架，便对同伴说‘上次我一只手就扶住了’，一边托架一边移动，但这次装满器材，甲没能扶住。两种情形中，乙均被倒下的货架压伤。",
      prompt: "两种情形中，甲对乙受伤的罪过有何不同？请结合他的言行说明。",
      hint: "共同的风险提醒之外，两段里甲的做法和具体依赖有什么区别？",
      reference:
        "两种情形均有乙的明确风险提醒。情形一，甲排除现成支撑，拖动后又撒手离开，让晃动的满载货架脱离控制，支持其放任压伤，属于间接故意。情形二，甲援引空架经验并托扶货架，却忽略本次器材重量，支持其轻信可以避免，属于过于自信的过失。不能仅因两者都继续搬架就认定罪过相同。",
      criteria: [
        {
          id: "shared",
          label: "共同的危险认识",
          meaning:
            "两种情形都以甲已经听到乙对晃动、压伤的明确提醒为前提，支持实际预见。",
          acceptable: "指出两者都已得知压伤风险，不能把第二种说成未预见。",
          boundary: "受伤结果相同不能单独证明认识相同，要回到此前的提醒。",
        },
        {
          id: "contrast",
          label: "不同言行支持不同态度",
          meaning:
            "一中踢开支撑后脱手离开支持放任；二中援引空架经验并托扶，支持错误依赖避免条件。",
          acceptable:
            "把两段具体行为和经验差别用于论证，而不只罗列两个心理术语。",
          boundary:
            "单独看到踢开、扶架某一动作都不能机械定性，须结合警告、条件及完整行为。",
        },
        {
          id: "conclusions",
          label: "分别判断罪过",
          meaning:
            "情形一为间接故意，情形二为过于自信的过失；区别在结果态度，不是有无预见。",
          acceptable: "可用通俗语言说明一是容忍伤害、一是错误相信控制有效。",
          boundary: "只判断一种不算完整，但不将正确的部分一并否定。",
        },
      ],
      sources: ["law"],
    },
  },
  {
    topicId: "confidence",
    replaces: "reasoning-unknown",
    exercise: {
      id: "reasoning-unknown-v2",
      kind: "objective",
      optional: true,
      title: "展台启动",
      facts: turntableFacts,
      prompt: "根据这段录像，哪项判断最恰当？",
      options: [
        {
          id: "a",
          text: "甲回应后仍然启动，已经足以认定间接故意。",
          explanation:
            "回应及启动说明已知风险后继续操作，但还不能排除甲依赖某种条件避免伤人的可能。",
        },
        {
          id: "b",
          text: "没有拍到甲希望丙受伤，应认定为过于自信的过失。",
          explanation:
            "没有拍到希望伤人，既不等于排除了放任，也没有证明其依赖什么避免伤人。",
        },
        {
          id: "c",
          text: "已能说明甲预见风险，尚不足以区分放任与轻信避免。",
          explanation:
            "缺少防护、控制条件及甲对此的认识，不能从现有画面补出确定的结果态度。",
        },
      ],
      answer: "c",
      hint: "录像记录了什么，又没有记录什么？",
      reference: turntableReference,
      sources: ["law"],
    },
  },
  {
    topicId: "confidence",
    replaces: "reasoning-evidence",
    exercise: {
      id: "reasoning-evidence-v2",
      kind: "subjective",
      optional: true,
      title: "展台录像：说明依据",
      facts: turntableFacts,
      prompt: "能否据此确定甲对丙受伤的罪过？请说明已有依据和还需核实的事实。",
      hint: "区分已经能说明的风险认识，与尚不能说明的结果态度。",
      reference: turntableReference,
      criteria: [
        {
          id: "known",
          label: "现有画面支持实际预见",
          meaning: "乙的警告、甲的查看和回应支持甲已经认识到碰人的风险。",
          acceptable: "从一组连贯事实说明已知危险，不要求照抄全部动作。",
          boundary: "不能说甲没有预见，也不能直接用继续启动证明接受伤人。",
        },
        {
          id: "missing",
          label: "说明需要核实的事实",
          meaning:
            "需要了解实际防护与控制条件、甲是否认识并依赖其效能、当时相关言行，以判断结果态度。",
          acceptable:
            "提出与接受伤人或相信能避免有关的具体核实方向；不要求逐项列全。",
          boundary: "只说再调查不够具体；画面外未拍到，不等于现场不存在。",
        },
        {
          id: "limited-conclusion",
          label: "不超出证据范围定性",
          meaning:
            "目前不能确定放任还是轻信避免，应保留判断；补充事实的不同可能改变罪过结论。",
          acceptable:
            "说明为何暂不能确定，并保留条件；不强制编写两套假设案例。",
          boundary:
            "不能将自行假设的防护设施或信心当作已查明事实，也不能因为材料不足就直接认定无罪过。",
        },
      ],
      sources: ["law"],
    },
  },
  {
    topicId: "negligence",
    replaces: "negligence-inspection",
    exercise: {
      id: "negligence-inspection-v2",
      kind: "objective",
      optional: true,
      title: "开放前的护栏",
      facts: inspectionFacts,
      prompt: "甲对乙跌伤的罪过属于哪一种？",
      options: [
        {
          id: "a",
          text: "过于自信的过失。",
          explanation:
            "培训说明有相应能力，不能据此认定本次实际预见；题中甲未走近检查，事故后才发现脱落固定销。",
        },
        {
          id: "b",
          text: "意外事件。",
          explanation:
            "固定销在外、轻推即晃，规定的检查能够发现危险，不能将未发现等同于无法发现。",
        },
        {
          id: "c",
          text: "疏忽大意的过失。",
          explanation:
            "甲有受训和检查职责，现场缺陷也可发现，却忙于领票而漏查，直到事故后才发现危险。",
        },
      ],
      answer: "c",
      hint: "如果甲做了规定的检查，当时能发现什么？",
      reference: inspectionReference,
      sources: ["law"],
    },
  },
  {
    topicId: "negligence",
    replaces: "negligence-inspection-reason",
    exercise: {
      id: "negligence-inspection-reason-v2",
      kind: "subjective",
      optional: true,
      title: "护栏检查：说明理由",
      facts: inspectionFacts,
      prompt: "甲对行人跌伤是否有过失？请结合检查要求和现场情况说明。",
      hint: "说明他为什么应当、能够发现危险，以及本次没有发现的原因。",
      reference: inspectionReference,
      criteria: [
        {
          id: "duty-capacity",
          label: "应当且能够发现危险",
          meaning:
            "检查职责和培训支持预见义务与能力；掉落固定销和轻推晃动说明有现实发现条件。",
          acceptable: "将职责、受训能力与可见或可检查的具体缺陷联系起来。",
          boundary: "只说负责人应负责，或只从跌伤结果倒推过失，缺少事实依据。",
        },
        {
          id: "failure-to-foresee",
          label: "遗漏检查导致未预见",
          meaning:
            "甲忙于领票、提前签表，未走近护栏便开放，直到事故后才发现固定销，支持因疏忽未预见。",
          acceptable: "指出实际检查被省略及其与未发现危险的联系。",
          boundary: "不能自行补成甲已经看到固定销掉落，只是相信护栏仍能用。",
        },
        {
          id: "conclusion",
          label: "疏忽大意的过失",
          meaning:
            "将本可预见、漏查而未预见与疏忽大意过失相连，区别不能预见的意外。",
          acceptable:
            "说明这不是无法发现的风险，也不是已经认识后轻信控制得住。",
          boundary: "只给结论未说理由不算完整，不直接由此确定具体过失罪名。",
        },
      ],
      sources: ["law"],
    },
  },
  {
    topicId: "accident",
    replaces: "accident-hidden",
    exercise: {
      id: "accident-hidden-v2",
      kind: "objective",
      optional: true,
      title: "转向销断裂",
      facts: hiddenFacts,
      prompt: "关于甲对本次伤人的罪过，下列判断正确的是：",
      options: [
        {
          id: "a",
          text: "根据检查、缺陷及制动条件，本次伤人对甲属于意外事件。",
          explanation:
            "正常检修和使用未显露缺陷，气孔须切开才能发现，事发后的时间又不足以制止，这些事实共同支持无相关罪过。",
        },
        {
          id: "b",
          text: "甲使用存在气孔的车辆，说明检查存在疏忽。",
          explanation:
            "不能把拆开后才发现的内部缺陷，倒推成使用前合理检查一定能够发现。",
        },
        {
          id: "c",
          text: "甲检查后仍继续使用车辆，说明轻信可以避免事故。",
          explanation:
            "本题检修和试行没有出现危险信号，没有甲事前已经预见本次风险的依据。",
        },
      ],
      answer: "a",
      hint: "事后拆检发现的问题，当时的合理检查能否发现？",
      reference: hiddenReference,
      sources: ["law"],
    },
  },
  {
    topicId: "accident",
    replaces: "accident-hidden-reason",
    exercise: {
      id: "accident-hidden-reason-v2",
      kind: "subjective",
      optional: true,
      title: "转向销断裂：说明理由",
      facts: hiddenFacts,
      prompt: "甲已经检查过车辆，是否就足以排除过失？请结合本案说明判断依据。",
      hint: "不要停在检查过三个字，继续看缺陷如何发现、车辆如何使用和事发时的条件。",
      reference: hiddenReference,
      criteria: [
        {
          id: "unforeseeability",
          label: "具体缺陷超出合理检查范围",
          meaning:
            "检修与试行正常，销轴气孔只有切开才能发现，支持当时无从预见本次偏转风险。",
          acceptable:
            "对照事前检查条件与事后拆检方式，说明不能从事后发现反推事前可知。",
          boundary: "仅说是机械故障或本人没想到，不足以说明不能预见。",
        },
        {
          id: "no-fault",
          label: "结合使用和处置条件",
          meaning:
            "甲按规定速度、载重使用车辆；断裂到碰撞小于紧急制动所需时间，没有相关违规或现实制止机会。",
          acceptable: "用正常使用和事故时的时间条件说明本次对甲无相关过错。",
          boundary:
            "不因最后拦不住便忽略事前行为；也不自行添加甲超载或接到故障警告。",
        },
        {
          id: "limited-conclusion",
          label: "结论限于本案条件",
          meaning:
            "检查过本身不足以免责；结合缺陷性质与具体使用条件，本案属于意外事件，甲无故意或过失。",
          acceptable: "否定检查过就当然免责，并给出与本案事实相连的罪过结论。",
          boundary:
            "不将所有机械故障一概归为意外；有依据的非标准措辞不因未命中术语而被否定。",
        },
      ],
      sources: ["law"],
    },
  },
];
