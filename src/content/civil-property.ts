import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts and are not independent assessments.
export const civilPropertyRevision = "civil-property-2026-10-22.v1";

export const civilPropertySources: ContentSources = {
  "civil-property-coown301": {
    title: "《民法典》第297、298、301条：共有及处分同意门槛",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接核对最高法所载法典全文，2021-01-01施行。第301条对按份共有按份额三分之二以上、共同共有按全体同意，但共有人另有约定除外。本组只判断明确按份共有、无另约时的内部同意门槛，不据此单独判第三人合同或物权效果。",
  },
  "civil-property-coown305": {
    title: "《民法典》第305、306条：按份共有份额转让与优先购买",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22核对第305、306条。只用向外部人转让及其他共有人按同等价款、付款方式和期限及时主张的基础案，不扩张到共同共有、继承或赠与。",
  },
  "civil-property-coown-interpretation": {
    title: "最高法民法典物权编解释（一）第10至13条：同等条件及内部转让",
    url: "https://www.court.gov.cn/fabu/xiangqing/282101.html",
    note: "法释〔2020〕24号，2020-12-29公布、2021-01-01施行；2026-10-22打开最高法原文核对。内部转让原则上无其他共有人法定优先购买权，另有约定除外；对外转让时不以仅要求合同无效替代同等条件购买。本次未作全部后续修改清理或年度考纲验收。",
  },
  "civil-property-mortgage-creation": {
    title: "《民法典》第215、394、395、400、402、403条：抵押合同与抵押权设立",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22核对官方全文。普通有处分权人的房屋抵押登记设立，动产抵押自合同生效设立、未登记不得对抗善意第三人。本组均给有效主债权及无其他合同效力问题，不引入公司担保、浮动抵押、价款优先或第三人买受人对抗。",
  },
  "civil-property-mortgage-priority": {
    title: "《民法典》第414条：同一财产多项抵押的顺位",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22核对第414条。已登记按登记先后；登记先于未登记；均未登记按债权比例。案例限定两项普通抵押之间、无顺位变更和其他优先权，处分所得已是可供这两项分配的净额，不要求推算其他权利、执行费用或普通债权。",
  },
  "civil-property-goodfaith-law": {
    title: "《民法典》第311条：善意取得",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22直接核对最高法转载全文；2020-05-28通过，2021-01-01施行。本组限所有权人自愿交付他人借用的普通动产，分别判断无处分权、受让时善意、合理价格及实际交付；不套用于遗失物。",
  },
  "civil-property-goodfaith-interpretation": {
    title:
      "最高法民法典物权编解释（一）第14、16—18条：善意、重大过失与合理价格",
    url: "https://www.court.gov.cn/fabu/xiangqing/282101.html",
    note: "法释〔2020〕24号，2020-12-29公布，2021-01-01施行；2026-10-22主站原文可读。善意要求不知道转让人无处分权且无重大过失，按受让时判断；价格结合当地市场与交易习惯。网页未单列现行状态，另一最高法入口重定向循环；本次不冒称完成全部清理核验。",
  },
  "civil-property-lost-law": {
    title: "《民法典》第312条：遗失物追回及购入费用",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22核对第312条；2021-01-01施行。向受让人追回的二年自知道或应当知道受让人起算；通过拍卖或向具有经营资格的经营者购得时，返还须支付受让人所付费用。两案只问明确已付的正常购价，不引入第317条保管必要费用、悬赏或盗赃物规则。",
  },
  "civil-property-pledge-law": {
    title: "《民法典》第425、427、429条：动产质押与交付设立",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22核对；2021-01-01施行。限出质人自有、可转让的普通动产，书面质押合同与实际交付分别给出；只判断质权设立，不涉及权利质押、第三人监管或担保顺位。",
  },
  "civil-property-lien-law": {
    title: "《民法典》第447—449条：留置的基本条件",
    url: "https://www.court.gov.cn/zixun/xiangqing/233181.html",
    note: "2026-10-22核对；2021-01-01施行。限自然人之间修理关系：合法占有债务人动产、到期债权与同一法律关系；未约定排除留置。无关联旧个人借款不适用企业之间留置的例外，不讨论变价程序或担保竞合。",
  },
};

