import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilInheritanceRevision = "civil-inheritance-2026-10-24.v1";

export const civilInheritanceSources: ContentSources = {
  "civil-inheritance-code-opening": {
    title: "《民法典》第1121、1122条：继承开始与遗产",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文，页面标记有效。本人健在且没有宣告死亡，继承尚未开始；只问能否以继承身份提前分其财产，不评价授权代理、监护、扶养或自愿赠与。",
  },
  "civil-inheritance-i-opening": {
    title: "继承编解释（一）第1条：死亡与继承开始",
    url: "https://www.court.gov.cn/fabu/xiangqing/282091.html",
    note: "2026-10-24直接核读官方正文。法释〔2020〕23号，2020-12-25通过，2020-12-29公布，2021-01-01施行；最高人民法院正式正文。核读生理死亡、宣告死亡及相应开始时间。本案不涉及死亡推定、同一事件难定死亡先后或宣告死亡程序。",
  },
  "civil-inheritance-code-estate": {
    title: "《民法典》第1063、1122、1153条：婚前个人财产与共同财产先析出",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文，页面标记有效。80万元明确属于夫妻共同财产，无另外约定，应先析出配偶40万元；另18万元由婚前已有、婚后单独保存且无改变归属约定的事实支持个人财产性质，已补核第1063条。只问遗产范围58万元，不把配偶原有财产当作遗产，不问最终各继承人所得或债务清偿。",
  },
  "civil-inheritance-code-acceptance": {
    title: "《民法典》第1124条：继承人的沉默与受遗赠人的六十日",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文，页面标记有效。两案分别测试：继承人没有放弃表示视为接受；法定继承人以外的朋友知道受遗赠后超过60日完全没有表示，视为放弃。时间远离届满边缘，不考节假日或期间算法争议。",
  },
  "civil-inheritance-i-renunciation": {
    title: "继承编解释（一）第33—35条：放弃继承的一般表示方式与时间",
    url: "https://www.court.gov.cn/fabu/xiangqing/282091.html",
    note: "2026-10-24直接核读官方正文。法释〔2020〕23号，2020-12-25通过，2020-12-29公布，2021-01-01施行；最高人民法院正式正文。作为知识讲解依据：通常应在继承开始后、遗产处理前，以书面形式向遗产管理人或其他继承人表示。核读第34条诉讼中口头表示须记笔录并签名，不把未公证当作无效。两案不另考书面放弃是否有效、反悔或法定义务限制。",
  },
  "civil-inheritance-code-legacy-identity": {
    title: "《民法典》第1133条第3款：法定继承人以外个人受遗赠",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文，页面标记有效。朋友与死者无亲属关系，遗嘱效力和受遗赠安排已限定无争议；仅用以明确其受遗赠人身份，不考遗嘱形式、变更、见证人、必留份或遗赠扶养协议。",
  },
  "civil-inheritance-code-order": {
    title: "《民法典》第1126、1127条：法定继承顺序与亲属范围",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文，页面标记有效。第一案有愿意继承且资格无争议的配偶、女儿、父亲，弟弟不与其作为同顺序继承。第二案无第一顺序，同母异父姐姐和外祖父属于第二顺序，叔父不在该范围。只问按法定顺序继承资格，不计算均分或扶养调整。",
  },
  "civil-inheritance-code-representation": {
    title: "《民法典》第1127、1128条：代位关系与所承接的份额",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文，页面标记有效。子女先死亡，由其直系晚辈血亲代位；兄弟姐妹先死亡，由其子女代位。两案明确先后死亡、其他在世继承人，均非继承开始后死亡。第二案只认一般承接被代位人一支份额，不机械给出每人固定比例。",
  },
  "civil-inheritance-i-descendants": {
    title: "继承编解释（一）第14条：子女一支的直系晚辈范围",
    url: "https://www.court.gov.cn/fabu/xiangqing/282091.html",
    note: "2026-10-24直接核读官方正文。法释〔2020〕23号，2020-12-25通过，2020-12-29公布，2021-01-01施行；最高人民法院正式正文。讲解核对子女一支的孙子女、外孙子女、曾孙子女等不受辈数限制；本案实际只考孙女，不宣称测试全部辈数或收养关系。该条不把配偶列为代位继承人，也不把兄弟姐妹所有晚辈当然扩入。",
  },
  "civil-inheritance-code-spouse-boundary": {
    title: "《民法典》第1128、1129条：子女配偶不因婚姻关系代位",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文，页面标记有效。儿媳不是死者子女的直系晚辈血亲。另核1129条以区别丧偶儿媳尽主要赡养义务时可能独立取得的第一顺序资格；本题只问能否以先死儿子的配偶身份代位，且没有其扶养、照料或依赖事实，不考该独立资格。",
  },
  "civil-inheritance-will1134": {
    title: "《民法典》第1134、1136、1140条：自书与打印遗嘱形式",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。只判断两类遗嘱的形式。自书案本人亲笔全文、签名及年月日齐全，不能加公证或见证要求；打印案两页只在末页签署，见证人资格、在场和意思真实无争议，集中检查每页签名日期，不考法官对手印、骑缝签等替代方式的个案判断。",
  },
  "civil-inheritance-will1142": {
    title: "《民法典》第1142条：数份遗嘱抵触与最后遗嘱",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。两份遗嘱均在2026年依法订立、处分同一项个人存款且内容抵触；只问先公证后自书时的适用，不用旧《继承法》的公证优先规则，不处理真假、能力或第三份遗嘱。",
  },
  "civil-inheritance-necessary1141": {
    title: "《民法典》第1141条：为特定继承人保留必要份额",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。双重要件是遗嘱生效时缺乏劳动能力且没有生活来源；不能只因成年就排除，也不把全体继承人固定保留相同比例。本案无争议资料确定成年子女持续无劳动能力且无生活来源，不让模型作医学鉴定。",
  },
  "civil-inheritance-interpretation25": {
    title: "继承编解释（一）第25条：必留份的时间与剩余遗产",
    url: "https://www.court.gov.cn/fabu/xiangqing/282091.html",
    note: "2026-10-24直接核读官方原文。继承编解释（一），法释〔2020〕23号，2020-12-30发布、2021-01-01施行；最高法正式全文。直接读取正式正文第25条及后续段落。应按遗嘱生效时的具体情况确定；先留必要遗产，剩余参照遗嘱原则处理。本题不计算金额，也不把缺留份扩成整份遗嘱一概无效。",
  },
  "civil-inheritance-transfer1152": {
    title: "《民法典》第1128、1152条：先后死亡与转继承",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。直接比较先于被继承人死亡的代位与继承开始后、分割前死亡且未放弃的转继承。两案死亡日期均明确、没有遗嘱另作安排，不考同一事故死亡先后推定，也不计算各继承人的最终份额。",
  },
  "civil-inheritance-renunciation1124": {
    title: "《民法典》第1124条：继承开始后的书面放弃",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。放弃案在继承开始后、分割前书面表示，未领取、处分遗产，也无因放弃不能履行法定义务等情形。只判断已经放弃的份额是否还能进入后续转继承，不考反悔或对外负债。",
  },
  "civil-inheritance-renunciation33": {
    title: "继承编解释（一）第32—37条：放弃方式、时点与效力",
    url: "https://www.court.gov.cn/fabu/xiangqing/282091.html",
    note: "2026-10-24直接核读官方原文。继承编解释（一），法释〔2020〕23号，2020-12-30发布、2021-01-01施行；最高法正式全文。正式正文第32—37条已直接读取。书面向遗产管理人或其他继承人表示，效力追溯继承开始；不把生前口头约定当已完成放弃。本案未领取处分，也不争反悔。",
  },
  "civil-inheritance-debt1161": {
    title: "《民法典》第1161条：以所得遗产实际价值清偿",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。仅死者个人依法成立借款；成年子女未共同借款、未保证、无个人承诺或自愿超额偿还，所取得遗产实际价值6万元已核定，债务10万元，未设其他个人偿债基础。清偿限额不等于债权完全消失，也不把所有子女都说成必不承担任何债务。",
  },
  "civil-inheritance-legacy1162": {
    title: "《民法典》第1159、1162条：清偿税债优先于执行遗赠",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。有效遗赠已在知情后及时接受，但执行不得妨碍清偿死者依法税债。只一项个人普通债务7万元，个人遗产净值10万元，无必留份、担保、共同财产或其他优先费用争议；遗赠指定现金6万元，不足部分不额外向继承人个人索取。",
  },
};

export const civilInheritanceTopics: FaultTopic[] = [
  {
    id: "civil-inheritance-estate",
    title: "继承开始与遗产范围",
    headline: "继承从死亡时开始；先分清哪些财产属于死者，再讨论继承。",
    goal: "这时继承是否已经开始？许明能否仅以将来可能继承为由，要求按遗产分割这笔钱？",
    prerequisite: "能核对死亡先后、亲属关系、财产归属及当事人的表示。",
    minutes: "6–10",
    paragraphs: [
      "继承从被继承人死亡时开始。本人尚健在，仅因住院、年长或家人预计将来继承，不能提前按继承分割其现有财产；本人依法作出的其他财产处分另当别论。",
      "遗产是死者死亡时遗留的个人合法财产。夫妻共同财产无另外约定时，应先把其中一半分给在世配偶，再把死者的一半及其个人财产列入遗产；家庭共有财产也须先分出他人的部分。",
    ],
    example: {
      title: "住院时提出的分产要求",
      facts:
        "本案为原创教学虚构，案情发生于2026年。2026年9月15日，许达正在医院接受治疗，仍然健在，也没有被法院宣告死亡。他名下有一笔只归本人所有的存款。儿子许明以“以后我也会继承”为由，要求立即把这笔钱的一部分按遗产转到自己名下。许达没有作出赠与、转让或授权分配的意思表示。",
      analysis:
        "继承尚未开始，许明不能仅凭将来可能继承就要求分割。许达仍健在，也没有宣告死亡；住院不等于继承已经开始，这笔钱目前仍是许达的财产。",
    },
    pitfall: "把住院当成继承开始，或把死者账户里保管的全部共同款项都当作遗产。",
    recall: {
      prompt:
        "这时继承是否已经开始？许明能否仅以将来可能继承为由，要求按遗产分割这笔钱？",
      reference: "继承从死亡时开始；先分清哪些财产属于死者，再讨论继承。",
    },
    sources: [
      "civil-inheritance-code-opening",
      "civil-inheritance-i-opening",
      "civil-inheritance-code-estate",
    ],
    exercises: [
      {
        caseId: "civil-inheritance-living-owner-no-opening",
        relatedTopicIds: ["civil-inheritance-estate"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。2026年9月15日，许达正在医院接受治疗，仍然健在，也没有被法院宣告死亡。他名下有一笔只归本人所有的存款。儿子许明以“以后我也会继承”为由，要求立即把这笔钱的一部分按遗产转到自己名下。许达没有作出赠与、转让或授权分配的意思表示。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "继承尚未开始，许明不能仅凭将来可能继承就要求分割。许达仍健在，也没有宣告死亡；住院不等于继承已经开始，这笔钱目前仍是许达的财产。",
        sources: [
          "civil-inheritance-code-opening",
          "civil-inheritance-i-opening",
        ],
        id: "civil-inheritance-living-owner-no-opening-choice",
        kind: "objective",
        choiceMode: "single",
        title: "住院时提出的分产要求：选择判断",
        prompt:
          "这时继承是否已经开始？许明能否仅以将来可能继承为由，要求按遗产分割这笔钱？",
        options: [
          {
            id: "a",
            text: "尚未开始，不能仅凭将来可能继承要求分割",
            explanation:
              "第1121条以死亡为继承开始的时间，住院本身不满足这一条件。",
          },
          {
            id: "b",
            text: "已经开始，只要住院治疗就可以先分遗产",
            explanation: "住院与死亡不是同一事实。",
          },
          {
            id: "c",
            text: "尚未开始，但子女一提出要求就自动取得存款的一半",
            explanation: "将来可能继承不产生当前的自动分产权。",
          },
          {
            id: "d",
            text: "已经开始，因为子女的继承一定早于父母处分财产",
            explanation: "继承的开始时间不能由亲属身份或未来期待提前。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-inheritance-living-owner-no-opening",
        relatedTopicIds: ["civil-inheritance-estate"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。2026年9月15日，许达正在医院接受治疗，仍然健在，也没有被法院宣告死亡。他名下有一笔只归本人所有的存款。儿子许明以“以后我也会继承”为由，要求立即把这笔钱的一部分按遗产转到自己名下。许达没有作出赠与、转让或授权分配的意思表示。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "继承尚未开始，许明不能仅凭将来可能继承就要求分割。许达仍健在，也没有宣告死亡；住院不等于继承已经开始，这笔钱目前仍是许达的财产。",
        sources: [
          "civil-inheritance-code-opening",
          "civil-inheritance-i-opening",
        ],
        id: "civil-inheritance-living-owner-no-opening-written",
        kind: "subjective",
        title: "住院时提出的分产要求：写出分析",
        prompt:
          "这时继承是否已经开始？许明能否仅以将来可能继承为由，要求按遗产分割这笔钱？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-inheritance-living-no-opening",
            label: "本人健在，继承尚未开始",
            meaning:
              "联系许达仍健在、未被宣告死亡，说明继承未开始，许明不能只以未来继承资格分割现有财产。",
            acceptable:
              "说明人还在，尚不是遗产，不能因为以后可能继承就现在分走即可；接受等义表达。",
            boundary:
              "不要求判断病情、计算将来份额，或讨论监护、授权代理和自愿赠与的成立条件。",
          },
        ],
      },
      {
        caseId: "civil-inheritance-marital-fund-estate-scope",
        relatedTopicIds: ["civil-inheritance-estate"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。周远于2026年9月12日死亡。清点时，他名下账户有80万元，流水和各方确认表明这是他与妻子陈禾的夫妻共同财产，夫妻没有另外的财产约定。周远另有在结婚前已经归其所有、婚后一直单独保存的存款18万元，来源和金额均可查清，夫妻没有改变该款归属的约定。这里没有其他人的财产份额。女儿周蓉认为，只要账户在父亲名下，两笔合计98万元就应全部列为父亲的遗产。本题只问遗产范围。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "列入遗产的是58万元。先从80万元共同款项中分出40万元归陈禾所有，余下40万元属于周远；再加上周远婚前个人存款18万元，共58万元。账户户名不把陈禾原有的一半财产变成遗产。",
        sources: ["civil-inheritance-code-estate"],
        id: "civil-inheritance-marital-fund-estate-scope-choice",
        kind: "objective",
        choiceMode: "single",
        title: "账户里保管的共同款项：选择判断",
        prompt:
          "这两笔款项中应有多少列为周远的遗产？应先怎样处理80万元共同款项？",
        options: [
          {
            id: "a",
            text: "遗产98万元；账户在死者名下就全部属于死者",
            explanation: "账户名不能取代已经查明的夫妻共同财产关系。",
          },
          {
            id: "b",
            text: "遗产49万元；把全部98万元都平均切成夫妻两半",
            explanation:
              "18万元已经明确为周远个人财产，不能无依据也析出一半给配偶。",
          },
          {
            id: "c",
            text: "遗产58万元；共同款先分陈禾40万元，余40万元加个人18万元",
            explanation:
              "符合第1153条共同财产先析出配偶一半，以及第1122条个人遗产范围。",
          },
          {
            id: "d",
            text: "遗产18万元；夫妻共同款只要一方死亡就全部归在世配偶",
            explanation: "共同款应先析出配偶一半，其余一半仍是死者遗产。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-inheritance-marital-fund-estate-scope",
        relatedTopicIds: ["civil-inheritance-estate"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。周远于2026年9月12日死亡。清点时，他名下账户有80万元，流水和各方确认表明这是他与妻子陈禾的夫妻共同财产，夫妻没有另外的财产约定。周远另有在结婚前已经归其所有、婚后一直单独保存的存款18万元，来源和金额均可查清，夫妻没有改变该款归属的约定。这里没有其他人的财产份额。女儿周蓉认为，只要账户在父亲名下，两笔合计98万元就应全部列为父亲的遗产。本题只问遗产范围。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "列入遗产的是58万元。先从80万元共同款项中分出40万元归陈禾所有，余下40万元属于周远；再加上周远婚前个人存款18万元，共58万元。账户户名不把陈禾原有的一半财产变成遗产。",
        sources: ["civil-inheritance-code-estate"],
        id: "civil-inheritance-marital-fund-estate-scope-written",
        kind: "subjective",
        title: "账户里保管的共同款项：写出分析",
        prompt:
          "这两笔款项中应有多少列为周远的遗产？应先怎样处理80万元共同款项？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-inheritance-estate-first-separate",
            label: "先析出配偶原有的一半",
            meaning:
              "说明无另外约定的80万元共同款，应先分出40万元归陈禾，不能全部列为遗产。",
            acceptable:
              "说明80万元中先拿出妻子自己的40万元，剩下才是死者那部分即可；接受等义表达。",
            boundary:
              "这里分出的是陈禾本来所有的财产，不是计算她最终可继承多少。",
          },
          {
            id: "civil-inheritance-estate-total",
            label: "死者部分合计58万元",
            meaning:
              "将共同款中周远的40万元与其个人18万元相加，认定遗产范围为58万元。",
            acceptable: "说明遗产是40加18共58万元，个人18万元不再对半切即可。",
            boundary: "不要求继续分配58万元或讨论遗产债务、税款与继承份额。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-inheritance-acceptance",
    title: "接受继承与放弃表示",
    headline:
      "继承人沉默通常视为接受；受遗赠人知道后六十日仍无表示，视为放弃。",
    goal: "陈洛是否仅因超过60日没有表态、也没领款，就已经放弃继承？",
    prerequisite: "能核对死亡先后、亲属关系、财产归属及当事人的表示。",
    minutes: "6–10",
    paragraphs: [
      "继承开始后，继承人没有表示放弃，视为接受继承。通常要放弃继承，应在继承开始后、遗产处理前，以书面形式向遗产管理人或其他继承人表示，不能把“未主动领钱”直接等同于放弃。",
      "受遗赠人的规则不同：应在知道受遗赠后60日内作出接受或放弃的表示，到期没有表示，视为放弃。要先分清身份和知情时间，再判断沉默的后果。",
    ],
    example: {
      title: "三个月没有表态的儿子",
      facts:
        "本案为原创教学虚构，案情发生于2026年。陈琬于2026年6月3日死亡，没有留下遗嘱或遗赠扶养协议。儿子陈洛已成年，当天就知道母亲死亡，属于本案没有资格争议的法定继承人。到2026年9月15日，遗产仍未处理，陈洛既未表示接受，也未以任何形式表示放弃。其他继承人仅因他超过60日没有主动领款，就说他已经放弃继承。本题没有其他影响其继承资格的事实。",
      analysis:
        "没有。陈洛是继承人，继承开始后没有放弃表示，应视为接受继承。知道受遗赠后60日沉默视为放弃，是受遗赠人的规则，不能用来剥夺陈洛的继承资格；没有领钱也不等于放弃。",
    },
    pitfall: "把受遗赠人的六十日规则套给普通继承人，或认为所有沉默都等于接受。",
    recall: {
      prompt: "陈洛是否仅因超过60日没有表态、也没领款，就已经放弃继承？",
      reference:
        "继承人沉默通常视为接受；受遗赠人知道后六十日仍无表示，视为放弃。",
    },
    sources: [
      "civil-inheritance-code-acceptance",
      "civil-inheritance-i-renunciation",
      "civil-inheritance-code-legacy-identity",
    ],
    exercises: [
      {
        caseId: "civil-inheritance-heir-silence-accepts",
        relatedTopicIds: ["civil-inheritance-acceptance"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。陈琬于2026年6月3日死亡，没有留下遗嘱或遗赠扶养协议。儿子陈洛已成年，当天就知道母亲死亡，属于本案没有资格争议的法定继承人。到2026年9月15日，遗产仍未处理，陈洛既未表示接受，也未以任何形式表示放弃。其他继承人仅因他超过60日没有主动领款，就说他已经放弃继承。本题没有其他影响其继承资格的事实。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "没有。陈洛是继承人，继承开始后没有放弃表示，应视为接受继承。知道受遗赠后60日沉默视为放弃，是受遗赠人的规则，不能用来剥夺陈洛的继承资格；没有领钱也不等于放弃。",
        sources: [
          "civil-inheritance-code-acceptance",
          "civil-inheritance-i-renunciation",
        ],
        id: "civil-inheritance-heir-silence-accepts-choice",
        kind: "objective",
        choiceMode: "single",
        title: "三个月没有表态的儿子：选择判断",
        prompt: "陈洛是否仅因超过60日没有表态、也没领款，就已经放弃继承？",
        options: [
          {
            id: "a",
            text: "已经放弃；所有取得死者财产的人都必须60日内主动领钱",
            explanation: "60日表示规则针对受遗赠人，且也不是要求实际领款。",
          },
          {
            id: "b",
            text: "没有；继承人未表示放弃，依法视为接受",
            explanation: "第1124条对继承人没有表示的后果作出了明确规定。",
          },
          {
            id: "c",
            text: "已经放弃；没有先办接受继承公证就一律视为放弃",
            explanation: "本案没有必须先公证才能接受继承的条件。",
          },
          {
            id: "d",
            text: "是否放弃只由其他继承人决定，不需要看陈洛的表示",
            explanation: "其他继承人不能仅凭自己的判断替陈洛作出放弃表示。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-inheritance-heir-silence-accepts",
        relatedTopicIds: ["civil-inheritance-acceptance"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。陈琬于2026年6月3日死亡，没有留下遗嘱或遗赠扶养协议。儿子陈洛已成年，当天就知道母亲死亡，属于本案没有资格争议的法定继承人。到2026年9月15日，遗产仍未处理，陈洛既未表示接受，也未以任何形式表示放弃。其他继承人仅因他超过60日没有主动领款，就说他已经放弃继承。本题没有其他影响其继承资格的事实。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "没有。陈洛是继承人，继承开始后没有放弃表示，应视为接受继承。知道受遗赠后60日沉默视为放弃，是受遗赠人的规则，不能用来剥夺陈洛的继承资格；没有领钱也不等于放弃。",
        sources: [
          "civil-inheritance-code-acceptance",
          "civil-inheritance-i-renunciation",
        ],
        id: "civil-inheritance-heir-silence-accepts-written",
        kind: "subjective",
        title: "三个月没有表态的儿子：写出分析",
        prompt:
          "陈洛是否仅因超过60日没有表态、也没领款，就已经放弃继承？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-inheritance-heir-silence",
            label: "继承人沉默视为接受",
            meaning:
              "结合陈洛为继承人、遗产未处理且未表示放弃，认定视为接受；不能套用受遗赠人60日沉默规则或以未领款当作放弃。",
            acceptable:
              "说明他是继承人，没有放弃就按接受处理，60日不表态放弃是受遗赠人的规则即可；接受等义表达。",
            boundary:
              "不要求办理公证或主动领钱，不额外要求分析书面放弃、反悔或遗产债务。",
          },
        ],
      },
      {
        caseId: "civil-inheritance-legatee-silence-sixty-days",
        relatedTopicIds: ["civil-inheritance-acceptance"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。唐舒于2026年6月10日死亡。一份有效遗嘱将她个人存款中的8万元留给朋友林雯，林雯与唐舒没有亲属关系；本题遗嘱效力及这项遗赠安排没有争议。林雯于6月12日收到完整遗嘱并明确知道自己获赠8万元。直到9月15日，她没有向任何有关人表示接受或放弃，也没有领款、请求交付或实施其他可表明接受的行为；没有妨碍其表达的情况。林雯认为自己从未说过不要，所以可以一直保留接受这8万元的机会。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "不能。林雯是受遗赠人，从6月12日知道受遗赠到9月15日已经超过60日，始终没有作出接受或放弃的表示，应视为放弃受遗赠。不能把继承人沉默视为接受的规则套给她。",
        sources: [
          "civil-inheritance-code-acceptance",
          "civil-inheritance-code-legacy-identity",
        ],
        id: "civil-inheritance-legatee-silence-sixty-days-choice",
        kind: "objective",
        choiceMode: "single",
        title: "知道遗赠以后一直沉默：选择判断",
        prompt:
          "到2026年9月15日，能否因林雯没有明确拒绝，就认定她仍未放弃受遗赠？",
        options: [
          {
            id: "a",
            text: "能；所有沉默都等于接受，不必区分继承人与受遗赠人",
            explanation: "两种身份的沉默后果不同，不能混用。",
          },
          {
            id: "b",
            text: "能；只要遗产还没分，受遗赠人就没有任何表示期限",
            explanation: "第1124条对受遗赠人的表示设有知道后60日的期间。",
          },
          {
            id: "c",
            text: "不能，但60日一律从死亡日算，是否知道遗赠无关",
            explanation: "法定起算点是知道受遗赠，不能一律改成死亡日。",
          },
          {
            id: "d",
            text: "不能；知道受遗赠后超过60日始终无表示，视为放弃",
            explanation:
              "本案明确知情、沉默和不存在其他接受行为，符合第1124条规定。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-inheritance-legatee-silence-sixty-days",
        relatedTopicIds: ["civil-inheritance-acceptance"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。唐舒于2026年6月10日死亡。一份有效遗嘱将她个人存款中的8万元留给朋友林雯，林雯与唐舒没有亲属关系；本题遗嘱效力及这项遗赠安排没有争议。林雯于6月12日收到完整遗嘱并明确知道自己获赠8万元。直到9月15日，她没有向任何有关人表示接受或放弃，也没有领款、请求交付或实施其他可表明接受的行为；没有妨碍其表达的情况。林雯认为自己从未说过不要，所以可以一直保留接受这8万元的机会。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "不能。林雯是受遗赠人，从6月12日知道受遗赠到9月15日已经超过60日，始终没有作出接受或放弃的表示，应视为放弃受遗赠。不能把继承人沉默视为接受的规则套给她。",
        sources: [
          "civil-inheritance-code-acceptance",
          "civil-inheritance-code-legacy-identity",
        ],
        id: "civil-inheritance-legatee-silence-sixty-days-written",
        kind: "subjective",
        title: "知道遗赠以后一直沉默：写出分析",
        prompt:
          "到2026年9月15日，能否因林雯没有明确拒绝，就认定她仍未放弃受遗赠？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-inheritance-legatee-silence",
            label: "受遗赠人逾六十日无表示视为放弃",
            meaning:
              "联系朋友受遗赠身份、6月12日知情和至9月15日完全未表示，认定已超过60日，应视为放弃。",
            acceptable:
              "说明她是受遗赠人，知道后两个月多都没表示接受，应按放弃处理即可；接受等义表达，不要求精算第几天。",
            boundary:
              "不是从死亡日一律起算；不把没有拒绝当作永远接受，也不讨论遗嘱形式、必留份或放弃后款项归属。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-inheritance-order",
    title: "法定继承顺序",
    headline: "先看是否有第一顺序继承人继承；不能把所有亲属同时排在同一顺序。",
    goal: "本次按法定继承办理时，罗宁、杜晴、杜安中谁可按第一顺序继承？杜川能否与他们按同一顺序继承？",
    prerequisite: "能核对死亡先后、亲属关系、财产归属及当事人的表示。",
    minutes: "6–10",
    paragraphs: [
      "第一顺序为配偶、子女、父母；第二顺序为兄弟姐妹、祖父母、外祖父母。有第一顺序继承人继承时，第二顺序不参加该次顺序继承；没有第一顺序继承人继承，才轮到第二顺序。",
      "子女的继承权男女平等。兄弟姐妹不限于同父同母，也包括同父异母、同母异父等法定范围；叔伯、舅姨不能仅凭这些亲属称谓直接加入第二顺序。",
    ],
    example: {
      title: "父亲与弟弟都在世",
      facts:
        "本案为原创教学虚构，案情发生于2026年。杜衡于2026年9月10日死亡，未留下遗嘱或遗赠扶养协议。亲属关系已经查清：妻子罗宁、成年女儿杜晴、父亲杜安及弟弟杜川在世，母亲已先于杜衡死亡，没有其他子女或父母关系。罗宁、杜晴、杜安均表示愿意继承，也无资格争议。杜川认为自己也是血亲，应与这三人同一顺序继承。本题没有因扶养、生活依赖等另行请求分得遗产的事实，只问法定继承顺序。",
      analysis:
        "罗宁、杜晴、杜安都属于第一顺序继承人。杜川是弟弟，属于第二顺序；本案有第一顺序继承人实际继承，他不能仅凭兄弟关系与三人按同一顺序继承。",
    },
    pitfall: "认为父母、兄弟姐妹、子女都是血亲，就可以不分顺序一起继承。",
    recall: {
      prompt:
        "本次按法定继承办理时，罗宁、杜晴、杜安中谁可按第一顺序继承？杜川能否与他们按同一顺序继承？",
      reference:
        "先看是否有第一顺序继承人继承；不能把所有亲属同时排在同一顺序。",
    },
    sources: ["civil-inheritance-code-order"],
    exercises: [
      {
        caseId: "civil-inheritance-first-order-excludes-brother",
        relatedTopicIds: ["civil-inheritance-order"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。杜衡于2026年9月10日死亡，未留下遗嘱或遗赠扶养协议。亲属关系已经查清：妻子罗宁、成年女儿杜晴、父亲杜安及弟弟杜川在世，母亲已先于杜衡死亡，没有其他子女或父母关系。罗宁、杜晴、杜安均表示愿意继承，也无资格争议。杜川认为自己也是血亲，应与这三人同一顺序继承。本题没有因扶养、生活依赖等另行请求分得遗产的事实，只问法定继承顺序。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "罗宁、杜晴、杜安都属于第一顺序继承人。杜川是弟弟，属于第二顺序；本案有第一顺序继承人实际继承，他不能仅凭兄弟关系与三人按同一顺序继承。",
        sources: ["civil-inheritance-code-order"],
        id: "civil-inheritance-first-order-excludes-brother-choice",
        kind: "objective",
        choiceMode: "single",
        title: "父亲与弟弟都在世：选择判断",
        prompt:
          "本次按法定继承办理时，罗宁、杜晴、杜安中谁可按第一顺序继承？杜川能否与他们按同一顺序继承？",
        options: [
          {
            id: "a",
            text: "妻子、女儿、父亲均为第一顺序；弟弟不能同时按该顺序继承",
            explanation:
              "第1127条把配偶、子女、父母列为第一顺序，兄弟姐妹列为第二顺序。",
          },
          {
            id: "b",
            text: "只有妻子和女儿是第一顺序，父亲要排在弟弟之后",
            explanation: "父母也属于第一顺序，不排在兄弟姐妹之后。",
          },
          {
            id: "c",
            text: "四人均为同一顺序，只要是亲属就没有先后之分",
            explanation: "法定继承明确区分第一、第二顺序。",
          },
          {
            id: "d",
            text: "女儿必须让位给弟弟，因为男性亲属优先",
            explanation:
              "第1126条规定继承权男女平等，性别不能改变本案的法定顺序。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-inheritance-first-order-excludes-brother",
        relatedTopicIds: ["civil-inheritance-order"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。杜衡于2026年9月10日死亡，未留下遗嘱或遗赠扶养协议。亲属关系已经查清：妻子罗宁、成年女儿杜晴、父亲杜安及弟弟杜川在世，母亲已先于杜衡死亡，没有其他子女或父母关系。罗宁、杜晴、杜安均表示愿意继承，也无资格争议。杜川认为自己也是血亲，应与这三人同一顺序继承。本题没有因扶养、生活依赖等另行请求分得遗产的事实，只问法定继承顺序。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "罗宁、杜晴、杜安都属于第一顺序继承人。杜川是弟弟，属于第二顺序；本案有第一顺序继承人实际继承，他不能仅凭兄弟关系与三人按同一顺序继承。",
        sources: ["civil-inheritance-code-order"],
        id: "civil-inheritance-first-order-excludes-brother-written",
        kind: "subjective",
        title: "父亲与弟弟都在世：写出分析",
        prompt:
          "本次按法定继承办理时，罗宁、杜晴、杜安中谁可按第一顺序继承？杜川能否与他们按同一顺序继承？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-inheritance-order-first-members",
            label: "配偶子女父母均属第一顺序",
            meaning:
              "分别联系罗宁为妻子、杜晴为女儿、杜安为父亲，说明三人均属第一顺序且本案可继承。",
            acceptable:
              "说明妻子、女儿、父亲都在第一顺序即可；接受等义表达，不要求背诵完整亲属定义。",
            boundary: "不要求计算三人的具体金额或把一般均等变成绝对平均。",
          },
          {
            id: "civil-inheritance-order-second-waits",
            label: "有第一顺序继承时弟弟不同时继承",
            meaning:
              "说明杜川为第二顺序，本案第一顺序继承人继承时，不能与其按同一顺序继承。",
            acceptable:
              "说明弟弟要在没有第一顺序继承人继承时才轮到，本案不能一起排第一即可。",
            boundary:
              "结论限法定顺序，不扩成所有第二顺序亲属在任何情况下都不能依法分得财产。",
          },
        ],
      },
      {
        caseId: "civil-inheritance-second-order-half-sister-grandfather",
        relatedTopicIds: ["civil-inheritance-order"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。岑澈于2026年9月18日死亡，没有遗嘱或遗赠扶养协议。他从未结婚，无子女，父母均已先亡，也没有其他父母子女关系。在世亲属仅有同母异父的姐姐许芮、外祖父宋安，以及父亲的弟弟岑平；其他祖父母、外祖母和兄弟姐妹均不在世，也不存在可代位的其他人。这三人均未提出放弃或其他资格争议。岑平说自己与岑澈同姓，应该排在许芮和宋安之前。本题无扶养、生活依赖等特殊分配事实。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "许芮和宋安可作为第二顺序继承人参加。岑澈没有第一顺序继承人继承，同母异父的姐姐属于兄弟姐妹，外祖父也属于第二顺序。岑平是叔父，不是本条列举的第二顺序继承人，同姓不能创造更优先的顺序。",
        sources: ["civil-inheritance-code-order"],
        id: "civil-inheritance-second-order-half-sister-grandfather-choice",
        kind: "objective",
        choiceMode: "single",
        title: "姐姐与外祖父提出请求：选择判断",
        prompt:
          "在这三名亲属中，谁可作为第二顺序继承人参加本次法定继承？岑平能否仅凭叔父及同姓身份排在他们之前？",
        options: [
          {
            id: "a",
            text: "只有许芮可以，外祖父在任何情况下都没有法定继承资格",
            explanation: "外祖父属于第1127条列举的第二顺序。",
          },
          {
            id: "b",
            text: "三人都是第一顺序，因为都与岑澈有血缘关系",
            explanation: "有血缘不等于属于第一顺序，叔父也不因此加入法定顺序。",
          },
          {
            id: "c",
            text: "许芮与宋安可按第二顺序继承，叔父岑平不因同姓取得优先顺序",
            explanation:
              "同母异父姐姐属于兄弟姐妹，外祖父也属第二顺序；叔父身份不在本条列举范围。",
          },
          {
            id: "d",
            text: "只有岑平可以，父系同姓亲属一律优先于姐姐和外祖父",
            explanation: "法律没有父系同姓一律优先的继承顺序。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-inheritance-second-order-half-sister-grandfather",
        relatedTopicIds: ["civil-inheritance-order"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。岑澈于2026年9月18日死亡，没有遗嘱或遗赠扶养协议。他从未结婚，无子女，父母均已先亡，也没有其他父母子女关系。在世亲属仅有同母异父的姐姐许芮、外祖父宋安，以及父亲的弟弟岑平；其他祖父母、外祖母和兄弟姐妹均不在世，也不存在可代位的其他人。这三人均未提出放弃或其他资格争议。岑平说自己与岑澈同姓，应该排在许芮和宋安之前。本题无扶养、生活依赖等特殊分配事实。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "许芮和宋安可作为第二顺序继承人参加。岑澈没有第一顺序继承人继承，同母异父的姐姐属于兄弟姐妹，外祖父也属于第二顺序。岑平是叔父，不是本条列举的第二顺序继承人，同姓不能创造更优先的顺序。",
        sources: ["civil-inheritance-code-order"],
        id: "civil-inheritance-second-order-half-sister-grandfather-written",
        kind: "subjective",
        title: "姐姐与外祖父提出请求：写出分析",
        prompt:
          "在这三名亲属中，谁可作为第二顺序继承人参加本次法定继承？岑平能否仅凭叔父及同姓身份排在他们之前？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-inheritance-order-second-members",
            label: "姐姐与外祖父属于第二顺序",
            meaning:
              "结合无第一顺序、许芮为同母异父姐姐、宋安为外祖父，说明二人可作为第二顺序继承人。",
            acceptable:
              "说明没有配偶子女父母来继承时，同母异父姐姐和外祖父都在第二顺序即可；接受等义表达。",
            boundary: "不要求分析收养、继兄弟姐妹扶养关系或算份额。",
          },
          {
            id: "civil-inheritance-order-uncle-not-listed",
            label: "叔父与同姓不创造优先顺序",
            meaning:
              "说明岑平为父亲的弟弟，不是岑澈的兄弟，不因叔父或同姓身份加入本条第二顺序或获得优先权。",
            acceptable:
              "说明叔叔不在这里列的继承人范围，同姓也不能排在姐姐和外祖父前面即可。",
            boundary:
              "限本案法定顺序，不否定另有遗嘱或符合法律其他规定时可能分得财产。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-inheritance-representation",
    title: "代位继承的关系与范围",
    headline:
      "先看谁先死亡，再按法定亲属关系代位；配偶不能仅凭婚姻关系替代，一支也不因人数而自动扩成多支。",
    goal: "赵瑜能否代位继承？林菁能否仅凭赵延配偶身份同样代位？",
    prerequisite: "能核对死亡先后、亲属关系、财产归属及当事人的表示。",
    minutes: "6–10",
    paragraphs: [
      "子女先于被继承人死亡，其直系晚辈血亲可代位继承，包括符合规定的孙子女、外孙子女及更晚辈。子女的配偶不属于这一晚辈血亲范围，不能仅凭配偶身份代位。",
      "兄弟姐妹先于被继承人死亡，其子女也可代位。代位者一般承接被代位人原本有权继承的那一份，不能因为同一支有多个子女，就让每人各占一个完整的原支份额。",
    ],
    example: {
      title: "孙女与儿媳的不同身份",
      facts:
        "本案为原创教学虚构，案情发生于2026年。赵廷于2026年9月8日死亡，没有遗嘱或遗赠扶养协议。他的配偶、父母已先亡，只有儿子赵延和女儿赵岚这两个子女。赵延已于2026年3月12日死亡，留下成年女儿赵瑜及妻子林菁；赵岚、赵瑜、林菁在赵廷死亡时均健在。林菁与赵廷分别生活，未为其提供生活费用或照料，也不依靠其扶养。没有其他父母子女关系或继承资格争议。林菁主张，自己与赵瑜都可凭赵延的家庭成员身份代位；本题只问代位资格。",
      analysis:
        "赵瑜可以，林菁不能仅凭配偶身份代位。赵延先于父亲赵廷死亡，赵瑜是赵延的女儿、赵廷的直系晚辈血亲，可代位承接父亲原有权继承的份额。林菁是赵延的配偶，不是该直系晚辈血亲，不能把夫妻关系当作代位关系。",
    },
    pitfall:
      "把先死子女的配偶当成代位者，或把同一支的代位人数误当成增加遗产份额的理由。",
    recall: {
      prompt: "赵瑜能否代位继承？林菁能否仅凭赵延配偶身份同样代位？",
      reference:
        "先看谁先死亡，再按法定亲属关系代位；配偶不能仅凭婚姻关系替代，一支也不因人数而自动扩成多支。",
    },
    sources: [
      "civil-inheritance-code-representation",
      "civil-inheritance-i-descendants",
      "civil-inheritance-code-spouse-boundary",
      "civil-inheritance-code-order",
    ],
    exercises: [
      {
        caseId: "civil-inheritance-granddaughter-not-daughter-in-law",
        relatedTopicIds: ["civil-inheritance-representation"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。赵廷于2026年9月8日死亡，没有遗嘱或遗赠扶养协议。他的配偶、父母已先亡，只有儿子赵延和女儿赵岚这两个子女。赵延已于2026年3月12日死亡，留下成年女儿赵瑜及妻子林菁；赵岚、赵瑜、林菁在赵廷死亡时均健在。林菁与赵廷分别生活，未为其提供生活费用或照料，也不依靠其扶养。没有其他父母子女关系或继承资格争议。林菁主张，自己与赵瑜都可凭赵延的家庭成员身份代位；本题只问代位资格。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "赵瑜可以，林菁不能仅凭配偶身份代位。赵延先于父亲赵廷死亡，赵瑜是赵延的女儿、赵廷的直系晚辈血亲，可代位承接父亲原有权继承的份额。林菁是赵延的配偶，不是该直系晚辈血亲，不能把夫妻关系当作代位关系。",
        sources: [
          "civil-inheritance-code-representation",
          "civil-inheritance-i-descendants",
          "civil-inheritance-code-spouse-boundary",
        ],
        id: "civil-inheritance-granddaughter-not-daughter-in-law-choice",
        kind: "objective",
        choiceMode: "single",
        title: "孙女与儿媳的不同身份：选择判断",
        prompt: "赵瑜能否代位继承？林菁能否仅凭赵延配偶身份同样代位？",
        options: [
          {
            id: "a",
            text: "两人都能，只要与先死的赵延共同组成家庭就可代位",
            explanation:
              "代位资格按法定亲属关系判断，不按家庭成员身份一概扩大。",
          },
          {
            id: "b",
            text: "赵瑜可以；林菁不能仅凭赵延配偶身份代位",
            explanation:
              "赵瑜为先死子女的直系晚辈血亲，林菁作为配偶不属于该代位关系。",
          },
          {
            id: "c",
            text: "两人都不能，因为只有父母健在时子女才有继承资格",
            explanation: "代位规则恰是处理被继承人子女先死亡后其晚辈的继承。",
          },
          {
            id: "d",
            text: "只有林菁能代位，孙女必须先改成与祖父同一户口",
            explanation:
              "法律未要求孙女与祖父同户口，配偶也不因此取得代位资格。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-inheritance-granddaughter-not-daughter-in-law",
        relatedTopicIds: ["civil-inheritance-representation"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。赵廷于2026年9月8日死亡，没有遗嘱或遗赠扶养协议。他的配偶、父母已先亡，只有儿子赵延和女儿赵岚这两个子女。赵延已于2026年3月12日死亡，留下成年女儿赵瑜及妻子林菁；赵岚、赵瑜、林菁在赵廷死亡时均健在。林菁与赵廷分别生活，未为其提供生活费用或照料，也不依靠其扶养。没有其他父母子女关系或继承资格争议。林菁主张，自己与赵瑜都可凭赵延的家庭成员身份代位；本题只问代位资格。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "赵瑜可以，林菁不能仅凭配偶身份代位。赵延先于父亲赵廷死亡，赵瑜是赵延的女儿、赵廷的直系晚辈血亲，可代位承接父亲原有权继承的份额。林菁是赵延的配偶，不是该直系晚辈血亲，不能把夫妻关系当作代位关系。",
        sources: [
          "civil-inheritance-code-representation",
          "civil-inheritance-i-descendants",
          "civil-inheritance-code-spouse-boundary",
        ],
        id: "civil-inheritance-granddaughter-not-daughter-in-law-written",
        kind: "subjective",
        title: "孙女与儿媳的不同身份：写出分析",
        prompt:
          "赵瑜能否代位继承？林菁能否仅凭赵延配偶身份同样代位？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-inheritance-descendant-represents",
            label: "先死子女的女儿可以代位",
            meaning:
              "联系赵延2026年3月先亡、赵廷9月死亡，及赵瑜为赵延女儿，说明赵瑜可代位承接父亲原有权继承的份额。",
            acceptable:
              "说明父亲比祖父先去世，孙女可代她父亲继承即可；接受等义表达。",
            boundary:
              "不要求计算赵瑜的具体比例、讨论多代代位或引用条号；不是把父亲死后的财产再转一次。",
          },
          {
            id: "civil-inheritance-spouse-no-representation",
            label: "配偶身份不能替代直系晚辈关系",
            meaning:
              "说明林菁不是赵延的直系晚辈血亲，不能仅凭儿媳、赵延配偶身份代位。",
            acceptable:
              "说明儿媳不是这里的代位人，不能因为是儿子的妻子就代儿子拿份额即可。",
            boundary:
              "只问代位资格；不要求分析丧偶儿媳主要赡养的独立资格或其他适当分得遗产的路径。",
          },
        ],
      },
      {
        caseId: "civil-inheritance-siblings-children-one-branch",
        relatedTopicIds: ["civil-inheritance-representation"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。梁榆于2026年9月20日死亡，没有遗嘱或遗赠扶养协议。她没有配偶、子女，父母、祖父母、外祖父母均已先亡，也不存在其他父母子女关系。她只有哥哥梁森和妹妹梁萱；梁森已于2026年2月14日死亡，留下儿子梁皓、女儿梁汐。梁萱、梁皓、梁汐在9月20日均健在，没有放弃或丧失继承等争议，也没有其他可代位的人。本题不设需特殊调整份额的情况。梁皓与梁汐认为，两人每人都应另取得哥哥梁森原有权继承的一整份。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "两人可以代位继承，但一般合计承接梁森原有权继承的那一份。梁森是先于梁榆死亡的哥哥，梁皓、梁汐都是他的子女，符合法定代位关系；同一支有两个孩子，不会变成每人各拿父亲的一整份。梁萱仍按自己的兄弟姐妹身份继承。",
        sources: [
          "civil-inheritance-code-representation",
          "civil-inheritance-code-order",
        ],
        id: "civil-inheritance-siblings-children-one-branch-choice",
        kind: "objective",
        choiceMode: "single",
        title: "哥哥留下的两个孩子：选择判断",
        prompt:
          "梁皓、梁汐能否参加这次法定继承？如果可以，他们合计承接的范围应如何确定？",
        options: [
          {
            id: "a",
            text: "只有梁皓能代位，梁汐作为女性不能参加",
            explanation: "继承权男女平等，兄弟姐妹的子女不因性别被区别。",
          },
          {
            id: "b",
            text: "两人都不能，兄弟姐妹的子女在任何情况下都不允许代位",
            explanation: "第1128条已经明确兄弟姐妹先死亡时其子女可代位。",
          },
          {
            id: "c",
            text: "两人都能，并且每人各取得梁森原本可得的一整份",
            explanation:
              "一般承接的是被代位人该支应有份额，不按代位人数自动扩张。",
          },
          {
            id: "d",
            text: "两人都能，一般合计承接梁森原本有权继承的那份",
            explanation:
              "二人均为先死哥哥的子女，参加代位，但范围受第1128条的一般份额限制。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-inheritance-siblings-children-one-branch",
        relatedTopicIds: ["civil-inheritance-representation"],
        facts:
          "本案为原创教学虚构，案情发生于2026年。梁榆于2026年9月20日死亡，没有遗嘱或遗赠扶养协议。她没有配偶、子女，父母、祖父母、外祖父母均已先亡，也不存在其他父母子女关系。她只有哥哥梁森和妹妹梁萱；梁森已于2026年2月14日死亡，留下儿子梁皓、女儿梁汐。梁萱、梁皓、梁汐在9月20日均健在，没有放弃或丧失继承等争议，也没有其他可代位的人。本题不设需特殊调整份额的情况。梁皓与梁汐认为，两人每人都应另取得哥哥梁森原有权继承的一整份。",
        hint: "结合案情，说明结论和关键理由。",
        reference:
          "两人可以代位继承，但一般合计承接梁森原有权继承的那一份。梁森是先于梁榆死亡的哥哥，梁皓、梁汐都是他的子女，符合法定代位关系；同一支有两个孩子，不会变成每人各拿父亲的一整份。梁萱仍按自己的兄弟姐妹身份继承。",
        sources: [
          "civil-inheritance-code-representation",
          "civil-inheritance-code-order",
        ],
        id: "civil-inheritance-siblings-children-one-branch-written",
        kind: "subjective",
        title: "哥哥留下的两个孩子：写出分析",
        prompt:
          "梁皓、梁汐能否参加这次法定继承？如果可以，他们合计承接的范围应如何确定？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-inheritance-sibling-children-represent",
            label: "先死兄长的子女可以代位",
            meaning:
              "结合无第一顺序、梁森先于妹妹梁榆死亡，说明梁皓与梁汐作为梁森子女均可代位参加继承。",
            acceptable:
              "说明她哥哥先去世，哥哥的儿子女儿都能代位即可；接受等义表达。",
            boundary:
              "不要求追溯更多代亲属、讨论转继承或列出全部第二顺序定义。",
          },
          {
            id: "civil-inheritance-branch-limit",
            label: "同一支一般合计承接原份额",
            meaning:
              "说明二人一般合计承接梁森原有权继承的遗产份额，不能每人各取得完整的梁森份额。",
            acceptable:
              "说明两个孩子一起代父亲那一份，不是人多就各多出一整份即可；无需计算数字比例。",
            boundary:
              "不生成绝对均分公式或固定分配比例；本题已排除需要特殊调整份额的事实。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-inheritance-will-form",
    title: "自书与打印遗嘱的形式",
    headline:
      "自书看亲笔、签名和年月日；打印还须两名以上见证，并在每页依法签署。",
    goal: "能否仅因未公证、没有见证人，就否定本案自书遗嘱的形式？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "自书遗嘱由遗嘱人亲笔书写并签名，注明年、月、日。不能把公证或见证人当成所有遗嘱的共同门槛。",
      "打印遗嘱应有两名以上合格见证人在场，遗嘱人与见证人在每页签名并注明年月日。意思真实和形式要求都要核对，不能只凭“大家都知道是真的”略过形式。",
    ],
    example: {
      title: "抽屉里的亲笔遗嘱",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。许川于2026年4月6日亲笔写完整份遗嘱，将自己个人所有的一笔存款留给女儿许安，末尾亲笔签名并写明“2026年4月6日”。他立遗嘱时具有完全民事行为能力，表达的是本人真实意愿。10月许川去世后，另一子女只以没有公证、没有见证人在场为由，否认这份遗嘱的形式。本题只处理这一形式争议。",
      analysis:
        "不能。许川亲笔写了全文，签了名，也注明了年月日，符合自书遗嘱的形式要求。自书遗嘱不以公证或见证人在场为必要条件，不能额外加上这两项门槛。",
    },
    pitfall:
      "把自书和打印的形式混用，或认为只要打印遗嘱最后一页有人签字就一定足够。",
    recall: {
      prompt: "能否仅因未公证、没有见证人，就否定本案自书遗嘱的形式？",
      reference:
        "自书看亲笔、签名和年月日；打印还须两名以上见证，并在每页依法签署。",
    },
    sources: ["civil-inheritance-will1134"],
    exercises: [
      {
        caseId: "civil-inheritance-will-handwritten-no-notary",
        relatedTopicIds: ["civil-inheritance-will-form"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川于2026年4月6日亲笔写完整份遗嘱，将自己个人所有的一笔存款留给女儿许安，末尾亲笔签名并写明“2026年4月6日”。他立遗嘱时具有完全民事行为能力，表达的是本人真实意愿。10月许川去世后，另一子女只以没有公证、没有见证人在场为由，否认这份遗嘱的形式。本题只处理这一形式争议。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。许川亲笔写了全文，签了名，也注明了年月日，符合自书遗嘱的形式要求。自书遗嘱不以公证或见证人在场为必要条件，不能额外加上这两项门槛。",
        sources: ["civil-inheritance-will1134"],
        id: "civil-inheritance-will-handwritten-no-notary-choice",
        kind: "objective",
        choiceMode: "single",
        title: "抽屉里的亲笔遗嘱：选择判断",
        prompt: "能否仅因未公证、没有见证人，就否定本案自书遗嘱的形式？",
        options: [
          {
            id: "a",
            text: "不能；亲笔全文、签名和年月日齐全，自书不以公证或见证为必要",
            explanation: "第1134条规定的是自书形式，不附加公证或见证要求。",
          },
          {
            id: "b",
            text: "能；所有遗嘱都必须先经过公证才有效",
            explanation: "不同遗嘱各有形式，公证并非统一必要条件。",
          },
          {
            id: "c",
            text: "能；自书遗嘱必须由两名见证人代替本人签名",
            explanation: "自书由遗嘱人本人亲笔书写、签名。",
          },
          {
            id: "d",
            text: "不能，但理由是任何没有签名和日期的纸条都属于有效遗嘱",
            explanation: "本题恰恰给定了签名与年月日，不能取消法定要求。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-inheritance-will-handwritten-no-notary",
        relatedTopicIds: ["civil-inheritance-will-form"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川于2026年4月6日亲笔写完整份遗嘱，将自己个人所有的一笔存款留给女儿许安，末尾亲笔签名并写明“2026年4月6日”。他立遗嘱时具有完全民事行为能力，表达的是本人真实意愿。10月许川去世后，另一子女只以没有公证、没有见证人在场为由，否认这份遗嘱的形式。本题只处理这一形式争议。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。许川亲笔写了全文，签了名，也注明了年月日，符合自书遗嘱的形式要求。自书遗嘱不以公证或见证人在场为必要条件，不能额外加上这两项门槛。",
        sources: ["civil-inheritance-will1134"],
        id: "civil-inheritance-will-handwritten-no-notary-written",
        kind: "subjective",
        title: "抽屉里的亲笔遗嘱：写出分析",
        prompt:
          "能否仅因未公证、没有见证人，就否定本案自书遗嘱的形式？请结合案情说明理由。",
        criteria: [
          {
            id: "inherit-will-self-complete",
            label: "自书形式已经具备",
            meaning:
              "联系本人亲笔全文、本人签名与完整年月日，判断本案自书形式符合要求。",
            acceptable:
              "说全文是他手写的，签了名、日期也全，就符合这种遗嘱的要求即可。",
            boundary:
              "只处理形式，不要求推测未给的必留份、遗产债务或分配金额。",
          },
          {
            id: "inherit-will-self-no-extra",
            label: "不额外要求公证或见证",
            meaning: "说明仅以未公证、无见证人为由否认自书形式不成立。",
            acceptable: "说自书不用专门公证，也不一定要有人在场见证即可。",
            boundary: "不能扩成所有遗嘱都无需见证或无需任何形式。",
          },
        ],
      },
      {
        caseId: "civil-inheritance-will-printed-last-page-only",
        relatedTopicIds: ["civil-inheritance-will-form"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川在2026年4月形成一份两页打印遗嘱。两名与继承人、受遗赠人均无利害关系、具备见证能力的成年人全程在场。许川和两名见证人只在第二页末尾签名并注明年月日，第一页无人签名、没有日期；各方确认没有在其他位置补签。10月许川去世，受益人称见证人都在场、内容也确为本人意思，因而无须在每页签署。本题只判断这种签署是否满足打印遗嘱形式。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不符合。打印遗嘱要求遗嘱人与见证人在每一页签名并注明年月日，本案三人只签了末页，第一页没有签署。在场见证和内容真实，不能代替本题缺少的每页签署要求。",
        sources: ["civil-inheritance-will1134"],
        id: "civil-inheritance-will-printed-last-page-only-choice",
        kind: "objective",
        choiceMode: "single",
        title: "两页打印稿只签末页：选择判断",
        prompt:
          "本案打印遗嘱的签署是否符合要求？在场见证和真实意思能否替代每页签署？",
        options: [
          {
            id: "a",
            text: "符合，只要有两人全程在场就可以不用任何签名",
            explanation: "在场见证并不取消打印遗嘱的签署要求。",
          },
          {
            id: "b",
            text: "符合，任何遗嘱一律只须最后一页签名",
            explanation: "打印遗嘱有每页签名与年月日的特别要求。",
          },
          {
            id: "c",
            text: "不符合；只签末页没有满足每页签署，在场与真实意思不能代替",
            explanation: "直接对应第1136条及本题给定的明确缺漏。",
          },
          {
            id: "d",
            text: "不符合，但即使每页签署也必须再办一次公证",
            explanation: "公证不是所有打印遗嘱必须追加的程序。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-inheritance-will-printed-last-page-only",
        relatedTopicIds: ["civil-inheritance-will-form"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川在2026年4月形成一份两页打印遗嘱。两名与继承人、受遗赠人均无利害关系、具备见证能力的成年人全程在场。许川和两名见证人只在第二页末尾签名并注明年月日，第一页无人签名、没有日期；各方确认没有在其他位置补签。10月许川去世，受益人称见证人都在场、内容也确为本人意思，因而无须在每页签署。本题只判断这种签署是否满足打印遗嘱形式。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不符合。打印遗嘱要求遗嘱人与见证人在每一页签名并注明年月日，本案三人只签了末页，第一页没有签署。在场见证和内容真实，不能代替本题缺少的每页签署要求。",
        sources: ["civil-inheritance-will1134"],
        id: "civil-inheritance-will-printed-last-page-only-written",
        kind: "subjective",
        title: "两页打印稿只签末页：写出分析",
        prompt:
          "本案打印遗嘱的签署是否符合要求？在场见证和真实意思能否替代每页签署？请结合案情说明理由。",
        criteria: [
          {
            id: "inherit-will-print-each-page",
            label: "指出第一页的签署缺漏",
            meaning:
              "联系两页打印稿仅末页签署、第一页无人签名且无日期，判断未满足每页要求。",
            acceptable:
              "说第一页没有遗嘱人和见证人的签名日期，光签最后一页不够即可。",
            boundary: "不要求讨论骑缝签、指印等本案未出现的补救争议。",
          },
          {
            id: "inherit-will-print-truth-not-cure",
            label: "在场和真实意思不能代替形式",
            meaning:
              "明确已经有见证人在场、意思真实，仍不能据此忽略本题缺少的打印遗嘱形式。",
            acceptable: "说大家知道是他本意，也不能把每页该签的手续省了即可。",
            boundary: "不要求另问遗产归谁或推断未给的其他遗嘱。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-inheritance-will-effect",
    title: "遗嘱变更与必要遗产份额",
    headline:
      "数份有效遗嘱冲突时看最后一份；处分遗产还须为法定条件下的继承人留出必要份额。",
    goal: "就这笔20万元应依哪一份遗嘱处理？公证是否使第一份一直优先？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "遗嘱人可以撤回或变更遗嘱。数份遗嘱内容相抵触，按最后的遗嘱处理；不能继续套用已经废止的公证遗嘱优先规则。",
      "遗嘱应为缺乏劳动能力又没有生活来源的继承人保留必要份额，按遗嘱生效时的情况判断。不是所有成年子女都被排除，也不是所有人都有固定比例；需要保留后，剩余部分再按遗嘱原则处理。",
    ],
    example: {
      title: "先公证，后又亲笔改写",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。许川于2026年1月办理公证遗嘱，将个人存款20万元留给儿子许明。4月9日，他又亲笔写完整份遗嘱，签名并注明年月日，明确撤回该笔存款给许明的安排，改留给女儿许安。10月许川去世。双方认可两份遗嘱订立时的行为能力、真实意思和相应形式，且无其他遗嘱或必留份争议。许明仅以第一份经过公证为由要求优先采用。",
      analysis:
        "依4月9日的后一份自书遗嘱，将这笔存款留给许安。两份遗嘱对同一笔存款的安排相冲突，且后一份形式与意思均无争议，应以最后的遗嘱为准；第一份经过公证，也不会因此始终优先。",
    },
    pitfall: "把公证当成永远不能变更，或只凭继承人已成年就忽略必留份条件。",
    recall: {
      prompt: "就这笔20万元应依哪一份遗嘱处理？公证是否使第一份一直优先？",
      reference:
        "数份有效遗嘱冲突时看最后一份；处分遗产还须为法定条件下的继承人留出必要份额。",
    },
    sources: [
      "civil-inheritance-will1142",
      "civil-inheritance-necessary1141",
      "civil-inheritance-interpretation25",
    ],
    exercises: [
      {
        caseId: "civil-inheritance-will-later-handwritten-conflict",
        relatedTopicIds: ["civil-inheritance-will-effect"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川于2026年1月办理公证遗嘱，将个人存款20万元留给儿子许明。4月9日，他又亲笔写完整份遗嘱，签名并注明年月日，明确撤回该笔存款给许明的安排，改留给女儿许安。10月许川去世。双方认可两份遗嘱订立时的行为能力、真实意思和相应形式，且无其他遗嘱或必留份争议。许明仅以第一份经过公证为由要求优先采用。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "依4月9日的后一份自书遗嘱，将这笔存款留给许安。两份遗嘱对同一笔存款的安排相冲突，且后一份形式与意思均无争议，应以最后的遗嘱为准；第一份经过公证，也不会因此始终优先。",
        sources: ["civil-inheritance-will1142"],
        id: "civil-inheritance-will-later-handwritten-conflict-choice",
        kind: "objective",
        choiceMode: "single",
        title: "先公证，后又亲笔改写：选择判断",
        prompt: "就这笔20万元应依哪一份遗嘱处理？公证是否使第一份一直优先？",
        options: [
          {
            id: "a",
            text: "依第一份，因为公证遗嘱在任何时候都不能撤回或改变",
            explanation: "现行法不再采用公证遗嘱当然优先的规则。",
          },
          {
            id: "b",
            text: "依后一份；两份有效安排抵触，以最后的遗嘱为准",
            explanation: "第1142条明确数份遗嘱内容抵触时采用最后的遗嘱。",
          },
          {
            id: "c",
            text: "两份各执行20万元，不必考虑是否同一笔存款",
            explanation: "不能把同一财产相抵触的安排机械重复执行。",
          },
          {
            id: "d",
            text: "两份都因订立过多次而一概无效",
            explanation: "订立多份本身不导致全部无效，应处理抵触部分。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-inheritance-will-later-handwritten-conflict",
        relatedTopicIds: ["civil-inheritance-will-effect"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川于2026年1月办理公证遗嘱，将个人存款20万元留给儿子许明。4月9日，他又亲笔写完整份遗嘱，签名并注明年月日，明确撤回该笔存款给许明的安排，改留给女儿许安。10月许川去世。双方认可两份遗嘱订立时的行为能力、真实意思和相应形式，且无其他遗嘱或必留份争议。许明仅以第一份经过公证为由要求优先采用。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "依4月9日的后一份自书遗嘱，将这笔存款留给许安。两份遗嘱对同一笔存款的安排相冲突，且后一份形式与意思均无争议，应以最后的遗嘱为准；第一份经过公证，也不会因此始终优先。",
        sources: ["civil-inheritance-will1142"],
        id: "civil-inheritance-will-later-handwritten-conflict-written",
        kind: "subjective",
        title: "先公证，后又亲笔改写：写出分析",
        prompt:
          "就这笔20万元应依哪一份遗嘱处理？公证是否使第一份一直优先？请结合案情说明理由。",
        criteria: [
          {
            id: "inherit-will-last-controls",
            label: "同一存款依后遗嘱给许安",
            meaning:
              "联系两份遗嘱处分同一20万元且相抵触，明确依4月9日后一份安排给许安。",
            acceptable: "说后来已经亲笔把这笔钱改给女儿，应按后面的来即可。",
            boundary: "不把两份遗嘱没有冲突的部分也一律推翻；本题仅同一笔钱。",
          },
          {
            id: "inherit-will-notary-not-priority",
            label: "公证不当然优先",
            meaning: "说明第一份公证不能排除现行法最后遗嘱优先的冲突处理规则。",
            acceptable: "说公证不代表以后不能再改，不能总用最早的那份即可。",
            boundary: "不要求对公证书进行撤销、证明力或收费的程序分析。",
          },
        ],
      },
      {
        caseId: "civil-inheritance-will-necessary-share-adult-child",
        relatedTopicIds: ["civil-inheritance-will-effect"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川在2026年依法立遗嘱，将个人遗产全部留给有独立生活来源的儿子许明，未给女儿许安留份额。10月许川去世时，已成年的许安因长期身体状况持续无法劳动，没有收入、可供生活的财产或其他稳定生活来源。相关能力和生活来源情况均已核实，本题不要求作医学判断。许明只以妹妹已满十八岁为由，主张应全部照遗嘱执行，不给她留下任何遗产。本题不计算必要份额金额。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。许安在遗嘱生效时既缺乏劳动能力，又没有生活来源，符合应保留必要遗产份额的条件，成年不排除这项保护。应先为她留下必要的遗产，剩余部分再按遗嘱的分配原则处理，不是直接把全部遗产给许明，也不等于两人必定各半。",
        sources: [
          "civil-inheritance-necessary1141",
          "civil-inheritance-interpretation25",
        ],
        id: "civil-inheritance-will-necessary-share-adult-child-choice",
        kind: "objective",
        choiceMode: "single",
        title: "遗嘱漏掉成年病残子女：选择判断",
        prompt: "许明能否只因许安已成年而不给她留任何份额？遗产应如何处理？",
        options: [
          {
            id: "a",
            text: "可以，所有成年子女都自动失去任何必要份额保护",
            explanation: "是否成年不能代替法定的劳动能力与生活来源判断。",
          },
          {
            id: "b",
            text: "不可以，所以所有继承人在所有遗嘱中都必须各分一半",
            explanation: "必留份没有这种统一比例，也不是人人都符合条件。",
          },
          {
            id: "c",
            text: "不可以，因此整份遗嘱必须不问情况全部作废",
            explanation: "处理时先留必要部分，余下仍可按遗嘱原则处理。",
          },
          {
            id: "d",
            text: "不可以；先留许安必要份额，剩余再按遗嘱原则处理",
            explanation:
              "第1141条与解释（一）第25条保护遗嘱生效时符合双重要件的继承人。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-inheritance-will-necessary-share-adult-child",
        relatedTopicIds: ["civil-inheritance-will-effect"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川在2026年依法立遗嘱，将个人遗产全部留给有独立生活来源的儿子许明，未给女儿许安留份额。10月许川去世时，已成年的许安因长期身体状况持续无法劳动，没有收入、可供生活的财产或其他稳定生活来源。相关能力和生活来源情况均已核实，本题不要求作医学判断。许明只以妹妹已满十八岁为由，主张应全部照遗嘱执行，不给她留下任何遗产。本题不计算必要份额金额。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。许安在遗嘱生效时既缺乏劳动能力，又没有生活来源，符合应保留必要遗产份额的条件，成年不排除这项保护。应先为她留下必要的遗产，剩余部分再按遗嘱的分配原则处理，不是直接把全部遗产给许明，也不等于两人必定各半。",
        sources: [
          "civil-inheritance-necessary1141",
          "civil-inheritance-interpretation25",
        ],
        id: "civil-inheritance-will-necessary-share-adult-child-written",
        kind: "subjective",
        title: "遗嘱漏掉成年病残子女：写出分析",
        prompt:
          "许明能否只因许安已成年而不给她留任何份额？遗产应如何处理？请结合案情说明理由。",
        criteria: [
          {
            id: "inherit-will-necessary-conditions",
            label: "联系生效时两项条件",
            meaning:
              "联系许川去世时许安无法劳动且没有生活来源，说明成年不排除必要份额保护。",
            acceptable:
              "说她虽然成年，但确实不能劳动又没生活来源，不能一分钱不留即可。",
            boundary: "不要求提供医学结论或认为凡身体不好就必定符合两项条件。",
          },
          {
            id: "inherit-will-reserve-then-rest",
            label: "先留必要遗产再处理其余",
            meaning:
              "说明先为许安留下必要份额，剩余再按遗嘱原则处理，不机械各半也不必整份作废。",
            acceptable: "说先保障她必要的生活，再按遗嘱分剩下的钱即可。",
            boundary: "不要求精算金额、认定固定比例或讨论未给出的税债。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-inheritance-transfer",
    title: "转继承与代位继承的时间区别",
    headline:
      "先于被继承人死亡才讨论代位；继承已经开始、分割前又死亡且未放弃的，份额转给其继承人。",
    goal: "许明应取得的份额应按代位还是转继承处理？能否仅以周禾不是许川的子女，排除她通过许明的继承链取得？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "继承开始后，继承人还没有分到遗产就去世，只要没有放弃，原则上把他应继承的份额转给他的继承人；遗嘱另有安排的除外。不能仅因钱没打到手，就说这项继承从未发生。",
      "区分两类时间线：子女先死、父母后死，可能由子女的晚辈直系血亲代位；父母先死、子女后死，则看转继承条件。已经依法放弃的份额，不能因之后死亡而重新出现。",
    ],
    example: {
      title: "父亲去世后儿子又去世",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。许川于2026年2月10日去世，未留遗嘱。儿子许明当日仍在世，依法有权继承，且未放弃。遗产因清点尚未分割，许明于3月10日去世，也未留遗嘱。许明的妻子周禾与许明的儿子许远随后主张，许明本应取得的那部分遗产应转给他的继承人。另一亲属称许明没有先拿到钱，因此只能让许远代位，周禾作为儿媳不能通过这条继承链取得任何份额。本题不计算最终份额，也不讨论周禾有无独立赡养贡献。",
      analysis:
        "这是转继承。许川去世时许明仍在世，继承已经开始；许明在分割前死亡且没有放弃，应得份额原则上转给许明的继承人。周禾作为许明的配偶，可以通过这条继承链参与，不能仅以她不是许川的子女就排除；许远不是在这里代替一位先于许川死亡的父亲。",
    },
    pitfall: "不看死亡先后就一律叫代位，或把尚未实际领款误当成没有继承权。",
    recall: {
      prompt:
        "许明应取得的份额应按代位还是转继承处理？能否仅以周禾不是许川的子女，排除她通过许明的继承链取得？",
      reference:
        "先于被继承人死亡才讨论代位；继承已经开始、分割前又死亡且未放弃的，份额转给其继承人。",
    },
    sources: [
      "civil-inheritance-transfer1152",
      "civil-inheritance-renunciation1124",
      "civil-inheritance-renunciation33",
    ],
    exercises: [
      {
        caseId: "civil-inheritance-transfer-spouse-after-heir-death",
        relatedTopicIds: ["civil-inheritance-transfer"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川于2026年2月10日去世，未留遗嘱。儿子许明当日仍在世，依法有权继承，且未放弃。遗产因清点尚未分割，许明于3月10日去世，也未留遗嘱。许明的妻子周禾与许明的儿子许远随后主张，许明本应取得的那部分遗产应转给他的继承人。另一亲属称许明没有先拿到钱，因此只能让许远代位，周禾作为儿媳不能通过这条继承链取得任何份额。本题不计算最终份额，也不讨论周禾有无独立赡养贡献。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "这是转继承。许川去世时许明仍在世，继承已经开始；许明在分割前死亡且没有放弃，应得份额原则上转给许明的继承人。周禾作为许明的配偶，可以通过这条继承链参与，不能仅以她不是许川的子女就排除；许远不是在这里代替一位先于许川死亡的父亲。",
        sources: ["civil-inheritance-transfer1152"],
        id: "civil-inheritance-transfer-spouse-after-heir-death-choice",
        kind: "objective",
        choiceMode: "single",
        title: "父亲去世后儿子又去世：选择判断",
        prompt:
          "许明应取得的份额应按代位还是转继承处理？能否仅以周禾不是许川的子女，排除她通过许明的继承链取得？",
        options: [
          {
            id: "a",
            text: "应按转继承处理；未放弃的应得份额转给许明的继承人，配偶不因无血缘被当然排除",
            explanation: "符合第1152条的死亡时点与未放弃条件。",
          },
          {
            id: "b",
            text: "许明后来去世使许川的继承也一并全部取消",
            explanation: "后一位继承人的死亡不使先前已经开始的继承整体消失。",
          },
          {
            id: "c",
            text: "只能由许远代位，因为继承人没有拿到现金就不可能发生转继承",
            explanation: "转继承不要求前一份遗产已经实际分到手。",
          },
          {
            id: "d",
            text: "周禾没有与许川血缘关系，所以在任何继承链上都绝不可能取得",
            explanation:
              "她是许明的配偶，可能通过许明的继承链取得，不能混同直接代位。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-inheritance-transfer-spouse-after-heir-death",
        relatedTopicIds: ["civil-inheritance-transfer"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川于2026年2月10日去世，未留遗嘱。儿子许明当日仍在世，依法有权继承，且未放弃。遗产因清点尚未分割，许明于3月10日去世，也未留遗嘱。许明的妻子周禾与许明的儿子许远随后主张，许明本应取得的那部分遗产应转给他的继承人。另一亲属称许明没有先拿到钱，因此只能让许远代位，周禾作为儿媳不能通过这条继承链取得任何份额。本题不计算最终份额，也不讨论周禾有无独立赡养贡献。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "这是转继承。许川去世时许明仍在世，继承已经开始；许明在分割前死亡且没有放弃，应得份额原则上转给许明的继承人。周禾作为许明的配偶，可以通过这条继承链参与，不能仅以她不是许川的子女就排除；许远不是在这里代替一位先于许川死亡的父亲。",
        sources: ["civil-inheritance-transfer1152"],
        id: "civil-inheritance-transfer-spouse-after-heir-death-written",
        kind: "subjective",
        title: "父亲去世后儿子又去世：写出分析",
        prompt:
          "许明应取得的份额应按代位还是转继承处理？能否仅以周禾不是许川的子女，排除她通过许明的继承链取得？请结合案情说明理由。",
        criteria: [
          {
            id: "inherit-transfer-time-order",
            label: "按先后死亡判断转继承",
            meaning:
              "联系许川先死、许明当时仍在世且未放弃，许明在分割前死亡，判断其份额适用转继承。",
            acceptable:
              "说父亲死的时候儿子还活着，份额已经轮到儿子；儿子后来没分到手就去世，转给他的继承人即可。",
            boundary: "不要求算比例，也不把所有同日死亡都按本案时序处理。",
          },
          {
            id: "inherit-transfer-spouse-chain",
            label: "配偶可通过后段继承链参与",
            meaning:
              "说明周禾是许明配偶，可以通过许明的继承链取得，不因不是许川子女就被排除。",
            acceptable:
              "说妻子不是去代位继承公公，而是继承丈夫本来应拿的那份即可。",
            boundary:
              "不要求认定周禾独立享有丧偶儿媳第一顺序继承权，也不预设她独得全部。",
          },
        ],
      },
      {
        caseId: "civil-inheritance-transfer-written-waiver-before-death",
        relatedTopicIds: ["civil-inheritance-transfer"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川于2026年2月10日去世，未留遗嘱，儿子许明当时在世。3月1日，遗产尚未分割，许明本人向遗产管理人提交签名的书面声明，明确放弃对许川遗产的继承；此后没有反悔、领取或处分任何遗产，也不存在因放弃而不能履行法定义务的情形。4月5日许明去世，其妻和儿子主张只要许明在分割前死亡，就仍应把这部分遗产转给他们。本题不问许川其他遗产如何分配。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。许明已经在继承开始后、分割前依法书面放弃，这一份额不能再转给他的妻儿。转继承既要求分割前死亡，也要求此前没有放弃；本案缺少后一条件。",
        sources: [
          "civil-inheritance-transfer1152",
          "civil-inheritance-renunciation1124",
          "civil-inheritance-renunciation33",
        ],
        id: "civil-inheritance-transfer-written-waiver-before-death-choice",
        kind: "objective",
        choiceMode: "single",
        title: "书面放弃以后才去世：选择判断",
        prompt:
          "许明的妻子和儿子能否仅凭“许明在分割前死亡”取得这项转继承份额？请说明所缺的条件。",
        options: [
          {
            id: "a",
            text: "能；书面放弃会因为本人后来死亡而自动撤销",
            explanation: "后来死亡不会使已作出的有效放弃自动消失。",
          },
          {
            id: "b",
            text: "不能，因为任何继承人的配偶和子女都永远不能承接其份额",
            explanation: "一般情形可发生转继承，本题缺的是未放弃条件。",
          },
          {
            id: "c",
            text: "不能；许明已经依法书面放弃，不能再转出这项份额",
            explanation: "符合第1124条及第1152条条件的区分。",
          },
          {
            id: "d",
            text: "能；只要在分割前死亡，是否已经放弃都无关",
            explanation: "第1152条同时要求没有放弃继承。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-inheritance-transfer-written-waiver-before-death",
        relatedTopicIds: ["civil-inheritance-transfer"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川于2026年2月10日去世，未留遗嘱，儿子许明当时在世。3月1日，遗产尚未分割，许明本人向遗产管理人提交签名的书面声明，明确放弃对许川遗产的继承；此后没有反悔、领取或处分任何遗产，也不存在因放弃而不能履行法定义务的情形。4月5日许明去世，其妻和儿子主张只要许明在分割前死亡，就仍应把这部分遗产转给他们。本题不问许川其他遗产如何分配。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。许明已经在继承开始后、分割前依法书面放弃，这一份额不能再转给他的妻儿。转继承既要求分割前死亡，也要求此前没有放弃；本案缺少后一条件。",
        sources: [
          "civil-inheritance-transfer1152",
          "civil-inheritance-renunciation1124",
          "civil-inheritance-renunciation33",
        ],
        id: "civil-inheritance-transfer-written-waiver-before-death-written",
        kind: "subjective",
        title: "书面放弃以后才去世：写出分析",
        prompt:
          "许明的妻子和儿子能否仅凭“许明在分割前死亡”取得这项转继承份额？请说明所缺的条件。请结合案情说明理由。",
        criteria: [
          {
            id: "inherit-transfer-waiver-effective",
            label: "联系书面放弃已作出",
            meaning:
              "说明许明在继承开始后、分割前依法向遗产管理人书面放弃，不能忽略。",
            acceptable:
              "说他活着时已经在遗产没分之前正式写了不要，这项放弃有效即可。",
            boundary: "不要求分析未发生的反悔、逃债或领取处分相矛盾的情形。",
          },
          {
            id: "inherit-transfer-no-unwaived-share",
            label: "已放弃的份额不能转出",
            meaning: "明确不能仅凭分割前死亡就转给妻儿，因为没有未放弃的份额。",
            acceptable:
              "说转继承还要没放弃，他已经放弃了，就没有这份可以转给妻儿即可。",
            boundary:
              "不判断其余继承人的份额，也不把本案排除结论推广为所有配偶不得转继承。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-inheritance-debt",
    title: "遗产债务的限额与遗赠顺序",
    headline:
      "继承所得遗产的实际价值是清偿限额；执行遗赠不能挤掉死者依法应还的债务。",
    goal: "许安应在什么范围内清偿？债权人能否仅凭父女关系要求她用原有工资存款补足？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "继承人用所得遗产的实际价值为限清偿死者依法税债。超出的部分，继承人可以自愿偿还，但仅凭亲属关系不能强制动用他的其他个人财产；本人另有借款、保证等责任时要另看。",
      "分割遗产应依法处理税债；执行遗赠不能妨碍清偿。遗赠写了多少钱，不表示受遗赠人可以先拿走这笔钱，把死者的合法债务留在后面。必要遗产份额等法定保护也不能遗漏。",
    ],
    example: {
      title: "继承六万元，却被追十万元",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。许川于2026年9月去世，留下已到期的个人合法借款10万元。成年女儿许安从其遗产中取得现金6万元，这是她继承所得的全部遗产，实际价值已核明。许安一直以自己的工资生活，未共同借款、未提供保证，也未承诺或自愿替父亲超额偿还。债权人要求她把6万元交出，再从自己原有工资存款补足4万元，只说“父亲欠的，女儿就应全还”。本题无必要份额或其他优先支出争议。",
      analysis:
        "许安以继承所得6万元的实际价值为限清偿。超过的4万元，不能仅凭父女关系强制从她原有工资存款中补足；她没有共同借款、保证或另作承担承诺。超过遗产价值的部分，她可以自愿偿还，但本案没有这种自愿承担。",
    },
    pitfall: "把父债子偿当无限责任，或认为遗嘱指定的钱应先于一切合法债务拿走。",
    recall: {
      prompt:
        "许安应在什么范围内清偿？债权人能否仅凭父女关系要求她用原有工资存款补足？",
      reference:
        "继承所得遗产的实际价值是清偿限额；执行遗赠不能挤掉死者依法应还的债务。",
    },
    sources: ["civil-inheritance-debt1161", "civil-inheritance-legacy1162"],
    exercises: [
      {
        caseId: "civil-inheritance-debt-inherited-value-limit",
        relatedTopicIds: ["civil-inheritance-debt"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川于2026年9月去世，留下已到期的个人合法借款10万元。成年女儿许安从其遗产中取得现金6万元，这是她继承所得的全部遗产，实际价值已核明。许安一直以自己的工资生活，未共同借款、未提供保证，也未承诺或自愿替父亲超额偿还。债权人要求她把6万元交出，再从自己原有工资存款补足4万元，只说“父亲欠的，女儿就应全还”。本题无必要份额或其他优先支出争议。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "许安以继承所得6万元的实际价值为限清偿。超过的4万元，不能仅凭父女关系强制从她原有工资存款中补足；她没有共同借款、保证或另作承担承诺。超过遗产价值的部分，她可以自愿偿还，但本案没有这种自愿承担。",
        sources: ["civil-inheritance-debt1161"],
        id: "civil-inheritance-debt-inherited-value-limit-choice",
        kind: "objective",
        choiceMode: "single",
        title: "继承六万元，却被追十万元：选择判断",
        prompt:
          "许安应在什么范围内清偿？债权人能否仅凭父女关系要求她用原有工资存款补足？",
        options: [
          {
            id: "a",
            text: "只能用父亲原来的纸币，现金一换账户就不用再清偿",
            explanation: "清偿限额看实际价值，不是限定同一张钞票。",
          },
          {
            id: "b",
            text: "应在6万元实际遗产价值内清偿，不能仅因是女儿强制补足其余4万元",
            explanation: "第1161条设定所得遗产实际价值限额。",
          },
          {
            id: "c",
            text: "必须还满10万元，血缘关系就使她承担无限责任",
            explanation: "亲属关系不是无限偿债的法律依据。",
          },
          {
            id: "d",
            text: "一分钱也无需清偿，因为债务人本人已经去世",
            explanation: "不能忽略已继承遗产范围内的依法清偿。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-inheritance-debt-inherited-value-limit",
        relatedTopicIds: ["civil-inheritance-debt"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川于2026年9月去世，留下已到期的个人合法借款10万元。成年女儿许安从其遗产中取得现金6万元，这是她继承所得的全部遗产，实际价值已核明。许安一直以自己的工资生活，未共同借款、未提供保证，也未承诺或自愿替父亲超额偿还。债权人要求她把6万元交出，再从自己原有工资存款补足4万元，只说“父亲欠的，女儿就应全还”。本题无必要份额或其他优先支出争议。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "许安以继承所得6万元的实际价值为限清偿。超过的4万元，不能仅凭父女关系强制从她原有工资存款中补足；她没有共同借款、保证或另作承担承诺。超过遗产价值的部分，她可以自愿偿还，但本案没有这种自愿承担。",
        sources: ["civil-inheritance-debt1161"],
        id: "civil-inheritance-debt-inherited-value-limit-written",
        kind: "subjective",
        title: "继承六万元，却被追十万元：写出分析",
        prompt:
          "许安应在什么范围内清偿？债权人能否仅凭父女关系要求她用原有工资存款补足？请结合案情说明理由。",
        criteria: [
          {
            id: "inherit-debt-value-limit",
            label: "在所得遗产六万元内清偿",
            meaning:
              "明确用许安继承所得全部遗产的实际价值6万元为限清偿，不能说她完全无需清偿。",
            acceptable: "说拿了六万遗产，就在六万范围里还父亲的合法债即可。",
            boundary: "不要求处理本题未给的其他债权、税费或遗产估值。",
          },
          {
            id: "inherit-debt-no-forced-personal-topup",
            label: "不因父女关系强制个人补足",
            meaning:
              "联系未共同借款、未保证或另作承担，说明超过遗产价值的4万元不得仅凭父女关系强制补足。",
            acceptable:
              "说超出遗产的四万不能逼她用自己的工资填，除非她自己愿意或另有个人责任即可。",
            boundary: "不把该规则扩成即使本人共同借款或保证也永远不用承担。",
          },
        ],
      },
      {
        caseId: "civil-inheritance-debt-before-cash-legacy",
        relatedTopicIds: ["civil-inheritance-debt"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川于2026年9月去世，遗留个人现金10万元，没有其他财产。他的合法个人普通借款7万元已到期，债权和金额均无争议；无税费、担保、必要份额及其他优先支出争议。有效遗嘱将其中现金6万元遗赠给朋友林禾，林禾在知情20日内明确表示接受。林禾要求先拿6万元，称剩下4万元才是还债的钱，不足部分由许川的女儿用工资补。女儿没有共同借款、保证或自愿补足承诺。本题只比较清偿与执行这笔遗赠的顺序。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能先把6万元给林禾。执行遗赠不得妨碍清偿许川的合法债务，应先用遗产处理7万元借款；10万元扣除这笔债务只余3万元，现有遗产最多能向林禾执行3万元。遗嘱写6万元，不会因此使女儿必须用自己的工资补齐差额。",
        sources: ["civil-inheritance-debt1161", "civil-inheritance-legacy1162"],
        id: "civil-inheritance-debt-before-cash-legacy-choice",
        kind: "objective",
        choiceMode: "single",
        title: "遗赠不能抢在还债前执行：选择判断",
        prompt:
          "林禾能否先拿6万元再处理借款？现有遗产中可用于执行这笔遗赠的金额最多是多少？",
        options: [
          {
            id: "a",
            text: "能；林禾先拿6万元后，女儿必须个人补足死者的一切债务",
            explanation: "遗赠不能制造女儿额外的个人责任。",
          },
          {
            id: "b",
            text: "不能，所以即使清偿后还有遗产，也一律取消全部有效遗赠",
            explanation: "不能以要先清债为由抹去剩余财产中可执行的遗赠。",
          },
          {
            id: "c",
            text: "能；只要遗嘱有效，受遗赠人永远先于合法债权人拿钱",
            explanation: "有效遗赠仍不能妨碍清偿遗赠人的合法税债。",
          },
          {
            id: "d",
            text: "不能；先清偿7万元债务，现有遗产最多剩3万元用于这笔遗赠",
            explanation: "第1162条与本题给定的单一债务和现金数额共同确定。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-inheritance-debt-before-cash-legacy",
        relatedTopicIds: ["civil-inheritance-debt"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。许川于2026年9月去世，遗留个人现金10万元，没有其他财产。他的合法个人普通借款7万元已到期，债权和金额均无争议；无税费、担保、必要份额及其他优先支出争议。有效遗嘱将其中现金6万元遗赠给朋友林禾，林禾在知情20日内明确表示接受。林禾要求先拿6万元，称剩下4万元才是还债的钱，不足部分由许川的女儿用工资补。女儿没有共同借款、保证或自愿补足承诺。本题只比较清偿与执行这笔遗赠的顺序。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能先把6万元给林禾。执行遗赠不得妨碍清偿许川的合法债务，应先用遗产处理7万元借款；10万元扣除这笔债务只余3万元，现有遗产最多能向林禾执行3万元。遗嘱写6万元，不会因此使女儿必须用自己的工资补齐差额。",
        sources: ["civil-inheritance-debt1161", "civil-inheritance-legacy1162"],
        id: "civil-inheritance-debt-before-cash-legacy-written",
        kind: "subjective",
        title: "遗赠不能抢在还债前执行：写出分析",
        prompt:
          "林禾能否先拿6万元再处理借款？现有遗产中可用于执行这笔遗赠的金额最多是多少？请结合案情说明理由。",
        criteria: [
          {
            id: "inherit-debt-legacy-priority",
            label: "清债不能被遗赠挤后",
            meaning:
              "明确林禾不能先执行6万元遗赠而妨碍清偿合法7万元债务，应先依法清偿。",
            acceptable:
              "说遗嘱留钱给朋友，也得先还死者该还的借款，不能先把钱搬走即可。",
            boundary: "不要求比较本题未给的担保债权、税费或其他优先权。",
          },
          {
            id: "inherit-debt-legacy-remainder",
            label: "本案遗赠最多执行三万元",
            meaning:
              "联系现金10万元减合法债务7万元，只余3万元可执行该遗赠，不得要求女儿工资补齐。",
            acceptable:
              "说十万先还七万，只余三万给朋友，少的不能让女儿自己掏即可。",
            boundary:
              "只说明现有遗产的执行上限，不要求推断其他资产或其他遗嘱。",
          },
        ],
      },
    ],
  },
];

export const civilInheritanceChapters = [
  {
    id: "CIV-INHERITANCE-OPENING",
    title: "继承开始与接受放弃",
    section: "民法",
    topicIds: ["civil-inheritance-estate", "civil-inheritance-acceptance"],
  },
  {
    id: "CIV-STATUTORY-SUCCESSION",
    title: "法定继承与代位继承",
    section: "民法",
    topicIds: ["civil-inheritance-order", "civil-inheritance-representation"],
  },
  {
    id: "CIV-TESTAMENTARY-SUCCESSION",
    title: "遗嘱形式与效力",
    section: "民法",
    topicIds: ["civil-inheritance-will-form", "civil-inheritance-will-effect"],
  },
  {
    id: "CIV-ESTATE-HANDLING",
    title: "转继承与遗产债务",
    section: "民法",
    topicIds: ["civil-inheritance-transfer", "civil-inheritance-debt"],
  },
];

export const civilInheritanceExercises = civilInheritanceTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilInheritanceContentPack = {
  revision: civilInheritanceRevision,
  snapshot: {
    topics: civilInheritanceTopics,
    sources: civilInheritanceSources,
  },
};
export const civilInheritanceDefaultQueues = {
  objective: civilInheritanceExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilInheritanceExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilInheritanceQuestion(id: string) {
  const question = civilInheritanceExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilInheritanceTopicForQuestion(id: string) {
  return civilInheritanceTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilInheritanceSameCaseQuestions(id: string) {
  const question = civilInheritanceQuestion(id);
  return question
    ? structuredClone(
        civilInheritanceExercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function civilInheritanceChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilInheritanceChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilInheritanceTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