export const civilPropertyTopics: FaultTopic[] = [
  {
    id: "civil-ownership-disposition",
    title: "按份共有物的处分",
    headline:
      "处分整个共有物，通常看同意者合计份额是否达到三分之二，不按人头算。",
    goal: "按份共有物的出售同意，应如何计算？",
    prerequisite: "能区分合同约定、物权设立与权利实现。",
    minutes: "6–10",
    paragraphs: [
      "按份共有人依各自份额享有共有物所有权。出售整个共有物，或者作重大修缮、变更性质或用途，在没有另行约定时，应经占份额三分之二以上的按份共有人同意。这里算份额，不是人数。",
      "共同共有原则上须全体共同共有人同意；共有人之间另有约定的，按相应约定处理。本组已明确按份共有，只判断内部同意门槛，不能仅凭未达到门槛就直接回答所有对外合同或第三人取得问题。",
    ],
    example: {
      title: "两个人同意，能否满足共有物出售门槛？",
      facts:
        "本案为原创教学虚构。四名成年人按份共有一台大型印刷设备，何川占60%，余青、卢月各占15%，程宁占10%，均有书面记录。他们未另行约定处分方式。何川与程宁同意将整台设备出售给外部买方，另两人反对，尚未签约。本问只判断出售整个共有物的内部同意门槛。",
      analysis:
        "已经达到。何川的60%加上程宁的10%，同意者合计70%，超过三分之二。按份共有的法定处分门槛按份额计算，不要求同意者人数过半或全体同意。",
    },
    pitfall:
      "看到“多数人同意”就结束判断，或把某一份额转让与出售整个共有物混在一起。",
    recall: {
      prompt: "按份共有物的出售同意，应如何计算？",
      reference:
        "无另约时，按同意者的份额合计是否达到三分之二判断，不按同意人数多少。",
    },
    sources: ["civil-property-coown301"],
    exercises: [
      {
        caseId: "CIV-PROPERTY-COOWN-70",
        relatedTopicIds: ["civil-ownership-disposition"],
        facts:
          "本案为原创教学虚构。四名成年人按份共有一台大型印刷设备，何川占60%，余青、卢月各占15%，程宁占10%，均有书面记录。他们未另行约定处分方式。何川与程宁同意将整台设备出售给外部买方，另两人反对，尚未签约。本问只判断出售整个共有物的内部同意门槛。",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: ["civil-property-coown301"],
        id: "civil-property-coown-seventy-choice",
        kind: "objective",
        title: "两个人同意，能否满足共有物出售门槛？",
        prompt: "以下哪些判断正确？",
        choiceMode: "multiple",
        answer: "b,d",
        options: [
          {
            id: "a",
            text: "只有两人同意，未超过人数一半，未达到法定门槛。",
            explanation: "按份共有的处分门槛按份额计算，不按人数。",
          },
          {
            id: "b",
            text: "同意者合计70%，已经达到法定份额门槛。",
            explanation: "60%加10%超过三分之二。",
          },
          {
            id: "c",
            text: "出售整台设备必须四人全部同意。",
            explanation: "无另约的按份共有不以全体同意为一般门槛。",
          },
          {
            id: "d",
            text: "只就内部同意条件而言，不因另两人反对而欠缺法定门槛。",
            explanation:
              "已有超过三分之二份额同意；本题尚未判断对外合同或转权。",
          },
        ],
        reference:
          "选B、D。何川与程宁合计占70%，达到三分之二以上。按份共有按份额算同意门槛，两人反对不改变这一结果。",
        correctChoices: ["b", "d"],
      },
      {
        caseId: "CIV-PROPERTY-COOWN-70",
        relatedTopicIds: ["civil-ownership-disposition"],
        facts:
          "本案为原创教学虚构。四名成年人按份共有一台大型印刷设备，何川占60%，余青、卢月各占15%，程宁占10%，均有书面记录。他们未另行约定处分方式。何川与程宁同意将整台设备出售给外部买方，另两人反对，尚未签约。本问只判断出售整个共有物的内部同意门槛。",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: ["civil-property-coown301"],
        id: "civil-property-coown-seventy-explain",
        kind: "subjective",
        title: "按份额说明出售是否获得足够同意",
        prompt:
          "是否已经达到出售整台设备的法定内部同意门槛？请说明为何不能只按人数判断。",
        answer: "",
        reference:
          "已经达到。何川的60%加上程宁的10%，同意者合计70%，超过三分之二。按份共有的法定处分门槛按份额计算，不要求同意者人数过半或全体同意。",
        criteria: [
          {
            id: "coown-seventy-threshold",
            label: "按份额合计认定达到门槛",
            meaning:
              "联系60%与10%合计70%，说明已达到三分之二以上，同意人数只有两人不妨碍。",
            acceptable:
              "认可法律含义一致、能联系案情的自然表达，不要求固定词句或条号。",
            boundary:
              "只问内部同意，不要求说明买方取得所有权、合同效力或分配价款。",
          },
        ],
      },
      {
        caseId: "CIV-PROPERTY-COOWN-65",
        relatedTopicIds: ["civil-ownership-disposition"],
        facts:
          "本案为原创教学虚构。四名成年人按份共有一处仓库，份额分别为许舟30%、秦岑25%、陶宁10%、沈庭35%，没有另行约定。许舟、秦岑、陶宁拟拆换整套承重屋架，沈庭反对。本问按重大修缮讨论，只判断法定内部同意门槛。",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: ["civil-property-coown301"],
        id: "civil-property-coown-sixtyfive-choice",
        kind: "objective",
        title: "四人中的三人同意，仍可能不够",
        prompt: "下列哪项判断正确？",
        choiceMode: "single",
        answer: "c",
        options: [
          {
            id: "a",
            text: "三人同意超过人数三分之二，门槛已经满足。",
            explanation: "按份共有应算份额，不按人数比例。",
          },
          {
            id: "b",
            text: "同意者份额超过50%，门槛已经满足。",
            explanation: "一般法定门槛不是简单份额过半。",
          },
          {
            id: "c",
            text: "同意者合计65%，尚未达到三分之二以上。",
            explanation: "30%加25%加10%为65%，低于三分之二。",
          },
          {
            id: "d",
            text: "只有35%的人反对，应忽略其反对并视为全体同意。",
            explanation: "不能把少数份额反对转写为其同意。",
          },
        ],
        reference:
          "选C。三名同意者合计65%，仍未达到三分之二。重大修缮与处分共有物适用这里的份额门槛，不能按三人对一人的人数判断。",
      },
      {
        caseId: "CIV-PROPERTY-COOWN-65",
        relatedTopicIds: ["civil-ownership-disposition"],
        facts:
          "本案为原创教学虚构。四名成年人按份共有一处仓库，份额分别为许舟30%、秦岑25%、陶宁10%、沈庭35%，没有另行约定。许舟、秦岑、陶宁拟拆换整套承重屋架，沈庭反对。本问按重大修缮讨论，只判断法定内部同意门槛。",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: ["civil-property-coown301"],
        id: "civil-property-coown-sixtyfive-explain",
        kind: "subjective",
        title: "核对重大修缮的同意份额",
        prompt:
          "本案是否已满足重大修缮的法定内部同意门槛？请计算同意份额并说明。",
        answer: "",
        reference:
          "尚未满足。许舟、秦岑、陶宁合计30%＋25%＋10%＝65%，低于三分之二。虽然四人中有三人赞成，但按份共有按份额计算，不能以人数多数替代。",
        criteria: [
          {
            id: "coown-sixtyfive-short",
            label: "合计65%尚未达到门槛",
            meaning:
              "联系三人合计65%低于三分之二，否定以人数多数认定重大修缮已获法定同意。",
            acceptable:
              "认可法律含义一致、能联系案情的自然表达，不要求固定词句或条号。",
            boundary: "不要求讨论工程合同效力、紧急保全措施或修缮费用分担。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-ownership-preemption",
    title: "按份共有份额转让与优先购买",
    headline:
      "向外部人出售份额时，其他共有人可在同等条件下优先购买；内部转让通常不同。",
    goal: "对外出售与内部转让，优先购买权有何不同？",
    prerequisite: "能区分合同约定、物权设立与权利实现。",
    minutes: "6–10",
    paragraphs: [
      "按份共有人可以转让自己的共有份额。向共有人之外的人出售时，应及时通知其他共有人；其他共有人可在合理期限内，以同等条件主张优先购买。价款相同还不够，付款方式、期限等实质条件也须相同。",
      "份额在现有按份共有人之间转让，其他共有人通常没有民法典第305条的法定优先购买权，另有约定的除外。优先购买是按同等条件购买，不能只要求否定别人合同，却不提出自己的购买请求。",
    ],
    example: {
      title: "卖自己的份额，也要考虑其他共有人的购买请求",
      facts:
        "本案为原创教学虚构。顾槐、宋清、叶衡按份共有一间商铺，份额分别为50%、30%、20%。顾槐拟以20万元向共有人之外的罗羽出售自己的50%份额，要求一次性付款。他书面通知另外两人全部条件，并留20天答复。宋清次日表示愿以20万元一次性支付，接受全部同等条件，请求优先购买。没有其他购买请求或特别约定。",
      analysis:
        "可以。顾槐拟卖给现有共有人之外的罗羽，宋清作为原按份共有人，在通知次日就接受了20万元一次性付款等全部条件，及时提出同等条件购买请求，符合优先购买要求。",
    },
    pitfall: "把一切份额转让都当成对外出售，或只报相同价格却改变付款期限。",
    recall: {
      prompt: "对外出售与内部转让，优先购买权有何不同？",
      reference:
        "对外出售可按同等条件及时优先购买；共有人内部转让原则上不适用第305条，另有约定除外。",
    },
    sources: ["civil-property-coown305", "civil-property-coown-interpretation"],
    exercises: [
      {
        caseId: "CIV-PROPERTY-PREEMPT-OUT",
        relatedTopicIds: ["civil-ownership-preemption"],
        facts:
          "本案为原创教学虚构。顾槐、宋清、叶衡按份共有一间商铺，份额分别为50%、30%、20%。顾槐拟以20万元向共有人之外的罗羽出售自己的50%份额，要求一次性付款。他书面通知另外两人全部条件，并留20天答复。宋清次日表示愿以20万元一次性支付，接受全部同等条件，请求优先购买。没有其他购买请求或特别约定。",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: [
          "civil-property-coown305",
          "civil-property-coown-interpretation",
        ],
        id: "civil-property-preemption-outsider-choice",
        kind: "objective",
        title: "卖自己的份额，也要考虑其他共有人的购买请求",
        prompt: "下列哪项判断正确？",
        choiceMode: "single",
        answer: "b",
        options: [
          {
            id: "a",
            text: "顾槐只卖自己的份额，因此宋清没有优先购买权。",
            explanation: "第305条正是针对按份共有份额转让的规则。",
          },
          {
            id: "b",
            text: "宋清及时接受同等条件，可以主张优先购买。",
            explanation: "对外出售，且原共有人及时按相同实质条件请求购买。",
          },
          {
            id: "c",
            text: "宋清必须先证明自己已有50%的份额，才能主张。",
            explanation: "原份额少于出让份额不排除其优先购买权。",
          },
          {
            id: "d",
            text: "宋清可以坚持同样总价但分五年付款，也算同等条件。",
            explanation: "付款期限是同等条件的实质因素。",
          },
        ],
        reference:
          "选B。顾槐向外部人出售份额，宋清在通知次日接受相同价款、一次性付款等全部条件，可以依法优先购买。不要求宋清原来已有50%份额。",
      },
      {
        caseId: "CIV-PROPERTY-PREEMPT-OUT",
        relatedTopicIds: ["civil-ownership-preemption"],
        facts:
          "本案为原创教学虚构。顾槐、宋清、叶衡按份共有一间商铺，份额分别为50%、30%、20%。顾槐拟以20万元向共有人之外的罗羽出售自己的50%份额，要求一次性付款。他书面通知另外两人全部条件，并留20天答复。宋清次日表示愿以20万元一次性支付，接受全部同等条件，请求优先购买。没有其他购买请求或特别约定。",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: [
          "civil-property-coown305",
          "civil-property-coown-interpretation",
        ],
        id: "civil-property-preemption-outsider-explain",
        kind: "subjective",
        title: "把对外出售与同等条件连起来",
        prompt:
          "宋清能否优先购买顾槐的50%份额？请联系受让人身份、付款条件和主张时间说明。",
        answer: "",
        reference:
          "可以。顾槐拟卖给现有共有人之外的罗羽，宋清作为原按份共有人，在通知次日就接受了20万元一次性付款等全部条件，及时提出同等条件购买请求，符合优先购买要求。",
        criteria: [
          {
            id: "preempt-outsider-basis",
            label: "对外出售产生其他共有人的优先购买机会",
            meaning:
              "联系向非共有人罗羽出售以及宋清原共有人身份，确认适用按份共有份额优先购买规则。",
            acceptable:
              "认可法律含义一致、能联系案情的自然表达，不要求固定词句或条号。",
            boundary: "不要求背诵第305条条号，不把出售整个共有物作为条件。",
          },
          {
            id: "preempt-outsider-equal",
            label: "及时接受同等条件",
            meaning:
              "联系次日、相同价款和付款安排等事实，确认宋清可按同等条件优先购买。",
            acceptable:
              "认可法律含义一致、能联系案情的自然表达，不要求固定词句或条号。",
            boundary: "不要求计算最后行使日，不把改付款期限视为同等条件。",
          },
        ],
      },
      {
        caseId: "CIV-PROPERTY-PREEMPT-IN",
        relatedTopicIds: ["civil-ownership-preemption"],
        facts:
          "本案为原创教学虚构。吴遥、梁青、谢川按份共有一间储藏室，份额为40%、35%、25%。吴遥准备把自己的40%份额以8万元卖给已经持有35%份额的梁青。谢川提出愿意按相同条件购买，要求依据民法典第305条优先于梁青。三人之间没有优先购买的特别约定。",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: [
          "civil-property-coown305",
          "civil-property-coown-interpretation",
        ],
        id: "civil-property-preemption-insider-choice",
        kind: "objective",
        title: "现有共有人之间转让份额",
        prompt: "下列哪项判断正确？",
        choiceMode: "single",
        answer: "a",
        options: [
          {
            id: "a",
            text: "这是现有共有人之间的内部转让，谢川不能据第305条要求优先于梁青。",
            explanation: "物权编解释第13条排除无另约的内部份额转让。",
          },
          {
            id: "b",
            text: "任何份额转让都适用第305条，谢川可优先于梁青。",
            explanation: "未区分向外部人转让与现有共有人内部转让。",
          },
          {
            id: "c",
            text: "谢川只需先付款，就可以自行取得这40%份额。",
            explanation:
              "没有相应优先购买请求基础，付款本身也不代替份额转移程序。",
          },
          {
            id: "d",
            text: "吴遥只能先把份额卖给外部人，再转给梁青。",
            explanation: "法律不要求人为绕过现有共有人之间的直接转让。",
          },
        ],
        reference:
          "选A。梁青本来就是按份共有人，本次属于内部份额转让。没有特别约定时，谢川不能援引第305条要求优先购买。",
      },
      {
        caseId: "CIV-PROPERTY-PREEMPT-IN",
        relatedTopicIds: ["civil-ownership-preemption"],
        facts:
          "本案为原创教学虚构。吴遥、梁青、谢川按份共有一间储藏室，份额为40%、35%、25%。吴遥准备把自己的40%份额以8万元卖给已经持有35%份额的梁青。谢川提出愿意按相同条件购买，要求依据民法典第305条优先于梁青。三人之间没有优先购买的特别约定。",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: [
          "civil-property-coown305",
          "civil-property-coown-interpretation",
        ],
        id: "civil-property-preemption-insider-explain",
        kind: "subjective",
        title: "为何同等出价仍不足以主张优先",
        prompt:
          "谢川愿意接受相同条件，是否就能依据第305条优先购买？请说明本次转让的区别。",
        answer: "",
        reference:
          "不能。受让人梁青已经是该物的按份共有人，这次是共有人内部转让。依物权编解释第13条，没有特别约定时，其他共有人不能依据第305条主张优先购买；谢川相同出价也不改变这一点。",
        criteria: [
          {
            id: "preempt-insider-exclusion",
            label: "内部转让不适用无另约的法定优先购买",
            meaning:
              "联系梁青已有共有份额及无特别约定，说明谢川不能据第305条要求优先，即使愿出同等价款。",
            acceptable:
              "认可法律含义一致、能联系案情的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求分析已签合同效力或房产登记，也不否定对外转让的通常优先购买规则。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-goodfaith-entrusted",
    title: "受托动产被擅售与善意取得",
    headline: "无权出售不必然能追回；要一起看受让时的善意、价格和交付。",
    goal: "根据交易事实判断普通动产能否善意取得。",
    prerequisite: "知道借用他人物品不等于有权出售。",
    minutes: "6–10",
    paragraphs: [
      "物主把动产借给别人，不等于授权出售。借用人擅卖时，买方若在受让时不知道其无处分权、也无重大过失，以合理价格受让并已经交付，可以善意取得所有权。普通动产通常看交付；依法应登记的物权还须相应登记。",
      "判断善意要看当时的交易事实，不能只听买方说“不知道”。交易对象、场所、时机明显反常可能构成重大过失；已经知道卖方无权出售，更不能善意取得。价格合理或拿到物品都不能单独补足善意条件。",
    ],
    example: {
      title: "借来的相机被卖，买方能否取得所有权？",
      facts:
        "本案为原创教学虚构。何舟把自有相机连同原包装、购机凭证借给方衡拍摄，没有同意他出售。方衡却在正常营业的二手摄影交流市场，以自己所有的名义向沈珂出售。凭证未记买主姓名，编号与相机一致，沈珂核对凭证并当面试机，交易时没有见到权属争议或其他异常。当地同型号、同成色相机通常售5800至6200元，沈珂支付6000元，当场取走相机。一周后何舟找到沈珂要求返还。",
      analysis:
        "沈珂已经取得相机所有权，何舟不能再向其追回。方衡只是借用相机，无权出售；但沈珂按通常方式验货、核对凭证，交易中没有应当怀疑权属的异常，符合善意要求。6000元处于正常市价范围，且相机已经交付，沈珂善意取得所有权，何舟不能再向其追回。",
    },
    pitfall: "只看付款或交付，漏掉受让时是否善意。",
    recall: {
      prompt: "受托动产被擅售时，善意取得要结合哪些事实？",
      reference:
        "结合受让时是否知道或有重大过失、价格是否合理以及交付等公示是否完成；条件具备才可能取得所有权。",
    },
    sources: [
      "civil-property-goodfaith-law",
      "civil-property-goodfaith-interpretation",
    ],
    exercises: [
      {
        caseId: "civil-property-case-goodfaith-camera",
        relatedTopicIds: ["civil-goodfaith-entrusted"],
        facts:
          "本案为原创教学虚构。何舟把自有相机连同原包装、购机凭证借给方衡拍摄，没有同意他出售。方衡却在正常营业的二手摄影交流市场，以自己所有的名义向沈珂出售。凭证未记买主姓名，编号与相机一致，沈珂核对凭证并当面试机，交易时没有见到权属争议或其他异常。当地同型号、同成色相机通常售5800至6200元，沈珂支付6000元，当场取走相机。一周后何舟找到沈珂要求返还。",
        hint: "结合本案事实说明判断即可。",
        sources: [
          "civil-property-goodfaith-law",
          "civil-property-goodfaith-interpretation",
        ],
        id: "civil-property-goodfaith-camera-choice",
        kind: "objective",
        choiceMode: "single",
        title: "借来的相机被卖，买方能否取得所有权？",
        prompt: "关于本案相机的所有权，哪项判断正确？",
        options: [
          {
            id: "a",
            text: "何舟可以追回，因为方衡不是所有权人，任何买方都不能取得。",
            explanation: "忽略了无处分权人转让时可能成立善意取得。",
          },
          {
            id: "b",
            text: "沈珂取得所有权，正常交易事实支持其善意，且价格合理、已经交付。",
            explanation: "本案同时具备善意取得的相应条件。",
          },
          {
            id: "c",
            text: "沈珂不能取得，因为相机还没有办理所有权登记。",
            explanation: "本案普通相机以交付满足公示要求，不要求所有权登记。",
          },
          {
            id: "d",
            text: "沈珂取得所有权，只要付钱就不必再审查善意或交付。",
            explanation: "合理价格、受让时善意和交付不能相互替代。",
          },
        ],
        answer: "b",
        reference:
          "选B。方衡虽无权出售，但沈珂在正常交易中验货、核对凭证，没有应当怀疑权属的异常；支付6000元符合当地市价，且已取走相机，成立善意取得。何舟不能再向沈珂追回该相机。",
      },
      {
        caseId: "civil-property-case-goodfaith-camera",
        relatedTopicIds: ["civil-goodfaith-entrusted"],
        facts:
          "本案为原创教学虚构。何舟把自有相机连同原包装、购机凭证借给方衡拍摄，没有同意他出售。方衡却在正常营业的二手摄影交流市场，以自己所有的名义向沈珂出售。凭证未记买主姓名，编号与相机一致，沈珂核对凭证并当面试机，交易时没有见到权属争议或其他异常。当地同型号、同成色相机通常售5800至6200元，沈珂支付6000元，当场取走相机。一周后何舟找到沈珂要求返还。",
        hint: "结合本案事实说明判断即可。",
        sources: [
          "civil-property-goodfaith-law",
          "civil-property-goodfaith-interpretation",
        ],
        id: "civil-property-goodfaith-camera-explain",
        kind: "subjective",
        title: "借用相机被转卖后的返还请求",
        prompt:
          "何舟能否要求沈珂返还相机？请结合受让时的情况、价款和交付说明。",
        answer: "",
        reference:
          "不能。方衡只是借用相机，无权出售；但沈珂按通常方式验货、核对凭证，交易中没有应当怀疑权属的异常，符合善意要求。6000元处于正常市价范围，且相机已经交付，沈珂善意取得所有权，何舟不能再向其追回。",
        criteria: [
          {
            id: "civil-property-goodfaith-camera-conditions",
            label: "联系交易事实判断善意取得条件",
            meaning:
              "联系正常验货、凭证和无异常判断沈珂受让时善意，并指出6000元符合市价、已实际交付。",
            acceptable:
              "认可法律含义相同、能联系本案事实的自然表达，不要求固定词句或条号。",
            boundary: "不要求另列举未给出的核验义务或举证责任。",
          },
          {
            id: "civil-property-goodfaith-camera-result",
            label: "明确所有权与返还结果",
            meaning:
              "说明方衡无处分权仍可能成立善意取得，本案沈珂已取得所有权，何舟不能向其追回。",
            acceptable:
              "认可法律含义相同、能联系本案事实的自然表达，不要求固定词句或条号。",
            boundary: "不要求另答对方衡的损害赔偿。",
          },
        ],
      },
      {
        caseId: "civil-property-case-goodfaith-known-owner",
        relatedTopicIds: ["civil-goodfaith-entrusted"],
        facts:
          "本案为原创教学虚构。陆棠把自有电子琴借给邵行，没有授权出售。邵行约唐越以2400元购买该琴，当地同型号旧琴通常售2300至2500元。交款、交琴前，陆棠当面出示购琴凭证，向唐越说明琴只是借给邵行，自己不同意出售。唐越回答“我知道是你的，但我还是买”，随后付清2400元并把琴搬走。陆棠随即要求返还。",
        hint: "结合本案事实说明判断即可。",
        sources: [
          "civil-property-goodfaith-law",
          "civil-property-goodfaith-interpretation",
        ],
        id: "civil-property-goodfaith-known-owner-choice",
        kind: "objective",
        choiceMode: "single",
        title: "付款并拿到琴，明知无权出售也能取得吗？",
        prompt: "唐越能否凭善意取得拒绝返还？",
        options: [
          {
            id: "a",
            text: "能够，因为2400元属于合理价格。",
            explanation: "价格合理不能替代善意。",
          },
          {
            id: "b",
            text: "能够，因为搬走电子琴就当然取得所有权。",
            explanation: "交付也不能替代受让时的善意。",
          },
          {
            id: "c",
            text: "不能，因为所有借用物都绝对不适用善意取得。",
            explanation:
              "不能把本案明知无处分权扩大成所有借用物都不能善意取得。",
          },
          {
            id: "d",
            text: "不能，他在交付前已明知邵行无权出售，不符合善意要求。",
            explanation: "原所有人已经当面告知，唐越仍明确表示照买。",
          },
        ],
        answer: "d",
        reference:
          "选D。唐越在交款、取琴前已被陆棠明确告知邵行无权出售，仍表示照买，不属于善意。即使价格合理且已经交付，也不能善意取得，陆棠可以要求返还。",
      },
      {
        caseId: "civil-property-case-goodfaith-known-owner",
        relatedTopicIds: ["civil-goodfaith-entrusted"],
        facts:
          "本案为原创教学虚构。陆棠把自有电子琴借给邵行，没有授权出售。邵行约唐越以2400元购买该琴，当地同型号旧琴通常售2300至2500元。交款、交琴前，陆棠当面出示购琴凭证，向唐越说明琴只是借给邵行，自己不同意出售。唐越回答“我知道是你的，但我还是买”，随后付清2400元并把琴搬走。陆棠随即要求返还。",
        hint: "结合本案事实说明判断即可。",
        sources: [
          "civil-property-goodfaith-law",
          "civil-property-goodfaith-interpretation",
        ],
        id: "civil-property-goodfaith-known-owner-explain",
        kind: "subjective",
        title: "回应“价款合理又已交付”的理由",
        prompt:
          "唐越称“我付的是市价，琴也交给我了”，能否因此取得所有权、拒绝陆棠返还？请说明。",
        answer: "",
        reference:
          "不能。唐越在交款、取琴前已明知电子琴属于陆棠，邵行没有出售权限，不符合善意取得的善意条件。合理价格和交付不能补足这一缺陷，陆棠可以要求其返还电子琴。",
        criteria: [
          {
            id: "civil-property-goodfaith-known-owner-result",
            label: "联系明知无权出售否定善意取得",
            meaning:
              "联系交付前陆棠明确告知、唐越仍照买的事实，说明其不善意，价格合理与交付不能使其取得所有权，应向陆棠返还。",
            acceptable:
              "认可法律含义相同、能联系本案事实的自然表达，不要求固定词句或条号。",
            boundary: "不要求讨论第二份合同效力或其他损害赔偿。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-goodfaith-lost",
    title: "遗失物的追回与购入费用",
    headline: "买方不知情也不当然挡住追回；购入渠道关系到取回时是否偿付费用。",
    goal: "区分遗失物追回的二年期间与购入费用例外。",
    prerequisite: "先分清物主主动交他人占有与意外遗失。",
    minutes: "6–10",
    paragraphs: [
      "遗失物被转卖后，原所有权人可以自知道或者应当知道受让人之日起二年内，向受让人请求返还。买方不知是遗失物、按正常价格购买，也不能直接照搬受托动产善意取得的结论。",
      "受让人通过拍卖，或者向具有经营资格的经营者购得遗失物，物主取回时须支付受让人所付的购入费用；支付后可向无处分权人追偿。普通私人转卖不在这一例外内，所付费用也不能等同于受让人任意提出的额外补偿。",
    ],
    example: {
      title: "遗失物经私人转卖，原物主能否取回？",
      facts:
        "本案为原创教学虚构。姜言在公园遗落一支录音笔，被岳杉拾得。岳杉没有联系姜言，自称是自用品，以1800元私下卖给马会并交付；同型号旧录音笔市价为1700至1900元。马会当时不知道录音笔是捡来的。2026年3月1日姜言首次查明受让人是马会，4月1日请求返还。马会要求姜言先补给自己1800元购价；这笔交易不是拍卖，岳杉也不是经营该类物品的经营者。",
      analysis:
        "可以取回，且不必先偿付这1800元购价。姜言在知道受让人后一个月内请求返还，处于二年期间内；录音笔是遗失物，不能仅因马会不知情、按市价购买就否定追回。马会从普通私人手中购买，不属于拍卖或合格经营者购入的费用偿付例外。",
    },
    pitfall:
      "把买方不知情当作一概不能追回，或把所有购入渠道都当作必须偿付购价。",
    recall: {
      prompt: "遗失物已转卖时，追回期限和购入费用分别看什么？",
      reference:
        "向受让人追回的二年从知道或应当知道受让人起算；拍卖或向合格经营者购得时，取回应偿付受让人所付的购入费用。",
    },
    sources: ["civil-property-lost-law"],
    exercises: [
      {
        caseId: "civil-property-case-lost-private",
        relatedTopicIds: ["civil-goodfaith-lost"],
        facts:
          "本案为原创教学虚构。姜言在公园遗落一支录音笔，被岳杉拾得。岳杉没有联系姜言，自称是自用品，以1800元私下卖给马会并交付；同型号旧录音笔市价为1700至1900元。马会当时不知道录音笔是捡来的。2026年3月1日姜言首次查明受让人是马会，4月1日请求返还。马会要求姜言先补给自己1800元购价；这笔交易不是拍卖，岳杉也不是经营该类物品的经营者。",
        hint: "结合本案事实说明判断即可。",
        sources: ["civil-property-lost-law"],
        id: "civil-property-lost-private-choice",
        kind: "objective",
        choiceMode: "multiple",
        title: "遗失物经私人转卖，原物主能否取回？",
        prompt: "以下哪些判断正确？",
        options: [
          {
            id: "a",
            text: "姜言可以在本案给定期间内向马会请求返还。",
            explanation: "知道受让人后尚未经过二年，遗失物适用特别追回规则。",
          },
          {
            id: "b",
            text: "马会不知是遗失物且按市价购买，姜言就永远不能追回。",
            explanation: "遗失物不直接按普通受托物的善意取得结果处理。",
          },
          {
            id: "c",
            text: "姜言不必为这次私人交易先偿付1800元购价。",
            explanation:
              "本案不属于拍卖或向具有经营资格的经营者购入的费用偿付例外。",
          },
          {
            id: "d",
            text: "只要录音笔曾经遗失，姜言向受让人请求返还就没有任何期间限制。",
            explanation: "第312条规定知道或应当知道受让人之日起二年的期间。",
          },
        ],
        answer: "a,c",
        reference:
          "选A、C。姜言在知道受让人后一个月内请求返还，没有超过二年。录音笔是遗失物，马会不知情、按市价购买也不阻止本次追回；其从普通私人手中购入，不属于须偿付购入费用的例外，姜言不必先补给1800元购价。",
        correctChoices: ["a", "c"],
      },
      {
        caseId: "civil-property-case-lost-private",
        relatedTopicIds: ["civil-goodfaith-lost"],
        facts:
          "本案为原创教学虚构。姜言在公园遗落一支录音笔，被岳杉拾得。岳杉没有联系姜言，自称是自用品，以1800元私下卖给马会并交付；同型号旧录音笔市价为1700至1900元。马会当时不知道录音笔是捡来的。2026年3月1日姜言首次查明受让人是马会，4月1日请求返还。马会要求姜言先补给自己1800元购价；这笔交易不是拍卖，岳杉也不是经营该类物品的经营者。",
        hint: "结合本案事实说明判断即可。",
        sources: ["civil-property-lost-law"],
        id: "civil-property-lost-private-explain",
        kind: "subjective",
        title: "说明私人购买遗失物的返还与购价",
        prompt: "姜言能否取回录音笔？是否必须先偿付马会1800元购价？请说明。",
        answer: "",
        reference:
          "可以取回，且不必先偿付这1800元购价。姜言在知道受让人后一个月内请求返还，处于二年期间内；录音笔是遗失物，不能仅因马会不知情、按市价购买就否定追回。马会从普通私人手中购买，不属于拍卖或合格经营者购入的费用偿付例外。",
        criteria: [
          {
            id: "civil-property-lost-private-return",
            label: "联系遗失物与二年期间判断可追回",
            meaning:
              "指出录音笔为遗失物，姜言知道受让人仅一个月即请求返还，马会不知情也不能排除本次追回。",
            acceptable:
              "认可法律含义相同、能联系本案事实的自然表达，不要求固定词句或条号。",
            boundary: "不要求讨论盗赃物或超过二年后的效果。",
          },
          {
            id: "civil-property-lost-private-fee",
            label: "区分私人购入与费用偿付例外",
            meaning:
              "联系非拍卖、非合格经营者的私人交易，说明姜言不必先偿付1800元购价。",
            acceptable:
              "认可法律含义相同、能联系本案事实的自然表达，不要求固定词句或条号。",
            boundary: "只判断题设购价，不要求补充未给出的保管费用或悬赏。",
          },
        ],
      },
      {
        caseId: "civil-property-case-lost-dealer",
        relatedTopicIds: ["civil-goodfaith-lost"],
        facts:
          "本案为原创教学虚构。陶然在车站遗失自有手表，拾得人梁亦未经陶然同意将表卖给一家具有旧表经营资格的店。2026年1月，顾宁在该店正常营业时以5000元购入并取走手表，取得载明5000元价款的收据；同款同成色旧表的当地市价为4800至5200元。顾宁购买时不知道手表系遗失物。2026年2月陶然首次得知顾宁是受让人，3月要求顾宁无偿返还；顾宁只要求陶然偿付已付的5000元购价。",
        hint: "结合本案事实说明判断即可。",
        sources: ["civil-property-lost-law"],
        id: "civil-property-lost-dealer-choice",
        kind: "objective",
        choiceMode: "single",
        title: "正规旧表店售出的遗失物能否无偿取回？",
        prompt: "关于陶然取回手表，哪项正确？",
        options: [
          {
            id: "a",
            text: "只能向拾得人索赔，不能再向顾宁请求返还。",
            explanation: "二年内向受让人请求返还仍是第312条规定的途径。",
          },
          {
            id: "b",
            text: "可以无偿取回，凡是遗失物都不需要向受让人支付费用。",
            explanation: "遗漏了向具有经营资格的经营者购得时的费用偿付例外。",
          },
          {
            id: "c",
            text: "可以请求返还，但应向顾宁偿付已经支付的5000元购入费用。",
            explanation: "本案在二年期间内，且顾宁通过合格经营者正常购入。",
          },
          {
            id: "d",
            text: "二年应从遗失当天算，知道受让人的时间不影响起算。",
            explanation: "向受让人追回的二年自知道或者应当知道受让人起算。",
          },
        ],
        answer: "c",
        reference:
          "选C。陶然知道顾宁后一个月即请求返还，仍可追回；但顾宁是从有经营资格的旧表店正常购得，陶然取回时应偿付其已付的5000元购入费用，不能要求无偿返还。",
      },
      {
        caseId: "civil-property-case-lost-dealer",
        relatedTopicIds: ["civil-goodfaith-lost"],
        facts:
          "本案为原创教学虚构。陶然在车站遗失自有手表，拾得人梁亦未经陶然同意将表卖给一家具有旧表经营资格的店。2026年1月，顾宁在该店正常营业时以5000元购入并取走手表，取得载明5000元价款的收据；同款同成色旧表的当地市价为4800至5200元。顾宁购买时不知道手表系遗失物。2026年2月陶然首次得知顾宁是受让人，3月要求顾宁无偿返还；顾宁只要求陶然偿付已付的5000元购价。",
        hint: "结合本案事实说明判断即可。",
        sources: ["civil-property-lost-law"],
        id: "civil-property-lost-dealer-explain",
        kind: "subjective",
        title: "说明遗失物追回中的购入费用例外",
        prompt:
          "陶然能否要求顾宁无偿返还？请同时说明能否追回以及5000元购价应如何处理。",
        answer: "",
        reference:
          "陶然可以追回，但不能要求无偿返还。知道顾宁后仅一个月提出请求，没有超过二年；顾宁从具有经营资格的旧表店正常购得，陶然请求返还时应向其偿付已经支付的5000元购入费用。",
        criteria: [
          {
            id: "civil-property-lost-dealer-return",
            label: "判断二年内仍可追回",
            meaning:
              "联系陶然知道受让人后一个月请求返还，说明即使顾宁正常购入，陶然仍可依法追回遗失物。",
            acceptable:
              "认可法律含义相同、能联系本案事实的自然表达，不要求固定词句或条号。",
            boundary: "不要求分析超过二年或第三人的其他请求权。",
          },
          {
            id: "civil-property-lost-dealer-fee",
            label: "适用经营者购入的费用偿付例外",
            meaning:
              "联系顾宁从有经营资格的旧表店购得、已付5000元，说明返还时陶然应偿付该购入费用，不能无偿取回。",
            acceptable:
              "认可法律含义相同、能联系本案事实的自然表达，不要求固定词句或条号。",
            boundary: "不要求计算未给出的附加费用或另答追偿程序。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-mortgage-creation",
    title: "抵押合同与抵押权设立",
    headline:
      "房屋抵押要登记才设权；普通动产抵押从合同生效设权，登记影响对抗。",
    goal: "房屋与普通动产的抵押，登记分别起什么作用？",
    prerequisite: "能区分合同约定、物权设立与权利实现。",
    minutes: "6–10",
    paragraphs: [
      "抵押通常不把财产交给债权人。房屋等不动产抵押，抵押权自登记时设立；只签合同或交出产权证，还没有设立房屋抵押权。没有登记本身不使已经有效的抵押合同无效。",
      "普通动产抵押，抵押权自抵押合同生效时设立；没有登记，不得对抗善意第三人。不能把房屋的登记设权规则照搬到机器等普通动产上，也不能把“无须交付”与动产质押混淆。",
    ],
    example: {
      title: "交出房产证，抵押权就设立了吗？",
      facts:
        "本案为原创教学虚构。赵舒向陶言借款30万元，双方为成年人，借款有效，款项已经交付。赵舒以其有权处分的自有商品房提供抵押，双方签署的书面抵押合同已生效，没有其他效力问题。赵舒把产权证原件交给陶言保管，但一直没有办理抵押登记。",
      analysis:
        "陶言尚未取得房屋抵押权，因为还没有办理抵押登记。交出产权证只是在保管证件，不能代替登记。抵押合同本身已经有效，未登记不会仅因此使它无效。",
    },
    pitfall: "把抵押合同有效、抵押权设立和登记对抗当作同一件事。",
    recall: {
      prompt: "房屋与普通动产的抵押，登记分别起什么作用？",
      reference:
        "房屋抵押登记设权；普通动产抵押合同生效设权，未登记不得对抗善意第三人。",
    },
    sources: ["civil-property-mortgage-creation"],
    exercises: [
      {
        caseId: "CIV-PROPERTY-MORTGAGE-HOUSE",
        relatedTopicIds: ["civil-mortgage-creation"],
        facts:
          "本案为原创教学虚构。赵舒向陶言借款30万元，双方为成年人，借款有效，款项已经交付。赵舒以其有权处分的自有商品房提供抵押，双方签署的书面抵押合同已生效，没有其他效力问题。赵舒把产权证原件交给陶言保管，但一直没有办理抵押登记。",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: ["civil-property-mortgage-creation"],
        id: "civil-property-mortgage-house-choice",
        kind: "objective",
        title: "交出房产证，抵押权就设立了吗？",
        prompt: "以下哪些判断正确？",
        choiceMode: "multiple",
        answer: "b,d",
        options: [
          {
            id: "a",
            text: "抵押合同生效当天，房屋抵押权即已设立。",
            explanation: "房屋抵押适用登记设立，不只看合同。",
          },
          {
            id: "b",
            text: "陶言尚未取得本案房屋抵押权。",
            explanation: "尚无抵押登记，交证不替代登记。",
          },
          {
            id: "c",
            text: "未办理登记，使已经生效的抵押合同自动无效。",
            explanation: "合同效力与抵押权设立分别判断。",
          },
          {
            id: "d",
            text: "交出产权证不能代替抵押登记，未登记本身不否定抵押合同效力。",
            explanation: "既保留有效合同，也正确识别房屋抵押尚未设权。",
          },
        ],
        reference:
          "选B、D。房屋抵押权须办理抵押登记才设立，交出产权证不能代替登记。这里未登记的是抵押权，已经有效的抵押合同不会只因未登记而失效。",
        correctChoices: ["b", "d"],
      },
      {
        caseId: "CIV-PROPERTY-MORTGAGE-HOUSE",
        relatedTopicIds: ["civil-mortgage-creation"],
        facts:
          "本案为原创教学虚构。赵舒向陶言借款30万元，双方为成年人，借款有效，款项已经交付。赵舒以其有权处分的自有商品房提供抵押，双方签署的书面抵押合同已生效，没有其他效力问题。赵舒把产权证原件交给陶言保管，但一直没有办理抵押登记。",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: ["civil-property-mortgage-creation"],
        id: "civil-property-mortgage-house-explain",
        kind: "subjective",
        title: "区分房屋抵押合同与抵押权",
        prompt:
          "陶言是否已经取得房屋抵押权？交出产权证和未登记，对本案抵押合同效力有什么影响？",
        answer: "",
        reference:
          "陶言尚未取得房屋抵押权，因为还没有办理抵押登记。交出产权证只是在保管证件，不能代替登记。抵押合同本身已经有效，未登记不会仅因此使它无效。",
        criteria: [
          {
            id: "mortgage-house-registration",
            label: "未登记尚未设立房屋抵押权",
            meaning:
              "联系房屋未办理抵押登记，说明陶言尚无该抵押权，交证不能替代登记。",
            acceptable:
              "认可法律含义一致、能联系案情的自然表达，不要求固定词句或条号。",
            boundary: "不要求讨论陶言是否可占有房屋或借款到期后的全部救济。",
          },
          {
            id: "mortgage-house-contract",
            label: "保留抵押合同效力",
            meaning: "说明本案已生效的抵押合同不因未登记本身无效。",
            acceptable:
              "认可法律含义一致、能联系案情的自然表达，不要求固定词句或条号。",
            boundary: "不用另行证明题设已确认的其他合同效力条件。",
          },
        ],
      },
      {
        caseId: "CIV-PROPERTY-MORTGAGE-MACHINE",
        relatedTopicIds: ["civil-mortgage-creation"],
        facts:
          "本案为原创教学虚构。成年人程澈向沈桐借款5万元用于支付日常开支，借款已经交付。程澈以其自有的一台普通车床提供抵押，双方签署的书面抵押合同于2026年6月1日生效。车床仍留在程澈车间供其使用，未办理动产抵押登记。本问只判断双方之间抵押权是否设立，不涉及第三人对抗。",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: ["civil-property-mortgage-creation"],
        id: "civil-property-mortgage-machine-choice",
        kind: "objective",
        title: "机器没交出去，也没有登记",
        prompt: "下列哪项判断正确？",
        choiceMode: "single",
        answer: "c",
        options: [
          {
            id: "a",
            text: "必须把车床交给沈桐，抵押权才设立。",
            explanation: "把动产质押的交付设立规则用到了抵押。",
          },
          {
            id: "b",
            text: "必须办理登记，车床抵押权才设立。",
            explanation: "普通动产抵押自合同生效设立，不同于房屋抵押。",
          },
          {
            id: "c",
            text: "6月1日抵押合同生效时，抵押权已经设立。",
            explanation: "对应第403条，未交付和未登记不阻止本案双方间设权。",
          },
          {
            id: "d",
            text: "程澈继续使用车床，使抵押合同不能生效。",
            explanation: "抵押本就通常不转移占有，继续使用不产生这种结论。",
          },
        ],
        reference:
          "选C。车床属于普通动产，抵押权从6月1日抵押合同生效时设立，不须交付车床或先登记。未登记影响对抗善意第三人，不是本案双方间尚未设权。",
      },
      {
        caseId: "CIV-PROPERTY-MORTGAGE-MACHINE",
        relatedTopicIds: ["civil-mortgage-creation"],
        facts:
          "本案为原创教学虚构。成年人程澈向沈桐借款5万元用于支付日常开支，借款已经交付。程澈以其自有的一台普通车床提供抵押，双方签署的书面抵押合同于2026年6月1日生效。车床仍留在程澈车间供其使用，未办理动产抵押登记。本问只判断双方之间抵押权是否设立，不涉及第三人对抗。",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: ["civil-property-mortgage-creation"],
        id: "civil-property-mortgage-machine-explain",
        kind: "subjective",
        title: "普通动产抵押为何不同于房屋",
        prompt:
          "本案车床抵押权是否已设立，何时设立？车床仍由程澈使用、尚未登记是否改变这一判断？",
        answer: "",
        reference:
          "抵押权已于6月1日合同生效时设立。车床是普通动产，适用第403条，不以交付或登记为设立条件。程澈继续使用车床、尚未登记，都不改变本案双方之间已经设权的判断。",
        criteria: [
          {
            id: "mortgage-machine-contract",
            label: "动产抵押合同生效即设权",
            meaning:
              "联系车床为普通动产及合同6月1日生效，说明抵押权此时已经设立。",
            acceptable:
              "认可法律含义一致、能联系案情的自然表达，不要求固定词句或条号。",
            boundary: "不要求背条号，时间可用“合同生效时”表达。",
          },
          {
            id: "mortgage-machine-possession",
            label: "未交付未登记不阻止本案双方间设权",
            meaning:
              "区分抵押与质押、登记设立，说明继续使用及未登记不影响这里已设权。",
            acceptable:
              "认可法律含义一致、能联系案情的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求回答未出现的第三人争议；不得因此声称未登记可对抗任何第三人。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-mortgage-priority",
    title: "同一财产多项抵押的顺位",
    headline: "先看登记；均登记看登记先后，均未登记按债权比例。",
    goal: "同一财产有数项抵押，排序先看什么？",
    prerequisite: "能区分合同约定、物权设立与权利实现。",
    minutes: "6–10",
    paragraphs: [
      "同一财产向多个债权人抵押时，已登记的抵押权按登记时间先后受偿；已登记的先于未登记的受偿。不是谁先借钱、先签合同，谁就一定排第一。",
      "若同一普通动产上的数项抵押权均未登记，依债权比例分配，而不按合同先后排队。本组只比较两项普通抵押，不加入留置、价款优先等其他顺位，也不改变题设已经给定的可分配净额。",
    ],
    example: {
      title: "先签合同，却后登记",
      facts:
        "本案为原创教学虚构。成年人方晴以同一套自有商品房分别为两笔普通借款设抵押。与梁森的合同4月1日生效、抵押登记5月1日完成；与赵宁的合同4月10日生效、抵押登记4月12日完成。两项抵押均合法有效，债权均已到期。本问仅比较这两项抵押权顺位，没有顺位变更或其他优先权。",
      analysis:
        "赵宁的抵押权顺位在先。他在4月12日完成登记，早于梁森的5月1日。同一房屋上的抵押权都已登记，应按登记先后排序，不能只看谁先签合同。",
    },
    pitfall: "只按签合同先后排序，或把均未登记当成谁也没有抵押权。",
    recall: {
      prompt: "同一财产有数项抵押，排序先看什么？",
      reference: "登记优先；均登记按登记时间，均未登记按债权比例。",
    },
    sources: ["civil-property-mortgage-priority"],
    exercises: [
      {
        caseId: "CIV-PROPERTY-MORTGAGE-ORDER",
        relatedTopicIds: ["civil-mortgage-priority"],
        facts:
          "本案为原创教学虚构。成年人方晴以同一套自有商品房分别为两笔普通借款设抵押。与梁森的合同4月1日生效、抵押登记5月1日完成；与赵宁的合同4月10日生效、抵押登记4月12日完成。两项抵押均合法有效，债权均已到期。本问仅比较这两项抵押权顺位，没有顺位变更或其他优先权。",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: ["civil-property-mortgage-priority"],
        id: "civil-property-mortgage-order-choice",
        kind: "objective",
        title: "先签合同，却后登记",
        prompt: "下列哪项判断正确？",
        choiceMode: "single",
        answer: "a",
        options: [
          {
            id: "a",
            text: "赵宁的抵押权顺位在梁森之前，因为赵宁先完成登记。",
            explanation: "同一财产已登记的抵押权依登记先后排序。",
          },
          {
            id: "b",
            text: "梁森的抵押权顺位在先，因为其合同先签。",
            explanation: "合同时间不替代登记时间。",
          },
          {
            id: "c",
            text: "两项都登记了，因此不论登记先后均按债权比例。",
            explanation: "按比例适用于这里均未登记的情形，不是均登记。",
          },
          {
            id: "d",
            text: "5月1日后登记会覆盖先登记的抵押权。",
            explanation: "后登记不会自动消灭或覆盖先登记。",
          },
        ],
        reference:
          "选A。赵宁4月12日先完成登记，排在5月1日登记的梁森之前。梁森虽先签合同，仍不能以合同先后替代登记先后。",
      },
      {
        caseId: "CIV-PROPERTY-MORTGAGE-ORDER",
        relatedTopicIds: ["civil-mortgage-priority"],
        facts:
          "本案为原创教学虚构。成年人方晴以同一套自有商品房分别为两笔普通借款设抵押。与梁森的合同4月1日生效、抵押登记5月1日完成；与赵宁的合同4月10日生效、抵押登记4月12日完成。两项抵押均合法有效，债权均已到期。本问仅比较这两项抵押权顺位，没有顺位变更或其他优先权。",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: ["civil-property-mortgage-priority"],
        id: "civil-property-mortgage-order-explain",
        kind: "subjective",
        title: "用登记日期确定抵押顺位",
        prompt:
          "梁森与赵宁哪一项抵押权在先？请说明为什么不按合同生效日期排序。",
        answer: "",
        reference:
          "赵宁的抵押权顺位在先。他在4月12日完成登记，早于梁森的5月1日。同一房屋上的抵押权都已登记，应按登记先后排序，不能只看谁先签合同。",
        criteria: [
          {
            id: "mortgage-order-registration",
            label: "按登记先后认定赵宁在先",
            meaning:
              "联系4月12日早于5月1日，说明赵宁登记顺位在先，不按4月1日与4月10日的合同时间排序。",
            acceptable:
              "认可法律含义一致、能联系案情的自然表达，不要求固定词句或条号。",
            boundary: "只要求顺位，不要求计算拍卖分配或评价债权金额。",
          },
        ],
      },
      {
        caseId: "CIV-PROPERTY-MORTGAGE-PROPORTION",
        relatedTopicIds: ["civil-mortgage-priority"],
        facts:
          "本案为原创教学虚构。成年人季远以同一台自有普通车床，为向顾杉借的6万元和向贺清借的3万元分别签订有效抵押合同。两笔普通借款已交付、现均到期，两项动产抵押均未登记，没有顺位变更。车床依法变价后，可在这两项抵押之间分配的净额为6万元；本题不涉及其他优先权或费用。顾杉提出：“我的合同签得早，应先拿满6万元。”",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: ["civil-property-mortgage-priority"],
        id: "civil-property-mortgage-proportion-choice",
        kind: "objective",
        title: "两项都没登记，净价款怎样分？",
        prompt: "下列哪项判断正确？",
        choiceMode: "single",
        answer: "c",
        options: [
          {
            id: "a",
            text: "顾杉先拿6万元，贺清不能分得价款。",
            explanation: "均未登记时按债权比例，而非合同先后。",
          },
          {
            id: "b",
            text: "两项抵押都不存在，只能由季远自由决定给谁。",
            explanation: "普通动产抵押合同已生效设权，不能因未登记就说不存在。",
          },
          {
            id: "c",
            text: "按6∶3的债权比例，顾杉分4万元，贺清分2万元。",
            explanation: "均未登记按2∶1分配可供两项抵押清偿的6万元。",
          },
          {
            id: "d",
            text: "不论债权金额，两名债权人各分3万元。",
            explanation: "第414条用债权比例，不是人数均分。",
          },
        ],
        reference:
          "选C。两项普通动产抵押均未登记，按债权6∶3，即2∶1分配6万元净额，顾杉4万元、贺清2万元。顾杉先签合同不能使其独占价款。",
      },
      {
        caseId: "CIV-PROPERTY-MORTGAGE-PROPORTION",
        relatedTopicIds: ["civil-mortgage-priority"],
        facts:
          "本案为原创教学虚构。成年人季远以同一台自有普通车床，为向顾杉借的6万元和向贺清借的3万元分别签订有效抵押合同。两笔普通借款已交付、现均到期，两项动产抵押均未登记，没有顺位变更。车床依法变价后，可在这两项抵押之间分配的净额为6万元；本题不涉及其他优先权或费用。顾杉提出：“我的合同签得早，应先拿满6万元。”",
        hint: "结合本问事实，说明结论及关键理由。",
        sources: ["civil-property-mortgage-priority"],
        id: "civil-property-mortgage-proportion-explain",
        kind: "subjective",
        title: "说明均未登记的抵押如何分配",
        prompt:
          "顾杉主张先拿满6万元是否正确？请说明分配规则，并算出顾杉、贺清各分多少。",
        answer: "",
        reference:
          "不正确。两项动产抵押均未登记，应依第414条按债权比例清偿，而不是按签约先后。债权6∶3为2∶1，所以6万元净额中，顾杉分4万元、贺清分2万元。",
        criteria: [
          {
            id: "mortgage-proportion-rule",
            label: "均未登记按债权比例",
            meaning:
              "联系两项动产抵押均未登记，否定顾杉先签合同就先拿满，说明应按债权比例分。",
            acceptable:
              "认可法律含义一致、能联系案情的自然表达，不要求固定词句或条号。",
            boundary: "不要求讨论未受偿部分另向季远追索或其他普通债权人。",
          },
          {
            id: "mortgage-proportion-amount",
            label: "按2比1分为4万与2万",
            meaning:
              "根据6万元与3万元债权比例，把可分配净额6万元分为顾杉4万元、贺清2万元。",
            acceptable:
              "认可法律含义一致、能联系案情的自然表达，不要求固定词句或条号。",
            boundary:
              "金额与比例等义即可，不要求列算式；不擅自再扣题设已排除的费用。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-pledge-delivery",
    title: "动产质权的交付设立",
    headline: "写了质押合同，还要把动产交给债权人占有。",
    goal: "根据签约与实际交付的先后判断动产质权是否设立。",
    prerequisite: "知道质押担保债务履行，不等于把物卖给债权人。",
    minutes: "5–8",
    paragraphs: [
      "以普通动产设立质权，应订立书面质押合同；质权自出质人交付质押财产时设立。合同约定与质权设立是两件事，不能只看到合同写了“质押”就认定已经有质权。",
      "物品一直留在出质人手中使用，仅承诺以后交付，质权尚未设立。债务到期未还，也不能替代此前未完成的交付。权利质押有另外的公示规则，本组判断普通动产的实际交付。",
    ],
    example: {
      title: "先签合同，后交小提琴，质权何时设立？",
      facts:
        "本案为原创教学虚构。2026年6月3日，易安向何澄借款1万元并收到借款，双方当天签订书面质押合同，约定以易安自有的小提琴担保该借款。签约后小提琴仍由易安保管使用。6月10日，易安按约把小提琴实际交给何澄，何澄将琴放入自己家中保管。",
      analysis:
        "6月10日设立。动产质权自质押财产交付时设立；6月3日虽签了书面合同，小提琴仍由易安保管使用，直到6月10日实际交给何澄才完成交付。",
    },
    pitfall: "把书面合同签字或债务到期，当作未交付动产的质权设立时间。",
    recall: {
      prompt: "普通动产的质押合同与质权设立时间怎样区分？",
      reference:
        "书面合同约定质押，质权则自质押财产交付时设立；未交付不能只凭签字认定已有质权。",
    },
    sources: ["civil-property-pledge-law"],
    exercises: [
      {
        caseId: "civil-property-case-pledge-violin",
        relatedTopicIds: ["civil-pledge-delivery"],
        facts:
          "本案为原创教学虚构。2026年6月3日，易安向何澄借款1万元并收到借款，双方当天签订书面质押合同，约定以易安自有的小提琴担保该借款。签约后小提琴仍由易安保管使用。6月10日，易安按约把小提琴实际交给何澄，何澄将琴放入自己家中保管。",
        hint: "结合本案事实说明判断即可。",
        sources: ["civil-property-pledge-law"],
        id: "civil-property-pledge-violin-choice",
        kind: "objective",
        choiceMode: "single",
        title: "先签合同，后交小提琴，质权何时设立？",
        prompt: "何澄对小提琴的质权于何时设立？",
        options: [
          {
            id: "a",
            text: "6月10日，易安实际交付小提琴时。",
            explanation: "动产质权自出质人交付质押财产时设立。",
          },
          {
            id: "b",
            text: "6月3日，书面质押合同签字时。",
            explanation: "仅订立合同还不能代替交付。",
          },
          {
            id: "c",
            text: "借款到期且易安不还款时。",
            explanation: "债务到期不履行关系到质权实现，不是本案质权设立时点。",
          },
          {
            id: "d",
            text: "为小提琴办理所有权转移登记时。",
            explanation: "本案普通动产质押以交付设立，也不要求转移所有权登记。",
          },
        ],
        answer: "a",
        reference:
          "选A。质权在6月10日小提琴实际交给何澄时设立。6月3日只是签订质押合同，易安当时仍保管使用该琴，还没有完成质物交付。",
      },
      {
        caseId: "civil-property-case-pledge-violin",
        relatedTopicIds: ["civil-pledge-delivery"],
        facts:
          "本案为原创教学虚构。2026年6月3日，易安向何澄借款1万元并收到借款，双方当天签订书面质押合同，约定以易安自有的小提琴担保该借款。签约后小提琴仍由易安保管使用。6月10日，易安按约把小提琴实际交给何澄，何澄将琴放入自己家中保管。",
        hint: "结合本案事实说明判断即可。",
        sources: ["civil-property-pledge-law"],
        id: "civil-property-pledge-violin-explain",
        kind: "subjective",
        title: "区分签约与交付的时间",
        prompt: "何澄对小提琴的质权何时设立？为什么不是双方签字当天？",
        answer: "",
        reference:
          "6月10日设立。动产质权自质押财产交付时设立；6月3日虽签了书面合同，小提琴仍由易安保管使用，直到6月10日实际交给何澄才完成交付。",
        criteria: [
          {
            id: "civil-property-pledge-violin-time",
            label: "联系实际交付认定设立时间",
            meaning:
              "明确质权于6月10日交付时设立，并用6月3日仍由易安保管的事实说明签合同不等于质权设立。",
            acceptable:
              "认可法律含义相同、能联系本案事实的自然表达，不要求固定词句或条号。",
            boundary: "不要求另答合同效力、登记或实现质权的程序。",
          },
        ],
      },
      {
        caseId: "civil-property-case-pledge-projector",
        relatedTopicIds: ["civil-pledge-delivery"],
        facts:
          "本案为原创教学虚构。2026年4月，成年林序向方敏借款5000元并收到款项，双方同时签署书面质押合同，约定以林序自有的一台投影仪担保。合同写明次日把投影仪交给方敏保管，但林序一直将它留在家中使用，方敏从未接收。9月借款到期未还，方敏以合同已签字为由主张自己对该投影仪享有质权。",
        hint: "结合本案事实说明判断即可。",
        sources: ["civil-property-pledge-law"],
        id: "civil-property-pledge-projector-choice",
        kind: "objective",
        choiceMode: "single",
        title: "合同已写质押，投影仪却一直没有交出",
        prompt: "方敏的质权主张是否成立？",
        options: [
          {
            id: "a",
            text: "成立，因为书面合同写明了投影仪。",
            explanation: "约定出质标的不能代替实际交付。",
          },
          {
            id: "b",
            text: "不成立，投影仪始终未交付，质权尚未设立。",
            explanation: "本案只有合同约定，没有完成动产质权的设立要件。",
          },
          {
            id: "c",
            text: "成立，借款一到期，未交付的质物也自动设立质权。",
            explanation: "借款到期不能补足质物未交付。",
          },
          {
            id: "d",
            text: "不成立，因为所有动产都只能抵押，不能质押。",
            explanation: "可依法转让的普通动产可以设立质权。",
          },
        ],
        answer: "b",
        reference:
          "选B。投影仪一直由林序保管使用，方敏没有接收，动产质权尚未设立。合同写明质押和借款已经到期，都不能替代交付。",
      },
      {
        caseId: "civil-property-case-pledge-projector",
        relatedTopicIds: ["civil-pledge-delivery"],
        facts:
          "本案为原创教学虚构。2026年4月，成年林序向方敏借款5000元并收到款项，双方同时签署书面质押合同，约定以林序自有的一台投影仪担保。合同写明次日把投影仪交给方敏保管，但林序一直将它留在家中使用，方敏从未接收。9月借款到期未还，方敏以合同已签字为由主张自己对该投影仪享有质权。",
        hint: "结合本案事实说明判断即可。",
        sources: ["civil-property-pledge-law"],
        id: "civil-property-pledge-projector-explain",
        kind: "subjective",
        title: "投影仪质押合同签字之后",
        prompt:
          "方敏能否仅凭签字的质押合同和借款到期，主张投影仪上已设立质权？请说明。",
        answer: "",
        reference:
          "不能。动产质权以交付质押财产为设立条件，投影仪始终由林序保管使用，未交给方敏，所以质权尚未设立。签字和借款到期都不能替代交付。",
        criteria: [
          {
            id: "civil-property-pledge-projector-result",
            label: "联系未交付否定质权设立",
            meaning:
              "联系投影仪一直由林序保管使用、方敏未接收，说明仅有书面合同及债务到期不产生本案质权。",
            acceptable:
              "认可法律含义相同、能联系本案事实的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求否定借款或质押合同的效力，也不要求讨论其他追债方式。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-lien-retention",
    title: "普通留置的占有、到期与关联",
    headline:
      "物在手里、对方欠钱，还要看占有是否合法、债权是否到期及是否同一关系。",
    goal: "区分本次修理费留置与无关联旧个人借款。",
    prerequisite: "知道送修占有与所有权不是一回事。",
    minutes: "6–10",
    paragraphs: [
      "债务人不履行到期债务时，债权人可以依法留置已经合法占有的债务人动产。普通留置要求动产与债权属于同一法律关系；法律规定或当事人约定不得留置的，不得留置。留置不需要另签质押合同。",
      "修理者因修理合法占有车辆，本次到期修理费未付，可以留置；修理费已清，不能仅因车主另外欠一笔无关私人借款就留置车辆。企业之间留置另有例外，不能套给普通自然人之间的私人欠款。",
    ],
    example: {
      title: "修好车却不付修理费，是否可以留置？",
      facts:
        "本案为原创教学虚构。梁柯将自有电动自行车交给自然人顾和修理。双方约定，车辆修好当天支付800元修理费并取车，没有排除留置的约定。顾和按约修好车辆，通知梁柯来取。梁柯当日要求把车取走，却明确拒绝支付已到期的800元修理费，并说“我们没有签质押合同，你不能留我的车”。",
      analysis:
        "可以留置。顾和依送修约定合法占有梁柯的车，本次800元修理费已到期未付，车与债权属于同一修理关系，也没有排除留置的约定。留置依法律规定发生，不需要另外签质押合同。",
    },
    pitfall: "只看到欠款和占有，漏掉到期、合法占有与同一法律关系。",
    recall: {
      prompt: "普通修理留置要联系哪些条件？",
      reference:
        "合法占有债务人的动产，本次修理债权到期未付，动产与债权属于同一修理关系，且没有法律或约定的留置禁止。",
    },
    sources: ["civil-property-lien-law"],
    exercises: [
      {
        caseId: "civil-property-case-lien-repair",
        relatedTopicIds: ["civil-lien-retention"],
        facts:
          "本案为原创教学虚构。梁柯将自有电动自行车交给自然人顾和修理。双方约定，车辆修好当天支付800元修理费并取车，没有排除留置的约定。顾和按约修好车辆，通知梁柯来取。梁柯当日要求把车取走，却明确拒绝支付已到期的800元修理费，并说“我们没有签质押合同，你不能留我的车”。",
        hint: "结合本案事实说明判断即可。",
        sources: ["civil-property-lien-law"],
        id: "civil-property-lien-repair-choice",
        kind: "objective",
        choiceMode: "single",
        title: "修好车却不付修理费，是否可以留置？",
        prompt: "关于顾和对该车的留置，哪项正确？",
        options: [
          {
            id: "a",
            text: "不能留置，因为双方没有签质押合同。",
            explanation: "留置权依法发生，不以另行签订质押合同为必要。",
          },
          {
            id: "b",
            text: "不能留置，因为只有借款债权才能受担保。",
            explanation: "修理费等到期债权也可能符合留置的条件。",
          },
          {
            id: "c",
            text: "顾和只要占有车辆，就可以为梁柯欠他的任何款项留置。",
            explanation: "普通留置还要求动产与债权属于同一法律关系。",
          },
          {
            id: "d",
            text: "可以为本次到期修理费留置，车辆系送修时合法占有，债权与车辆属于同一修理关系。",
            explanation: "本案具备普通留置的相应条件。",
          },
        ],
        answer: "d",
        reference:
          "选D。顾和因梁柯送修而合法占有车辆，800元本次修理费已到期未付，车辆与债权属于同一修理关系，可以留置。没有另签质押合同不妨碍这一法定留置权。",
      },
      {
        caseId: "civil-property-case-lien-repair",
        relatedTopicIds: ["civil-lien-retention"],
        facts:
          "本案为原创教学虚构。梁柯将自有电动自行车交给自然人顾和修理。双方约定，车辆修好当天支付800元修理费并取车，没有排除留置的约定。顾和按约修好车辆，通知梁柯来取。梁柯当日要求把车取走，却明确拒绝支付已到期的800元修理费，并说“我们没有签质押合同，你不能留我的车”。",
        hint: "结合本案事实说明判断即可。",
        sources: ["civil-property-lien-law"],
        id: "civil-property-lien-repair-explain",
        kind: "subjective",
        title: "回应“没有质押合同就不能留车”",
        prompt:
          "顾和能否为这800元修理费留置车辆？梁柯所说未签质押合同是否影响判断？请说明。",
        answer: "",
        reference:
          "可以留置。顾和依送修约定合法占有梁柯的车，本次800元修理费已到期未付，车与债权属于同一修理关系，也没有排除留置的约定。留置依法律规定发生，不需要另外签质押合同。",
        criteria: [
          {
            id: "civil-property-lien-repair-possession-debt",
            label: "联系合法占有与到期债权",
            meaning:
              "用梁柯自愿送修、顾和已修好及修理费当日到期未付的事实，说明合法占有债务人动产和到期债权条件具备。",
            acceptable:
              "认可法律含义相同、能联系本案事实的自然表达，不要求固定词句或条号。",
            boundary: "不要求补充未给出的修理争议或举证问题。",
          },
          {
            id: "civil-property-lien-repair-relation",
            label: "联系同一修理关系认定留置",
            meaning:
              "说明车辆与本次修理费属于同一修理关系，因此顾和可以留置；未另签质押合同不是障碍。",
            acceptable:
              "认可法律含义相同、能联系本案事实的自然表达，不要求固定词句或条号。",
            boundary: "只判断能否留置，不要求变价、宽限期间或担保竞合。",
          },
        ],
      },
      {
        caseId: "civil-property-case-lien-personal-loan",
        relatedTopicIds: ["civil-lien-retention"],
        facts:
          "本案为原创教学虚构。姜海与傅景均以个人身份往来，不涉及企业。姜海依约接收傅景的自有自行车修理，修好后傅景已付清全部300元修理费。此前傅景另向姜海借过2000元，该私人借款已到期未还，与修理合同无关，双方也没有约定以自行车担保该借款。姜海因车仍在自己手中，主张为这2000元行使留置权，拒绝返还。",
        hint: "结合本案事实说明判断即可。",
        sources: ["civil-property-lien-law"],
        id: "civil-property-lien-personal-loan-choice",
        kind: "objective",
        choiceMode: "single",
        title: "修理费已付，能为旧个人借款扣住自行车吗？",
        prompt: "姜海能否以旧借款为由对自行车行使留置权？",
        options: [
          {
            id: "a",
            text: "能够，债权到期又占有债务人的动产就足够。",
            explanation: "普通留置还须满足同一法律关系。",
          },
          {
            id: "b",
            text: "能够，企业之间留置的例外可以适用于任何两个人。",
            explanation: "本案双方以个人身份往来，不属于企业之间留置。",
          },
          {
            id: "c",
            text: "不能，旧个人借款与自行车修理不是同一法律关系。",
            explanation: "本次修理费已付清，不能用无关私人借款成立本案留置权。",
          },
          {
            id: "d",
            text: "不能，因为修理者从来不能合法占有送修物。",
            explanation:
              "按约接收送修物属于合法占有，问题在于旧借款与该车缺少法定关联。",
          },
        ],
        answer: "c",
        reference:
          "选C。姜海虽因修理合法占有自行车，旧借款也已到期，但这笔借款与修理不是同一法律关系。本次修理费已经付清，双方又不是企业，姜海不能为该无关联个人借款对车行使留置权。",
      },
      {
        caseId: "civil-property-case-lien-personal-loan",
        relatedTopicIds: ["civil-lien-retention"],
        facts:
          "本案为原创教学虚构。姜海与傅景均以个人身份往来，不涉及企业。姜海依约接收傅景的自有自行车修理，修好后傅景已付清全部300元修理费。此前傅景另向姜海借过2000元，该私人借款已到期未还，与修理合同无关，双方也没有约定以自行车担保该借款。姜海因车仍在自己手中，主张为这2000元行使留置权，拒绝返还。",
        hint: "结合本案事实说明判断即可。",
        sources: ["civil-property-lien-law"],
        id: "civil-property-lien-personal-loan-explain",
        kind: "subjective",
        title: "说明合法占有为什么仍不够",
        prompt:
          "姜海称“车本来就在我手里，傅景又确实欠钱”，能否因此对自行车行使留置权？请说明。",
        answer: "",
        reference:
          "不能。合法占有车辆和借款到期还不足够；普通留置要求动产与债权属于同一法律关系。自行车因修理交来，本次修理费已付清，另外2000元私人借款与修理无关，且不属于企业之间留置，姜海不能据此留置该车。",
        criteria: [
          {
            id: "civil-property-lien-personal-loan-relation",
            label: "联系无关联个人借款否定留置",
            meaning:
              "联系修理费已清、旧借款与修理无关且双方均以个人身份往来，说明同一法律关系条件不具备，合法占有和借款到期不能单独成立本案留置权。",
            acceptable:
              "认可法律含义相同、能联系本案事实的自然表达，不要求固定词句或条号。",
            boundary:
              "不要求讨论其他债权救济、占有返还程序或企业例外的详细范围。",
          },
        ],
      },
    ],
  },
];

export const civilPropertyChapters = [
  {
    id: "CIV-COOWNERSHIP",
    title: "共有",
    section: "民法",
    topicIds: ["civil-ownership-disposition", "civil-ownership-preemption"],
  },
  {
    id: "CIV-GOODFAITH",
    title: "善意取得与遗失物",
    section: "民法",
    topicIds: ["civil-goodfaith-entrusted", "civil-goodfaith-lost"],
  },
  {
    id: "CIV-MORTGAGE",
    title: "抵押权",
    section: "民法",
    topicIds: ["civil-mortgage-creation", "civil-mortgage-priority"],
  },
  {
    id: "CIV-PLEDGE-RETENTION",
    title: "质押与留置",
    section: "民法",
    topicIds: ["civil-pledge-delivery", "civil-lien-retention"],
  },
];

export const civilPropertyExercises = civilPropertyTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilPropertyContentPack = {
  revision: civilPropertyRevision,
  snapshot: {
    topics: civilPropertyTopics,
    sources: civilPropertySources,
  },
};
export const civilPropertyDefaultQueues = {
  objective: civilPropertyExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilPropertyExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilPropertyQuestion(id: string) {
  const question = civilPropertyExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilPropertyTopicForQuestion(id: string) {
  return civilPropertyTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilPropertySameCaseQuestions(id: string) {
  const question = civilPropertyQuestion(id);
  return question
    ? structuredClone(
        civilPropertyExercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function civilPropertyChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilPropertyChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilPropertyTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
