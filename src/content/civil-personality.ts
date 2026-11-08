import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilPersonalityRevision = "civil-personality-2026-10-23.v1";

export const civilPersonalitySources: ContentSources = {
  "civil-personality-name1012": {
    title: "《民法典》第1012—1014条：姓名、名称与禁止假冒",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。两案分别为自然人姓名、法人名称，均无授权、无真实推荐或官方关系。只问盗用假冒及停止侵害，不问合同代理效力、商标专用权或赔偿数额。",
  },
  "civil-personality-alias1017": {
    title: "《民法典》第1017条：笔名、艺名、网名等保护",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。第一案持续公开使用且已有一定社会知名度，并足以混淆；第二案仅常见昵称相同，无相应知名度、指向性和公众混淆事实，只问能否直接套本条，不否定其他事实下可能受保护。",
  },
  "civil-personality-remedies995": {
    title: "《民法典》第995、1000条：停止侵害及消除影响",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。本批未让学生估算正式考试分或任意精神损害赔偿；停止侵害等请求不以先算出财产损失为必要前提。责任方式应与具体方式及影响范围相当，不要求无限范围道歉。",
  },
  "civil-personality-portrait1018": {
    title: "《民法典》第1018、1019条：肖像使用与肖像作品权利人",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。照片可以清楚识别成年自然人。第一案只同意证件照制作，不许可公开广告；作品著作权不能替代肖像同意。第二案为近距离个人肖像的首次公开展览，不是必要新闻、公共环境展示或个人范围欣赏，不能仅因不收费免责。",
  },
  "civil-personality-portrait1020": {
    title: "《民法典》第999、1020条：新闻报道合理使用肖像",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。新闻案只在报道所必需范围记录公开演练中人物行动，不附商品推荐；广告案把新闻画面移作代言，超出原用途。新闻报道不是永久、无限使用许可；不问作品著作权许可费用、AI合成或声音保护。",
  },
  "civil-personality-reputation1024": {
    title: "《民法典》第1024、1025条：名誉与新闻监督边界",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。普通诽谤案为明知无依据仍编造具体侵占事实并公开传播；监督案有已生效检查文书和完整核对，报道准确、不含侮辱，不以名誉受影响或营业下降就当然追责。只讨论名誉，不问隐私、刑事责任或损失额。",
  },
  "civil-personality-verification1026": {
    title: "《民法典》第1025、1026条：严重失实内容的合理核实",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。转载案为面向公共利益的食品安全报道，内容严重失实，来源匿名、无原始证据、报道不紧急且可低成本联系当事人核实，发布者未做任何核对。不是要求所有转发者保证绝对真实，也不把任何核实都等同充分。",
  },
  "civil-personality-correction1028": {
    title: "《民法典》第1028条：失实报道的及时更正或删除",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。证据已清楚证明报道张冠李戴并侵害名誉，权利人要求及时纠正失实，不问最终赔款多少。措施以消除本次侵害所必要为限，不要求连同所有真实、无关内容全部删除。",
  },
  "civil-personality-privacy1032": {
    title: "《民法典》第1032—1034条：私密空间、活动和信息",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。两案均为成年人，不含紧急保护、依法侦查等法定事由。维修人获准入户不等于可偷拍；诊断报告仅定向交朋友协助预约，不等于允许公开。未公开、内容真实或没有恶意都不自动排除隐私侵害；不让学生重做医学判断。",
  },
  "civil-personality-information1036": {
    title: "《民法典》第1034—1037条：个人信息与已公开信息的边界",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-23直接核读官方原文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。仅处理可识别自然人的联系方式，不提供真实电话号码。已公开信息仍须合理处理，明确拒绝等例外应审查；不把所有公开信息处理都说成必须重新同意。",
  },
  "civil-personality-pipl-public": {
    title: "《个人信息保护法》第13、27条：已公开信息与明确拒绝",
    url: "https://www.cac.gov.cn/2021-08/20/c_1631050028355286.htm",
    note: "2026-10-23直接核读官方原文。《个人信息保护法》2021-08-20通过，2021-11-01施行；国家网信办转载中国人大网正式全文。本人为花店订单公开个人联络电话，培训机构无交易、订阅或其他处理基础；本问重点是明确拒绝后的招生营销。依法应履行义务等其他处理基础不在本案内，不能将结论扩大到一切公开信息。",
  },
  "civil-personality-pipl-withdraw": {
    title: "《个人信息保护法》第14、15、47条：撤回同意与删除",
    url: "https://www.cac.gov.cn/2021-08/20/c_1631050028355286.htm",
    note: "2026-10-23直接核读官方原文。《个人信息保护法》2021-08-20通过，2021-11-01施行；国家网信办转载中国人大网正式全文。可选兴趣标签仅以同意为基础，不涉及履约必需订单记录、法定留存、敏感信息或未成年人。先前知情自愿明确的处理合法，撤回后无其他处理基础，且可技术删除，无第47条保留存储的例外。撤回不溯及已依法完成的先前处理。",
  },
};

export const civilPersonalityTopics: FaultTopic[] = [
  {
    id: "civil-name-use",
    title: "姓名与名称的使用",
    headline:
      "自然人姓名、公司名称都受保护；没有授权，不能冒充本人推荐或官方发布。",
    goal: "书店是否侵犯陆宁姓名权？陆宁能否要求停止这项使用？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "自然人有权依法使用或许可他人使用自己的姓名；法人、非法人组织有名称权。不能用干涉、盗用、假冒等方式侵害这些权利。",
      "把商品推荐写成某人亲自推荐、把通知包装成某公司官方发布，即使没有伪造证件，也可能构成盗用或假冒。要求停止这类使用，不必先算出一笔财产损失。",
    ],
    example: {
      title: "海报上的一句推荐",
      facts:
        "本案为原创教学虚构，发生于2026年9月。青禾书店在课程海报上写着“作家陆宁本人推荐本课程”，把陆宁的完整姓名放在醒目位置。陆宁没有参加该课程，也没有作出推荐或许可书店使用姓名；聊天记录和书店负责人陈述确认这一点。陆宁要求停止使用，书店称没有伪造他的身份证，也未收到陆宁具体损失金额，所以不必撤下。",
      analysis:
        "书店侵犯了陆宁的姓名权，应停止这项冒名推荐。它没有取得许可，却把推荐归给陆宁本人，已经超出正常提及姓名。有没有伪造身份证、陆宁是否先算出具体财产损失，都不是继续冒名使用的理由。",
    },
    pitfall:
      "只把姓名保护理解为户籍登记，或认为公司名称只有注册成商标才受保护。",
    recall: {
      prompt: "书店是否侵犯陆宁姓名权？陆宁能否要求停止这项使用？",
      reference:
        "自然人姓名、公司名称都受保护；没有授权，不能冒充本人推荐或官方发布。",
    },
    sources: ["civil-personality-name1012", "civil-personality-remedies995"],
    exercises: [
      {
        caseId: "civil-personality-name-false-endorsement",
        relatedTopicIds: ["civil-name-use"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾书店在课程海报上写着“作家陆宁本人推荐本课程”，把陆宁的完整姓名放在醒目位置。陆宁没有参加该课程，也没有作出推荐或许可书店使用姓名；聊天记录和书店负责人陈述确认这一点。陆宁要求停止使用，书店称没有伪造他的身份证，也未收到陆宁具体损失金额，所以不必撤下。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "书店侵犯了陆宁的姓名权，应停止这项冒名推荐。它没有取得许可，却把推荐归给陆宁本人，已经超出正常提及姓名。有没有伪造身份证、陆宁是否先算出具体财产损失，都不是继续冒名使用的理由。",
        sources: [
          "civil-personality-name1012",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-name-false-endorsement-choice",
        kind: "objective",
        choiceMode: "single",
        title: "海报上的一句推荐：选择判断",
        prompt: "书店是否侵犯陆宁姓名权？陆宁能否要求停止这项使用？",
        options: [
          {
            id: "a",
            text: "侵犯姓名权，应停止未经许可的冒名推荐",
            explanation: "第1012、1014条保护姓名的使用，不限于身份证件。",
          },
          {
            id: "b",
            text: "没有伪造身份证，就不可能侵犯姓名权",
            explanation: "姓名权不限于户籍和证件上的姓名。",
          },
          {
            id: "c",
            text: "只要没有算出具体损失，任何冒名宣传都可继续",
            explanation: "停止侵害不以先确定一笔财产赔偿为前提。",
          },
          {
            id: "d",
            text: "作家姓名一经发表作品就成为所有商家都能任意代言的资源",
            explanation: "公开姓名不等于无限许可商业推荐。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-personality-name-false-endorsement",
        relatedTopicIds: ["civil-name-use"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾书店在课程海报上写着“作家陆宁本人推荐本课程”，把陆宁的完整姓名放在醒目位置。陆宁没有参加该课程，也没有作出推荐或许可书店使用姓名；聊天记录和书店负责人陈述确认这一点。陆宁要求停止使用，书店称没有伪造他的身份证，也未收到陆宁具体损失金额，所以不必撤下。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "书店侵犯了陆宁的姓名权，应停止这项冒名推荐。它没有取得许可，却把推荐归给陆宁本人，已经超出正常提及姓名。有没有伪造身份证、陆宁是否先算出具体财产损失，都不是继续冒名使用的理由。",
        sources: [
          "civil-personality-name1012",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-name-false-endorsement-written",
        kind: "subjective",
        title: "海报上的一句推荐：写出分析",
        prompt:
          "书店是否侵犯陆宁姓名权？陆宁能否要求停止这项使用？请结合案情说明理由。",
        criteria: [
          {
            id: "name-endorsement-infringement",
            label: "未获许可的冒名推荐侵权",
            meaning:
              "联系未授权、未推荐却标为本人推荐，判断书店侵犯陆宁姓名权。",
            acceptable: "说不能用他的名字假装他亲自推荐，已经冒用了姓名即可。",
            boundary: "不要求另证伪造身份证、合同代理或商标侵权。",
          },
          {
            id: "name-endorsement-stop",
            label: "可以请求停止使用",
            meaning: "说明陆宁可要求停止冒名使用，不必先证明具体财产损失金额。",
            acceptable:
              "说海报应撤下或改掉虚假推荐，不能等算出赔多少才停止即可。",
            boundary: "不虚构精神损害数额或无限范围道歉。",
          },
        ],
      },
      {
        caseId: "civil-personality-name-fake-official-company",
        relatedTopicIds: ["civil-name-use"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。林禾注册网络账号，直接使用青澄设计有限公司的完整名称，并标注“本公司官方招聘”，发布由自己编造的招聘公告。该公司没有设立或授权该账号，账号发布者也不是其工作人员；读者已把公告当成公司的正式招聘。公司要求停用名称，林禾说公司全称尚未注册为商标，所以自己可以这样用。本题只问名称权。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不是。青澄设计有限公司本身享有名称权，不以全称注册为商标为前提。林禾未经授权冒充公司官方账号，已让读者误认招聘来自公司，应停止这种假冒名称的使用；本题无需先判断商标权。",
        sources: [
          "civil-personality-name1012",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-name-fake-official-company-choice",
        kind: "objective",
        choiceMode: "single",
        title: "挂着公司全称的账号：选择判断",
        prompt: "未注册商标是否意味着公司不能要求林禾停止假冒名称？",
        options: [
          {
            id: "a",
            text: "公司没有人格权益，任何人都可冒充公司官方账号",
            explanation: "法人依法享有名称权。",
          },
          {
            id: "b",
            text: "公司只有注册商标后才能保护名称",
            explanation: "名称权与商标权不是同一项权利。",
          },
          {
            id: "c",
            text: "公司可依名称权要求停止假冒，不以注册商标为前提",
            explanation: "对应第1013、1014条，结合官方身份冒充和混淆事实。",
          },
          {
            id: "d",
            text: "只要招聘公告没有收费，就必定不构成假冒名称",
            explanation: "是否收费不替代有无授权及假冒的判断。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-personality-name-fake-official-company",
        relatedTopicIds: ["civil-name-use"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。林禾注册网络账号，直接使用青澄设计有限公司的完整名称，并标注“本公司官方招聘”，发布由自己编造的招聘公告。该公司没有设立或授权该账号，账号发布者也不是其工作人员；读者已把公告当成公司的正式招聘。公司要求停用名称，林禾说公司全称尚未注册为商标，所以自己可以这样用。本题只问名称权。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不是。青澄设计有限公司本身享有名称权，不以全称注册为商标为前提。林禾未经授权冒充公司官方账号，已让读者误认招聘来自公司，应停止这种假冒名称的使用；本题无需先判断商标权。",
        sources: [
          "civil-personality-name1012",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-name-fake-official-company-written",
        kind: "subjective",
        title: "挂着公司全称的账号：写出分析",
        prompt:
          "未注册商标是否意味着公司不能要求林禾停止假冒名称？请结合案情说明理由。",
        criteria: [
          {
            id: "company-name-right",
            label: "法人依法享有名称权",
            meaning: "明确公司可以依名称权要求保护，不以注册商标为前提。",
            acceptable: "说公司名字本身受名称权保护，不必先有商标即可。",
            boundary: "不要求学生转入商标近似或反不正当竞争判断。",
          },
          {
            id: "company-name-false-official",
            label: "未经许可冒充官方应停止",
            meaning:
              "联系未授权、非员工却标注官方招聘并使读者误认，说明应停止假冒使用。",
            acceptable:
              "说这个账号让人当成公司官方，实际没授权，就该停止冒充即可。",
            boundary: "不判断招聘合同效力、诈骗犯罪或具体赔款。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-name-alias",
    title: "笔名与网名的保护",
    headline:
      "已有一定社会知名度、被冒用会造成公众混淆的笔名网名，可以参照姓名权保护；普通昵称相同不等于当然侵权。",
    goal: "陆宁能否就该笔名的冒用，参照姓名权规定请求保护？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "笔名、艺名、网名等具有一定社会知名度，被他人使用又足以使公众混淆时，参照姓名权、名称权的规定保护。关键是名称与特定主体的联系及混淆，不是是否写在身份证上。",
      "不能把一个常见昵称变成对所有同名使用者的排他权。仅有字面相同，缺少本条要求的知名度和混淆事实，不足以直接得出本条侵权结论。",
    ],
    example: {
      title: "读者熟悉的笔名",
      facts:
        "本案为原创教学虚构，发生于2026年9月。陆宁持续以“远岸书客”发表作品多年，出版合同、读者来信和媒体报道已使这个笔名与他形成稳定联系。青禾公司未经许可，用该笔名开设售课账号，自称由作者本人授课，还复制既有作品目录介绍账号；多名读者误以为是陆宁本人。公司只以该笔名没有登记为本名为由拒绝停用。",
      analysis:
        "可以。“远岸书客”已有一定社会知名度，也稳定指向陆宁；公司冒称作者本人授课，已经足以使读者混淆，可参照姓名权规定保护。不是身份证上的本名，不会让这类笔名失去保护。",
    },
    pitfall:
      "认为笔名没登记就毫无保护，或认为先起一个常见昵称就能禁止所有人使用。",
    recall: {
      prompt: "陆宁能否就该笔名的冒用，参照姓名权规定请求保护？",
      reference:
        "已有一定社会知名度、被冒用会造成公众混淆的笔名网名，可以参照姓名权保护；普通昵称相同不等于当然侵权。",
    },
    sources: ["civil-personality-alias1017"],
    exercises: [
      {
        caseId: "civil-personality-alias-known-writer",
        relatedTopicIds: ["civil-name-alias"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁持续以“远岸书客”发表作品多年，出版合同、读者来信和媒体报道已使这个笔名与他形成稳定联系。青禾公司未经许可，用该笔名开设售课账号，自称由作者本人授课，还复制既有作品目录介绍账号；多名读者误以为是陆宁本人。公司只以该笔名没有登记为本名为由拒绝停用。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可以。“远岸书客”已有一定社会知名度，也稳定指向陆宁；公司冒称作者本人授课，已经足以使读者混淆，可参照姓名权规定保护。不是身份证上的本名，不会让这类笔名失去保护。",
        sources: ["civil-personality-alias1017"],
        id: "civil-personality-alias-known-writer-choice",
        kind: "objective",
        choiceMode: "single",
        title: "读者熟悉的笔名：选择判断",
        prompt: "陆宁能否就该笔名的冒用，参照姓名权规定请求保护？",
        options: [
          {
            id: "a",
            text: "可以，但必须先把身份证改成该笔名才生效",
            explanation: "本条不要求先变更法定姓名。",
          },
          {
            id: "b",
            text: "可以；已有知名度且冒用足以混淆，应参照姓名权保护",
            explanation: "第1017条的知名度和公众混淆条件均有案情支持。",
          },
          {
            id: "c",
            text: "不可以，只有户口簿上的文字才受民法保护",
            explanation: "笔名、艺名、网名等可依法获得相应保护。",
          },
          {
            id: "d",
            text: "任何使用任何相同词语的人都必定侵犯陆宁权利",
            explanation: "保护仍以本条条件和具体使用方式为限。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-personality-alias-known-writer",
        relatedTopicIds: ["civil-name-alias"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁持续以“远岸书客”发表作品多年，出版合同、读者来信和媒体报道已使这个笔名与他形成稳定联系。青禾公司未经许可，用该笔名开设售课账号，自称由作者本人授课，还复制既有作品目录介绍账号；多名读者误以为是陆宁本人。公司只以该笔名没有登记为本名为由拒绝停用。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "可以。“远岸书客”已有一定社会知名度，也稳定指向陆宁；公司冒称作者本人授课，已经足以使读者混淆，可参照姓名权规定保护。不是身份证上的本名，不会让这类笔名失去保护。",
        sources: ["civil-personality-alias1017"],
        id: "civil-personality-alias-known-writer-written",
        kind: "subjective",
        title: "读者熟悉的笔名：写出分析",
        prompt:
          "陆宁能否就该笔名的冒用，参照姓名权规定请求保护？请结合案情说明理由。",
        criteria: [
          {
            id: "alias-known-protection",
            label: "符合条件的笔名可受保护",
            meaning: "明确可以参照姓名权保护，非本名未登记不当然排除。",
            acceptable:
              "说读者都知道这个笔名是他，用笔名发表多年也受保护即可。",
            boundary: "不要求更改身份证或登记商标。",
          },
          {
            id: "alias-known-confusion",
            label: "联系知名度与冒充混淆",
            meaning:
              "联系出版读者资料形成稳定指向，以及假称本人授课导致读者误认。",
            acceptable:
              "说名字已经能代表这个作者，公司又让读者当成作者本人，就符合本条条件即可。",
            boundary: "不把全部相同词语使用都推定为侵权。",
          },
        ],
      },
      {
        caseId: "civil-personality-alias-common-nickname",
        relatedTopicIds: ["civil-name-alias"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁在新建生活账号上使用“小雨”作昵称，只发布过一条给几位熟人看的日常内容，没有出版、经营或面向公众的持续活动。林禾另一账号多年前已使用同样常见昵称，头像、简介与内容均不同，也未提及陆宁或暗示两账号存在关系。现无材料表明公众把该昵称稳定指向陆宁，或把林禾误认成陆宁。陆宁仅凭昵称相同，就要求依第1017条禁止林禾继续使用。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能直接这样认定。第1017条保护的这类笔名网名，要有一定社会知名度，并且他人的使用足以造成公众混淆。本案只有常见昵称相同，没有这些事实，不能据此禁止另一账号使用。",
        sources: ["civil-personality-alias1017"],
        id: "civil-personality-alias-common-nickname-choice",
        kind: "objective",
        choiceMode: "single",
        title: "两个叫小雨的账号：选择判断",
        prompt:
          "仅凭常见昵称字面相同，能否直接认定本条所指的侵害并禁止林禾使用？",
        options: [
          {
            id: "a",
            text: "可以，最先主张的人自动拥有所有常见昵称的绝对排他权",
            explanation: "法律没有该类昵称独占规则。",
          },
          {
            id: "b",
            text: "任何网名在任何情况下都不可能受法律保护",
            explanation: "本条明确对符合条件的网名等提供保护。",
          },
          {
            id: "c",
            text: "只要两个账号头像不同，即使明确冒充也永远免责",
            explanation: "头像不同不等于不能造成身份混淆。",
          },
          {
            id: "d",
            text: "不能；字面相同不足以替代本条的知名度和公众混淆条件",
            explanation: "本案没有支持这两项条件的事实。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-personality-alias-common-nickname",
        relatedTopicIds: ["civil-name-alias"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁在新建生活账号上使用“小雨”作昵称，只发布过一条给几位熟人看的日常内容，没有出版、经营或面向公众的持续活动。林禾另一账号多年前已使用同样常见昵称，头像、简介与内容均不同，也未提及陆宁或暗示两账号存在关系。现无材料表明公众把该昵称稳定指向陆宁，或把林禾误认成陆宁。陆宁仅凭昵称相同，就要求依第1017条禁止林禾继续使用。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能直接这样认定。第1017条保护的这类笔名网名，要有一定社会知名度，并且他人的使用足以造成公众混淆。本案只有常见昵称相同，没有这些事实，不能据此禁止另一账号使用。",
        sources: ["civil-personality-alias1017"],
        id: "civil-personality-alias-common-nickname-written",
        kind: "subjective",
        title: "两个叫小雨的账号：写出分析",
        prompt:
          "仅凭常见昵称字面相同，能否直接认定本条所指的侵害并禁止林禾使用？请结合案情说明理由。",
        criteria: [
          {
            id: "alias-common-no-automatic",
            label: "不因常见昵称相同当然禁止",
            meaning: "明确仅昵称相同不足以认定本条侵害，不能直接禁止林禾使用。",
            acceptable: "说不是先用了小雨就能不准别人也叫小雨即可。",
            boundary: "不扩成所有未登记网名永远不受保护。",
          },
          {
            id: "alias-common-conditions",
            label: "本条要求知名度与公众混淆",
            meaning:
              "说明本案缺少一定社会知名度、稳定指向及足以使公众混淆的事实。",
            acceptable:
              "说目前这个名字没形成公众对他的识别，也没人被误导成同一人即可。",
            boundary: "不要求侵权人实际获利或先有真实损失金额。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-portrait-consent",
    title: "肖像使用与本人同意",
    headline:
      "拥有照片著作权不等于能任意公开他人的肖像；不收费也不自动免除取得同意的要求。",
    goal: "摄影师的作品许可是否足以让商店使用陆宁肖像做广告？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "肖像是能够识别特定自然人的外部形象。未经本人同意，原则上不能制作、使用、公开，法律规定的合理使用除外；同意拍证件照，不等于同意被用作店铺广告。",
      "摄影师对作品的权利与被拍者的肖像权是两回事。公开展览个人肖像也不能只用不收费来免责，要看是否取得同意，或者是否确实符合合理使用条件。",
    ],
    example: {
      title: "证件照出现在店铺海报",
      facts:
        "本案为原创教学虚构，发生于2026年9月。陆宁到青禾照相馆拍摄证件照，明确约定只供本人办理证件，不用于展示或宣传。照相馆摄影师对拍成的照片享有作品著作权，后来许可附近商店把陆宁清晰可辨的正面照放入商品广告，陆宁未同意。商店承认知道原约定，却说已经拿到照片著作权人的许可，就无需再问被拍者。",
      analysis:
        "不够。摄影师的作品许可不能代替陆宁对肖像广告使用的同意。陆宁只同意制作自用证件照，没有同意商店广告；商店不能凭摄影师许可就越过这一范围，应停止未经许可的肖像使用。",
    },
    pitfall: "只看摄影师有没有著作权，或者把不盈利当作所有肖像使用的通行证。",
    recall: {
      prompt: "摄影师的作品许可是否足以让商店使用陆宁肖像做广告？",
      reference:
        "拥有照片著作权不等于能任意公开他人的肖像；不收费也不自动免除取得同意的要求。",
    },
    sources: [
      "civil-personality-portrait1018",
      "civil-personality-remedies995",
      "civil-personality-portrait1020",
    ],
    exercises: [
      {
        caseId: "civil-personality-portrait-id-photo-ad",
        relatedTopicIds: ["civil-portrait-consent"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁到青禾照相馆拍摄证件照，明确约定只供本人办理证件，不用于展示或宣传。照相馆摄影师对拍成的照片享有作品著作权，后来许可附近商店把陆宁清晰可辨的正面照放入商品广告，陆宁未同意。商店承认知道原约定，却说已经拿到照片著作权人的许可，就无需再问被拍者。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不够。摄影师的作品许可不能代替陆宁对肖像广告使用的同意。陆宁只同意制作自用证件照，没有同意商店广告；商店不能凭摄影师许可就越过这一范围，应停止未经许可的肖像使用。",
        sources: [
          "civil-personality-portrait1018",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-portrait-id-photo-ad-choice",
        kind: "objective",
        choiceMode: "single",
        title: "证件照出现在店铺海报：选择判断",
        prompt: "摄影师的作品许可是否足以让商店使用陆宁肖像做广告？",
        options: [
          {
            id: "a",
            text: "不够；作品许可不能替代肖像同意，证件照许可不包括本次广告",
            explanation: "符合第1019条及本案明确的用途限制。",
          },
          {
            id: "b",
            text: "只要照片已经拍好，被拍者的肖像权就永久消失",
            explanation: "制作完成不消灭自然人的肖像权。",
          },
          {
            id: "c",
            text: "只要不把人名写在照片下，可识别面孔也不属于肖像",
            explanation: "能识别自然人的外部形象即可，不以附姓名为必要。",
          },
          {
            id: "d",
            text: "足够，摄影师拥有作品权利就能替被拍者同意全部用途",
            explanation: "作品著作权与被拍者肖像权分别受保护。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-personality-portrait-id-photo-ad",
        relatedTopicIds: ["civil-portrait-consent"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁到青禾照相馆拍摄证件照，明确约定只供本人办理证件，不用于展示或宣传。照相馆摄影师对拍成的照片享有作品著作权，后来许可附近商店把陆宁清晰可辨的正面照放入商品广告，陆宁未同意。商店承认知道原约定，却说已经拿到照片著作权人的许可，就无需再问被拍者。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不够。摄影师的作品许可不能代替陆宁对肖像广告使用的同意。陆宁只同意制作自用证件照，没有同意商店广告；商店不能凭摄影师许可就越过这一范围，应停止未经许可的肖像使用。",
        sources: [
          "civil-personality-portrait1018",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-portrait-id-photo-ad-written",
        kind: "subjective",
        title: "证件照出现在店铺海报：写出分析",
        prompt:
          "摄影师的作品许可是否足以让商店使用陆宁肖像做广告？请结合案情说明理由。",
        criteria: [
          {
            id: "portrait-id-separate-rights",
            label: "作品权利不替代肖像同意",
            meaning: "明确摄影师的著作权许可不足以替陆宁同意商店广告使用肖像。",
            acceptable:
              "说拍照片的人能许可作品，不代表能代替照片里的人同意广告即可。",
            boundary: "不要求判断著作权登记、独创性或许可费。",
          },
          {
            id: "portrait-id-purpose",
            label: "证件照用途不涵盖广告",
            meaning:
              "联系约定自用证件照、未同意宣传及商店明知，判断本次广告未经许可应停止。",
            acceptable:
              "说只答应拍来办证，没答应用来卖东西，商店不能拿这张许可当万能授权即可。",
            boundary: "不要求另证广告实际赚到钱或先确定赔偿金额。",
          },
        ],
      },
      {
        caseId: "civil-personality-portrait-free-exhibition",
        relatedTopicIds: ["civil-portrait-consent"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。摄影爱好者林禾在街边近距离拍下陆宁清晰可辨的个人正面肖像，陆宁没有同意拍摄或公开。林禾把这张从未由陆宁公开过的人像独立装框，放入面向社会公众的个人作品展，不收门票。照片不是新闻报道的一部分，也不是为了展示公共街景中不可避免出现的背景人物。林禾只以展览不盈利为由拒绝停止展示。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。不收门票不等于可以任意公开别人的肖像。林禾没有取得陆宁同意，本次又是向公众独立展出个人肖像，并不符合题中的新闻或公共环境等合理使用条件，应停止未经同意的展示。",
        sources: [
          "civil-personality-portrait1018",
          "civil-personality-portrait1020",
        ],
        id: "civil-personality-portrait-free-exhibition-choice",
        kind: "objective",
        choiceMode: "single",
        title: "不收门票的人像展：选择判断",
        prompt: "林禾能否仅因不收门票，就认定公开展览无需取得肖像同意？",
        options: [
          {
            id: "a",
            text: "能，任何不收费展览都不受肖像权限制",
            explanation: "非营利不是当然免除肖像同意的条件。",
          },
          {
            id: "b",
            text: "能，任何在公共道路拍到的个人近照都可随意展览",
            explanation: "公共地点不等于人物肖像成为任意使用资源。",
          },
          {
            id: "c",
            text: "不能；本次公开个人肖像没有同意，也无题中合理使用依据",
            explanation: "结合肖像用途和合理使用边界，而非只看收费。",
          },
          {
            id: "d",
            text: "只有人像被涂改丑化后才可能侵犯肖像权",
            explanation: "未经同意制作使用公开也可能侵犯肖像权。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-personality-portrait-free-exhibition",
        relatedTopicIds: ["civil-portrait-consent"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。摄影爱好者林禾在街边近距离拍下陆宁清晰可辨的个人正面肖像，陆宁没有同意拍摄或公开。林禾把这张从未由陆宁公开过的人像独立装框，放入面向社会公众的个人作品展，不收门票。照片不是新闻报道的一部分，也不是为了展示公共街景中不可避免出现的背景人物。林禾只以展览不盈利为由拒绝停止展示。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。不收门票不等于可以任意公开别人的肖像。林禾没有取得陆宁同意，本次又是向公众独立展出个人肖像，并不符合题中的新闻或公共环境等合理使用条件，应停止未经同意的展示。",
        sources: [
          "civil-personality-portrait1018",
          "civil-personality-portrait1020",
        ],
        id: "civil-personality-portrait-free-exhibition-written",
        kind: "subjective",
        title: "不收门票的人像展：写出分析",
        prompt:
          "林禾能否仅因不收门票，就认定公开展览无需取得肖像同意？请结合案情说明理由。",
        criteria: [
          {
            id: "portrait-free-no-automatic",
            label: "非营利不当然免于同意",
            meaning:
              "明确不能只凭不收门票或不盈利免责，公开肖像仍须依法取得同意或符合例外。",
            acceptable: "说不赚钱也不代表能把别人照片随便公开即可。",
            boundary: "不把收费作为肖像侵权必须存在的要件。",
          },
          {
            id: "portrait-free-specific-use",
            label: "本次独立展览未获许可",
            meaning:
              "联系未公开过的清晰个人近照、无同意、非必要新闻或街景背景，判断不属题中合理使用。",
            acceptable:
              "说这是专门展出这个人的照片，不是不可避免的背景或报道，本次应停止即可。",
            boundary: "不把全部艺术欣赏或课堂使用都一概认定为侵权。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-portrait-fair-use",
    title: "新闻报道中的肖像合理使用",
    headline:
      "必要新闻报道可以依法合理使用肖像；把新闻照片改作商品代言，是另一项使用。",
    goal: "能否仅因没有单独征得陆宁同意，就认定这次报道必然侵犯肖像权？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "为实施新闻报道，不可避免地制作、使用、公开人物肖像，在合理范围内可以不另征本人同意。要看报道内容与人物形象的联系及使用范围，不能仅因画面有人就认定侵权。",
      "新闻拍摄的例外只服务于相应报道。商店后来截取人物照片作商品推荐，不能沿用新闻报道的理由，仍应审查本人同意及其他法律依据。",
    ],
    example: {
      title: "公开演练的现场画面",
      facts:
        "本案为原创教学虚构，发生于2026年9月。青澄报社报道面向公众的消防撤离演练，画面连续记录陆宁作为现场负责人指挥人群撤离的过程。镜头随他示范撤离路线和手势，再转向依其指示行动的人群，人物形象只用于交代现场指挥经过。报道如实说明演练，不扩大人物特写，不披露私人生活，也未附加商品推广。陆宁未另行同意，认为只要画面有自己的脸就必然侵犯肖像权。",
      analysis:
        "不能。按本案事实，画面是如实报道公开演练所必需，陆宁的形象与现场指挥过程直接相关，使用也未超出合理范围，属于新闻报道中的肖像合理使用，可以不另征同意。",
    },
    pitfall:
      "认为新闻永远不能出现未经同意的人脸，或认为新闻中出现过的照片以后可任意做广告。",
    recall: {
      prompt: "能否仅因没有单独征得陆宁同意，就认定这次报道必然侵犯肖像权？",
      reference:
        "必要新闻报道可以依法合理使用肖像；把新闻照片改作商品代言，是另一项使用。",
    },
    sources: [
      "civil-personality-portrait1020",
      "civil-personality-portrait1018",
      "civil-personality-remedies995",
    ],
    exercises: [
      {
        caseId: "civil-personality-portrait-news-drill",
        relatedTopicIds: ["civil-portrait-fair-use"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青澄报社报道面向公众的消防撤离演练，画面连续记录陆宁作为现场负责人指挥人群撤离的过程。镜头随他示范撤离路线和手势，再转向依其指示行动的人群，人物形象只用于交代现场指挥经过。报道如实说明演练，不扩大人物特写，不披露私人生活，也未附加商品推广。陆宁未另行同意，认为只要画面有自己的脸就必然侵犯肖像权。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。按本案事实，画面是如实报道公开演练所必需，陆宁的形象与现场指挥过程直接相关，使用也未超出合理范围，属于新闻报道中的肖像合理使用，可以不另征同意。",
        sources: ["civil-personality-portrait1020"],
        id: "civil-personality-portrait-news-drill-choice",
        kind: "objective",
        choiceMode: "single",
        title: "公开演练的现场画面：选择判断",
        prompt: "能否仅因没有单独征得陆宁同意，就认定这次报道必然侵犯肖像权？",
        options: [
          {
            id: "a",
            text: "只有人物在画面中完全不能辨认，才可能属于新闻合理使用",
            explanation: "可识别肖像也可在法定合理范围内使用。",
          },
          {
            id: "b",
            text: "不能；本案必要且合理的新闻使用可以不另征肖像同意",
            explanation: "结合公开演练、指挥过程与未超范围的事实。",
          },
          {
            id: "c",
            text: "只要人物没签字，任何新闻现场画面都必然侵权",
            explanation: "第1020条保留合理、必要新闻使用。",
          },
          {
            id: "d",
            text: "只要自称报社，任何广告、丑化或私密画面都一律免责",
            explanation: "仍须看新闻必要性、合理范围与其他权利。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-personality-portrait-news-drill",
        relatedTopicIds: ["civil-portrait-fair-use"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青澄报社报道面向公众的消防撤离演练，画面连续记录陆宁作为现场负责人指挥人群撤离的过程。镜头随他示范撤离路线和手势，再转向依其指示行动的人群，人物形象只用于交代现场指挥经过。报道如实说明演练，不扩大人物特写，不披露私人生活，也未附加商品推广。陆宁未另行同意，认为只要画面有自己的脸就必然侵犯肖像权。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。按本案事实，画面是如实报道公开演练所必需，陆宁的形象与现场指挥过程直接相关，使用也未超出合理范围，属于新闻报道中的肖像合理使用，可以不另征同意。",
        sources: ["civil-personality-portrait1020"],
        id: "civil-personality-portrait-news-drill-written",
        kind: "subjective",
        title: "公开演练的现场画面：写出分析",
        prompt:
          "能否仅因没有单独征得陆宁同意，就认定这次报道必然侵犯肖像权？请结合案情说明理由。",
        criteria: [
          {
            id: "portrait-news-exception",
            label: "必要合理的新闻使用可不另征同意",
            meaning:
              "说明不能只因没单独同意就认定侵权，合理新闻报道有法定例外。",
            acceptable:
              "说这种必要的新闻画面不一定要每个人另外授权，本案可以依法使用即可。",
            boundary: "不扩成报社任何用途都免责。",
          },
          {
            id: "portrait-news-scope",
            label: "联系报道所需与使用范围",
            meaning:
              "联系公开演练、现场指挥过程不可避免出现及未做推广或扩大使用，说明本案合理。",
            acceptable:
              "说人脸是记录这次指挥经过的一部分，没有拿去做别的用途即可。",
            boundary: "不要求所有新闻必须先得到报道对象配合。",
          },
        ],
      },
      {
        caseId: "civil-personality-portrait-news-to-ad",
        relatedTopicIds: ["civil-portrait-fair-use"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。一张陆宁参加公开演练的照片曾依法用于当日新闻。沐禾健身馆后来截取他的清晰面部，放在付费课程海报上，配文“陆宁选择本馆训练”。陆宁从未在该馆训练，也没有许可该馆使用肖像。健身馆只说照片已经出现在新闻里，所以此后任何人都可不经同意用于宣传。本题不讨论照片作品的版权。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。新闻中的合理使用只针对相应报道，不能自动变成健身馆的广告许可。健身馆截取陆宁面部，虚称他选择本馆训练，是另一次宣传使用，陆宁未同意，应停止；照片曾公开不等于任何商家都能拿来代言。",
        sources: [
          "civil-personality-portrait1018",
          "civil-personality-portrait1020",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-portrait-news-to-ad-choice",
        kind: "objective",
        choiceMode: "single",
        title: "新闻照片换了新用途：选择判断",
        prompt: "原来的新闻合理使用能否直接覆盖健身馆这次广告使用？",
        options: [
          {
            id: "a",
            text: "能，照片在新闻里出现过，任何主体以后都能任意宣传使用",
            explanation: "公开不等于无限授权或永远适用新闻例外。",
          },
          {
            id: "b",
            text: "只有广告出现陆宁的身份证号，才可能侵犯肖像权",
            explanation: "清晰可识别面孔已经属于肖像。",
          },
          {
            id: "c",
            text: "只要健身馆声称广告有健康意义，就必然变成新闻报道",
            explanation: "商品推广不能仅靠标签转为必要新闻使用。",
          },
          {
            id: "d",
            text: "不能；新闻用途与本次课程广告分开，广告未获肖像同意",
            explanation: "第1019、1020条要求对实际用途分别判断。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-personality-portrait-news-to-ad",
        relatedTopicIds: ["civil-portrait-fair-use"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。一张陆宁参加公开演练的照片曾依法用于当日新闻。沐禾健身馆后来截取他的清晰面部，放在付费课程海报上，配文“陆宁选择本馆训练”。陆宁从未在该馆训练，也没有许可该馆使用肖像。健身馆只说照片已经出现在新闻里，所以此后任何人都可不经同意用于宣传。本题不讨论照片作品的版权。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。新闻中的合理使用只针对相应报道，不能自动变成健身馆的广告许可。健身馆截取陆宁面部，虚称他选择本馆训练，是另一次宣传使用，陆宁未同意，应停止；照片曾公开不等于任何商家都能拿来代言。",
        sources: [
          "civil-personality-portrait1018",
          "civil-personality-portrait1020",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-portrait-news-to-ad-written",
        kind: "subjective",
        title: "新闻照片换了新用途：写出分析",
        prompt:
          "原来的新闻合理使用能否直接覆盖健身馆这次广告使用？请结合案情说明理由。",
        criteria: [
          {
            id: "portrait-ad-no-carryover",
            label: "新闻例外不自动延伸到广告",
            meaning:
              "明确原新闻使用不能直接覆盖后续课程广告，应分别判断实际用途。",
            acceptable:
              "说原来是报道，现在拿去卖课，不能沿用那次新闻的理由即可。",
            boundary: "不要求重判原报道是否合理，原报道合法为给定前提。",
          },
          {
            id: "portrait-ad-no-consent",
            label: "本次广告未经同意应停止",
            meaning:
              "联系截取可识别面部、虚称选择课程和没有肖像许可，判断本次广告使用不合法。",
            acceptable:
              "说本人没同意广告，也没去训练，不能拿他的脸冒充推荐即可。",
            boundary: "不强求额外展开姓名权或作品版权，避免添不必要必答项。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-reputation-publication",
    title: "名誉侵害与新闻监督",
    headline:
      "编造事实贬损他人名誉要负责；为公共利益准确、合理地报道，也不能只因影响名誉就判侵权。",
    goal: "这只是一般评论，还是侵犯名誉权？陆宁可否要求停止传播并消除相应影响？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "名誉是对主体品德、声望、才能、信用等的社会评价。公开编造他人侵占款项等具体事实，使其社会评价降低，不能以只是网上聊天来免责。",
      "为公共利益实施新闻报道、舆论监督，依法合理影响他人名誉，可以不承担民事责任；捏造歪曲、严重失实内容未尽合理核实、侮辱贬损等情形除外。看事实和表达，不只看报道后有没有生意下降。",
    ],
    example: {
      title: "群里流传的挪款消息",
      facts:
        "本案为原创教学虚构，发生于2026年9月。林禾与陆宁发生争执后，在公开社区账号发帖称“陆宁把社团筹款拿去自己花了”，还编造具体金额和日期。账目、转款记录及林禾的聊天内容证明陆宁并无该行为，林禾发帖时也没有相关依据，只想让其他人不再信任陆宁。帖子使多人指责陆宁不诚实。林禾称自己只是网上发表看法，无须为这种内容负责。",
      analysis:
        "这是名誉侵害。林禾公开编造陆宁挪用筹款的具体事实，已经让他人降低对陆宁的诚信评价，不是正常表达不同看法。陆宁可以要求停止传播、消除与本次传播范围相当的影响；本题不需要先算出一笔财产损失。",
    },
    pitfall: "把传播谣言当成普通评论，或反过来认为任何负面报道都侵权。",
    recall: {
      prompt:
        "这只是一般评论，还是侵犯名誉权？陆宁可否要求停止传播并消除相应影响？",
      reference:
        "编造事实贬损他人名誉要负责；为公共利益准确、合理地报道，也不能只因影响名誉就判侵权。",
    },
    sources: [
      "civil-personality-reputation1024",
      "civil-personality-remedies995",
    ],
    exercises: [
      {
        caseId: "civil-personality-reputation-invented-theft",
        relatedTopicIds: ["civil-reputation-publication"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。林禾与陆宁发生争执后，在公开社区账号发帖称“陆宁把社团筹款拿去自己花了”，还编造具体金额和日期。账目、转款记录及林禾的聊天内容证明陆宁并无该行为，林禾发帖时也没有相关依据，只想让其他人不再信任陆宁。帖子使多人指责陆宁不诚实。林禾称自己只是网上发表看法，无须为这种内容负责。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "这是名誉侵害。林禾公开编造陆宁挪用筹款的具体事实，已经让他人降低对陆宁的诚信评价，不是正常表达不同看法。陆宁可以要求停止传播、消除与本次传播范围相当的影响；本题不需要先算出一笔财产损失。",
        sources: [
          "civil-personality-reputation1024",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-reputation-invented-theft-choice",
        kind: "objective",
        choiceMode: "single",
        title: "群里流传的挪款消息：选择判断",
        prompt:
          "这只是一般评论，还是侵犯名誉权？陆宁可否要求停止传播并消除相应影响？",
        options: [
          {
            id: "a",
            text: "构成名誉侵害，可要求停止传播并消除相应影响",
            explanation: "结合编造行为、公开传播和诚信评价受损判断。",
          },
          {
            id: "b",
            text: "只有帖文附上陆宁肖像才可能侵犯名誉权",
            explanation: "名誉侵害不以同时使用肖像为必要。",
          },
          {
            id: "c",
            text: "社团账目已经清楚，仍必须先认定刑事犯罪才能请求民事保护",
            explanation: "民事名誉保护不以先刑事定罪为前提。",
          },
          {
            id: "d",
            text: "任何公开帖文都只是意见，不论事实真假都不担责",
            explanation: "具体虚假事实的诽谤不能靠意见标签免责。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-personality-reputation-invented-theft",
        relatedTopicIds: ["civil-reputation-publication"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。林禾与陆宁发生争执后，在公开社区账号发帖称“陆宁把社团筹款拿去自己花了”，还编造具体金额和日期。账目、转款记录及林禾的聊天内容证明陆宁并无该行为，林禾发帖时也没有相关依据，只想让其他人不再信任陆宁。帖子使多人指责陆宁不诚实。林禾称自己只是网上发表看法，无须为这种内容负责。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "这是名誉侵害。林禾公开编造陆宁挪用筹款的具体事实，已经让他人降低对陆宁的诚信评价，不是正常表达不同看法。陆宁可以要求停止传播、消除与本次传播范围相当的影响；本题不需要先算出一笔财产损失。",
        sources: [
          "civil-personality-reputation1024",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-reputation-invented-theft-written",
        kind: "subjective",
        title: "群里流传的挪款消息：写出分析",
        prompt:
          "这只是一般评论，还是侵犯名誉权？陆宁可否要求停止传播并消除相应影响？请结合案情说明理由。",
        criteria: [
          {
            id: "reputation-theft-false-facts",
            label: "编造具体事实侵害名誉",
            meaning:
              "联系虚构挪款事实、公开传播及诚信评价受损，判断侵犯陆宁名誉权。",
            acceptable:
              "说这不是普通意见，而是造假说他拿了公款，已经损害别人对他的评价即可。",
            boundary: "不要求同时有辱骂词、肖像使用或刑事定罪。",
          },
          {
            id: "reputation-theft-remedy",
            label: "可请求停止与消除相应影响",
            meaning:
              "说明陆宁可要求停止传播、消除与本次传播相当的影响，不以先算出财产损失为前提。",
            acceptable:
              "说应删掉失实说法或澄清，不能因为没算赔多少就继续传即可。",
            boundary: "不要求无关全国媒体道歉，也不虚构精神损害金额。",
          },
        ],
      },
      {
        caseId: "civil-personality-reputation-accurate-supervision",
        relatedTopicIds: ["civil-reputation-publication"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青澄报社为提醒公众食品安全，报道一家餐馆被依法处罚的卫生问题。记者核对了已经生效的处罚文书、现场资料，并向餐馆核实经营者和整改情况，报道内容与已查明事实一致，明确写出餐馆已经完成整改，没有侮辱性词语或其他不实内容。餐馆随后营业额下降，主张只要负面报道影响了生意，就一定侵犯名称和名誉。本题只问名誉责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。本次报道为公共食品安全开展监督，核对了可靠资料，也准确交代处罚和整改，没有捏造歪曲、未核实的严重失实内容或侮辱表达。仅因报道影响名誉、营业额下降，不足以让报社在本案承担名誉侵权责任。",
        sources: ["civil-personality-reputation1024"],
        id: "civil-personality-reputation-accurate-supervision-choice",
        kind: "objective",
        choiceMode: "single",
        title: "关于卫生处罚的报道：选择判断",
        prompt:
          "能否仅凭名誉、生意受到负面影响，就认定报社在本案应承担名誉侵权责任？",
        options: [
          {
            id: "a",
            text: "不能，但只是因为只有自然人才有名誉权",
            explanation: "法人等民事主体也享有名誉权，免责应建立在报道合法上。",
          },
          {
            id: "b",
            text: "报社身份使其在所有报道中都免于核实和责任",
            explanation: "新闻监督仍有法定边界。",
          },
          {
            id: "c",
            text: "不能；本案准确合理的公共利益报道不因影响生意当然侵权",
            explanation: "依据第1025条并结合核实、准确和无侮辱事实判断。",
          },
          {
            id: "d",
            text: "能，只要商家营业下降，任何真实监督报道都应赔偿",
            explanation: "将负面影响与违法侵害直接等同。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-personality-reputation-accurate-supervision",
        relatedTopicIds: ["civil-reputation-publication"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青澄报社为提醒公众食品安全，报道一家餐馆被依法处罚的卫生问题。记者核对了已经生效的处罚文书、现场资料，并向餐馆核实经营者和整改情况，报道内容与已查明事实一致，明确写出餐馆已经完成整改，没有侮辱性词语或其他不实内容。餐馆随后营业额下降，主张只要负面报道影响了生意，就一定侵犯名称和名誉。本题只问名誉责任。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。本次报道为公共食品安全开展监督，核对了可靠资料，也准确交代处罚和整改，没有捏造歪曲、未核实的严重失实内容或侮辱表达。仅因报道影响名誉、营业额下降，不足以让报社在本案承担名誉侵权责任。",
        sources: ["civil-personality-reputation1024"],
        id: "civil-personality-reputation-accurate-supervision-written",
        kind: "subjective",
        title: "关于卫生处罚的报道：写出分析",
        prompt:
          "能否仅凭名誉、生意受到负面影响，就认定报社在本案应承担名誉侵权责任？请结合案情说明理由。",
        criteria: [
          {
            id: "reputation-supervision-not-automatic",
            label: "负面影响不等于当然侵权",
            meaning:
              "明确不能仅凭生意、名誉受影响追责，公共利益新闻监督在法定范围内受保护。",
            acceptable:
              "说真实合理的食品安全监督，不能只因商家少赚钱就判报社侵权即可。",
            boundary: "不把法人说成不享有名誉权，也不扩成媒体绝对免责。",
          },
          {
            id: "reputation-supervision-facts",
            label: "联系准确核实与完整交代",
            meaning:
              "联系生效文书、多方核实、写明整改及无虚假侮辱，说明本案未落入例外。",
            acceptable:
              "说依据查过，处罚与整改都如实写了，也没骂人，所以这次不属违法贬损即可。",
            boundary: "不要求逐字背出所有核实因素，案例中必要内容已足够。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-reputation-correction",
    title: "失实报道的核实与更正",
    headline:
      "转述他人的严重失实内容，也要履行合理核实义务；有证据证明报道失实侵害名誉，可以要求及时纠正。",
    goal: "公共监督目的和只是转载，是否足以使该账号免除名誉责任？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "核实是否合理，要看来源可信度、争议明显程度、时限要求、名誉损害可能性，以及核实能力和成本。匿名爆料不等于可靠证据，转载也不当然免责。",
      "权利人已有证据证明报道失实并侵害名誉，可以请求媒体及时更正或删除必要内容。这项纠正不是等到赔偿金额算完才能做，也不是要求把全部无关真实内容都删掉。",
    ],
    example: {
      title: "没有原件的匿名爆料",
      facts:
        "本案为原创教学虚构，发生于2026年9月。沐禾食品观察账号收到匿名消息，称青宁餐馆销售过期食品，并附一张看不出时间地点的截图。编辑知道截图缺少原始记录，报道也不紧急，餐馆和监管联系渠道均公开、可以方便核对，却未联系任何一方就作为确定事实发布。后来检查记录和原始图片证明消息严重失实，传播已经降低公众对餐馆的评价。账号称自己只是为了食品安全转述他人内容。",
      analysis:
        "不够。公共监督也要对他人提供的严重失实内容尽合理核实义务。这里来源匿名、证据缺失，内容会明显影响餐馆名誉，又有方便的核实渠道和时间，账号却没有做任何核对，不能靠只是转载或监督目的免责。",
    },
    pitfall: "用只是转载来代替核实，或用还没算出赔款来拖延纠错。",
    recall: {
      prompt: "公共监督目的和只是转载，是否足以使该账号免除名誉责任？",
      reference:
        "转述他人的严重失实内容，也要履行合理核实义务；有证据证明报道失实侵害名誉，可以要求及时纠正。",
    },
    sources: [
      "civil-personality-reputation1024",
      "civil-personality-verification1026",
      "civil-personality-correction1028",
      "civil-personality-remedies995",
    ],
    exercises: [
      {
        caseId: "civil-personality-reputation-unchecked-repost",
        relatedTopicIds: ["civil-reputation-correction"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐禾食品观察账号收到匿名消息，称青宁餐馆销售过期食品，并附一张看不出时间地点的截图。编辑知道截图缺少原始记录，报道也不紧急，餐馆和监管联系渠道均公开、可以方便核对，却未联系任何一方就作为确定事实发布。后来检查记录和原始图片证明消息严重失实，传播已经降低公众对餐馆的评价。账号称自己只是为了食品安全转述他人内容。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不够。公共监督也要对他人提供的严重失实内容尽合理核实义务。这里来源匿名、证据缺失，内容会明显影响餐馆名誉，又有方便的核实渠道和时间，账号却没有做任何核对，不能靠只是转载或监督目的免责。",
        sources: [
          "civil-personality-reputation1024",
          "civil-personality-verification1026",
        ],
        id: "civil-personality-reputation-unchecked-repost-choice",
        kind: "objective",
        choiceMode: "single",
        title: "没有原件的匿名爆料：选择判断",
        prompt: "公共监督目的和只是转载，是否足以使该账号免除名誉责任？",
        options: [
          {
            id: "a",
            text: "任何匿名材料绝对不得用，哪怕已有充分独立核实",
            explanation: "应综合核实过程，不是只看匿名标签作绝对禁止。",
          },
          {
            id: "b",
            text: "不能免责；本案对严重失实内容没有尽到合理核实义务",
            explanation: "结合法定核实因素与具体未核实行为判断。",
          },
          {
            id: "c",
            text: "只要注明来自他人，任何严重失实内容都无需核实",
            explanation: "转载不等于免于合理核实义务。",
          },
          {
            id: "d",
            text: "只有内容由编辑自己逐字编造，才可能承担名誉责任",
            explanation: "对他人严重失实内容未尽合理核实也属于法定例外。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-personality-reputation-unchecked-repost",
        relatedTopicIds: ["civil-reputation-correction"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。沐禾食品观察账号收到匿名消息，称青宁餐馆销售过期食品，并附一张看不出时间地点的截图。编辑知道截图缺少原始记录，报道也不紧急，餐馆和监管联系渠道均公开、可以方便核对，却未联系任何一方就作为确定事实发布。后来检查记录和原始图片证明消息严重失实，传播已经降低公众对餐馆的评价。账号称自己只是为了食品安全转述他人内容。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不够。公共监督也要对他人提供的严重失实内容尽合理核实义务。这里来源匿名、证据缺失，内容会明显影响餐馆名誉，又有方便的核实渠道和时间，账号却没有做任何核对，不能靠只是转载或监督目的免责。",
        sources: [
          "civil-personality-reputation1024",
          "civil-personality-verification1026",
        ],
        id: "civil-personality-reputation-unchecked-repost-written",
        kind: "subjective",
        title: "没有原件的匿名爆料：写出分析",
        prompt:
          "公共监督目的和只是转载，是否足以使该账号免除名誉责任？请结合案情说明理由。",
        criteria: [
          {
            id: "reputation-repost-duty",
            label: "转载与监督不当然免责",
            meaning:
              "明确公共监督、转述他人不能排除对严重失实内容的合理核实义务。",
            acceptable:
              "说不是自己先编的也不能不核对就当真的传，监督目的不等于免责任即可。",
            boundary: "不把所有有误报道或所有转载都说成当然侵权。",
          },
          {
            id: "reputation-repost-factors",
            label: "结合低可信来源与可核实却未核实",
            meaning:
              "联系匿名无原件、名誉风险明显、不紧急且可便捷核实却未做，说明本案失职。",
            acceptable:
              "说截图来历不明，完全能问清却没问，就直接当事实发布，这次核实没做到即可。",
            boundary: "不要求六项因素逐字列齐，不增加事后必须刑事处罚的条件。",
          },
        ],
      },
      {
        caseId: "civil-personality-reputation-wrong-person-correction",
        relatedTopicIds: ["civil-reputation-correction"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾网络媒体报道一宗经营欺诈事件时，把受处罚者错写成同名的陆宁，并标注陆宁真实工作单位，读者因此指责陆宁不诚信。陆宁提交原处罚文书、身份资料和单位记录，清楚证明报道对应的是另一个人，要求及时更正并删除把自己指作行为人的失实段落。媒体承认证据清楚，却称陆宁尚未算出名誉损害赔款，所以可以暂不改正。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。证据已证明报道认错人并损害名誉，媒体应及时更正错误身份，必要时删除指错陆宁的段落。赔偿金额可以另行处理，不能成为拖延纠错的理由。",
        sources: [
          "civil-personality-correction1028",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-reputation-wrong-person-correction-choice",
        kind: "objective",
        choiceMode: "single",
        title: "同名者被写进了报道：选择判断",
        prompt: "媒体能否以赔款未算清为由拒绝纠正？陆宁可以要求哪些措施？",
        options: [
          {
            id: "a",
            text: "陆宁只能自己发帖澄清，不能要求媒体改正已确认错误",
            explanation: "权利人有权依法请求该媒体采取措施。",
          },
          {
            id: "b",
            text: "陆宁可要求永久删除该媒体全部真实和无关内容",
            explanation: "纠正范围应与具体侵害和必要性相当。",
          },
          {
            id: "c",
            text: "可以，只要赔款没确定，媒体就有权继续保留已知失实指控",
            explanation: "第1028条的纠正请求不以先结算赔款为前提。",
          },
          {
            id: "d",
            text: "不可以；应及时更正或删除必要的失实内容",
            explanation: "权利人已提供证据证明失实并侵害名誉。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-personality-reputation-wrong-person-correction",
        relatedTopicIds: ["civil-reputation-correction"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。青禾网络媒体报道一宗经营欺诈事件时，把受处罚者错写成同名的陆宁，并标注陆宁真实工作单位，读者因此指责陆宁不诚信。陆宁提交原处罚文书、身份资料和单位记录，清楚证明报道对应的是另一个人，要求及时更正并删除把自己指作行为人的失实段落。媒体承认证据清楚，却称陆宁尚未算出名誉损害赔款，所以可以暂不改正。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。证据已证明报道认错人并损害名誉，媒体应及时更正错误身份，必要时删除指错陆宁的段落。赔偿金额可以另行处理，不能成为拖延纠错的理由。",
        sources: [
          "civil-personality-correction1028",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-reputation-wrong-person-correction-written",
        kind: "subjective",
        title: "同名者被写进了报道：写出分析",
        prompt:
          "媒体能否以赔款未算清为由拒绝纠正？陆宁可以要求哪些措施？请结合案情说明理由。",
        criteria: [
          {
            id: "reputation-correction-right",
            label: "可请求及时更正或删除必要内容",
            meaning:
              "联系证据清楚证明张冠李戴和名誉受损，说明可要求及时纠正失实身份与必要段落。",
            acceptable:
              "说已经证明报道认错人，就应改正并处理指错他的内容即可。",
            boundary: "不要求删除媒体所有无关真实内容。",
          },
          {
            id: "reputation-correction-no-delay",
            label: "不以算清赔款为纠错前提",
            meaning: "明确媒体不能以赔偿金额未定为由拒绝或拖延纠正。",
            acceptable:
              "说先纠正假报道，赔多少可以另外处理，不能用这个拖着不改即可。",
            boundary: "不要求本题确定精神损害或经济损失数额。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-privacy-space",
    title: "私密空间与私密信息",
    headline:
      "进入住宅的许可不是偷拍许可；私密信息真实、曾定向给过别人，也不等于可以随意公开。",
    goal: "没有公开上传，是否意味着这次摄录不侵犯隐私？入户维修许可能否覆盖该行为？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "未经明确同意或没有法律依据，进入拍摄住宅等私密空间、窥探私密活动，都可能侵犯隐私。没有把视频发到网上，不会让偷拍本身变成合法。",
      "把诊断等私密信息只交给特定朋友帮忙，不代表同意向公众展示。隐私保护与信息真假不是同一问题，内容真实也不能替代公开许可。",
    ],
    example: {
      title: "维修后留下的小摄像头",
      facts:
        "本案为原创教学虚构，发生于2026年9月。陆宁允许维修人员林禾进入家中修理路由器，只同意检修设备。林禾趁维修把一只隐藏摄像头留在客厅，随后远程观看并保存陆宁一家晚间用餐、谈话的视频。陆宁没有同意摄录，林禾也没有任何依法履职或紧急保护事由。被发现后，林禾称视频没有上传公开，自己可以继续保留并观看。",
      analysis:
        "仍然侵犯隐私。陆宁只允许入户检修，没有同意摄录和观看家庭生活；林禾隐藏设备拍摄、远程观看私密空间和活动，已经越过许可。未上传公开，不会使这些偷拍、窥视行为合法，应停止并处理违法留存的视频。",
    },
    pitfall: "把没上传当作没侵犯隐私，或把朋友知道、信息属实当作公开通行证。",
    recall: {
      prompt:
        "没有公开上传，是否意味着这次摄录不侵犯隐私？入户维修许可能否覆盖该行为？",
      reference:
        "进入住宅的许可不是偷拍许可；私密信息真实、曾定向给过别人，也不等于可以随意公开。",
    },
    sources: ["civil-personality-privacy1032", "civil-personality-remedies995"],
    exercises: [
      {
        caseId: "civil-personality-privacy-home-camera",
        relatedTopicIds: ["civil-privacy-space"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁允许维修人员林禾进入家中修理路由器，只同意检修设备。林禾趁维修把一只隐藏摄像头留在客厅，随后远程观看并保存陆宁一家晚间用餐、谈话的视频。陆宁没有同意摄录，林禾也没有任何依法履职或紧急保护事由。被发现后，林禾称视频没有上传公开，自己可以继续保留并观看。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "仍然侵犯隐私。陆宁只允许入户检修，没有同意摄录和观看家庭生活；林禾隐藏设备拍摄、远程观看私密空间和活动，已经越过许可。未上传公开，不会使这些偷拍、窥视行为合法，应停止并处理违法留存的视频。",
        sources: [
          "civil-personality-privacy1032",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-privacy-home-camera-choice",
        kind: "objective",
        choiceMode: "single",
        title: "维修后留下的小摄像头：选择判断",
        prompt:
          "没有公开上传，是否意味着这次摄录不侵犯隐私？入户维修许可能否覆盖该行为？",
        options: [
          {
            id: "a",
            text: "侵犯；偷拍窥视本身即越过许可，不以公开上传为前提",
            explanation: "结合住宅家庭活动、隐藏摄像及无同意事实判断。",
          },
          {
            id: "b",
            text: "只要画面中没有银行卡号，就绝不属于隐私",
            explanation: "隐私不限于账户号码，还包括私密空间和活动。",
          },
          {
            id: "c",
            text: "不侵犯，只有视频公开上网以后才可能有隐私权问题",
            explanation:
              "第1033条不仅禁止公开，也调整拍摄、窥视私密空间与活动。",
          },
          {
            id: "d",
            text: "不侵犯，允许维修人员进门即等于同意其长期远程拍摄",
            explanation: "限定维修的许可不等于摄录许可。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-personality-privacy-home-camera",
        relatedTopicIds: ["civil-privacy-space"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁允许维修人员林禾进入家中修理路由器，只同意检修设备。林禾趁维修把一只隐藏摄像头留在客厅，随后远程观看并保存陆宁一家晚间用餐、谈话的视频。陆宁没有同意摄录，林禾也没有任何依法履职或紧急保护事由。被发现后，林禾称视频没有上传公开，自己可以继续保留并观看。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "仍然侵犯隐私。陆宁只允许入户检修，没有同意摄录和观看家庭生活；林禾隐藏设备拍摄、远程观看私密空间和活动，已经越过许可。未上传公开，不会使这些偷拍、窥视行为合法，应停止并处理违法留存的视频。",
        sources: [
          "civil-personality-privacy1032",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-privacy-home-camera-written",
        kind: "subjective",
        title: "维修后留下的小摄像头：写出分析",
        prompt:
          "没有公开上传，是否意味着这次摄录不侵犯隐私？入户维修许可能否覆盖该行为？请结合案情说明理由。",
        criteria: [
          {
            id: "privacy-camera-no-publication-needed",
            label: "偷拍窥视不以公开为前提",
            meaning: "明确即使没有上传公开，拍摄窥视住宅家庭生活也侵犯隐私。",
            acceptable:
              "说偷看偷拍家里的生活本身就越界，不是没发网上就没事即可。",
            boundary: "不要求出现私密身体部位、财产号码或实际金钱损失。",
          },
          {
            id: "privacy-camera-limited-permission",
            label: "维修许可不涵盖摄录",
            meaning:
              "联系只准检修、未同意隐藏摄像和远程观看，说明不能以入户许可抗辩。",
            acceptable:
              "说答应修路由器不等于答应放摄像头监视，这部分应停止即可。",
            boundary: "不强求另判刑事罪名或公共监控安装规范。",
          },
        ],
      },
      {
        caseId: "civil-personality-privacy-report-shared-friend",
        relatedTopicIds: ["civil-privacy-space"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁把一份尚未公开的个人诊断报告发给朋友林禾，请其代向指定医院预约，并在消息中明确说不要转发给其他人。林禾后来把带姓名、诊断结果的截图发到公开社交账号，引来大量讨论。林禾承认没有取得公开许可，却说报告内容全部真实，陆宁又曾主动给过自己，因而不存在隐私侵害。本题不讨论诊断是否正确。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不够。陆宁只是为特定预约把私密报告交给林禾，还明确限制转发，没有同意公开。诊断真实不等于可以向公众展示，朋友已经知道也不等于放弃隐私，林禾应停止这种未经许可的公开并处理相应内容。",
        sources: [
          "civil-personality-privacy1032",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-privacy-report-shared-friend-choice",
        kind: "objective",
        choiceMode: "single",
        title: "只为预约发出的报告：选择判断",
        prompt: "报告真实且曾定向发给朋友，是否足以授权林禾向公众公开？",
        options: [
          {
            id: "a",
            text: "只要曾发给一个朋友，权利人就永久丧失所有隐私保护",
            explanation: "定向、限定用途提供不等于向公众公开的许可。",
          },
          {
            id: "b",
            text: "只有报告是假造的才可能存在隐私侵害",
            explanation: "真实私密信息同样受隐私权保护。",
          },
          {
            id: "c",
            text: "不能授权公开；定向预约用途和内容真实都不替代公开同意",
            explanation: "结合限定用途、明确不许转发及公开传播判断。",
          },
          {
            id: "d",
            text: "只要内容真实，任何诊断报告都可由知道的人任意公开",
            explanation: "真假与能否公开他人私密信息是不同问题。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-personality-privacy-report-shared-friend",
        relatedTopicIds: ["civil-privacy-space"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁把一份尚未公开的个人诊断报告发给朋友林禾，请其代向指定医院预约，并在消息中明确说不要转发给其他人。林禾后来把带姓名、诊断结果的截图发到公开社交账号，引来大量讨论。林禾承认没有取得公开许可，却说报告内容全部真实，陆宁又曾主动给过自己，因而不存在隐私侵害。本题不讨论诊断是否正确。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不够。陆宁只是为特定预约把私密报告交给林禾，还明确限制转发，没有同意公开。诊断真实不等于可以向公众展示，朋友已经知道也不等于放弃隐私，林禾应停止这种未经许可的公开并处理相应内容。",
        sources: [
          "civil-personality-privacy1032",
          "civil-personality-remedies995",
        ],
        id: "civil-personality-privacy-report-shared-friend-written",
        kind: "subjective",
        title: "只为预约发出的报告：写出分析",
        prompt:
          "报告真实且曾定向发给朋友，是否足以授权林禾向公众公开？请结合案情说明理由。",
        criteria: [
          {
            id: "privacy-report-scope",
            label: "定向提供不等于公开授权",
            meaning:
              "联系只为预约且明确限制转发，判断不能把该许可扩大成向公众公开。",
            acceptable:
              "说只让朋友帮预约，不是让他晒到网上，所以不能这样转发即可。",
            boundary: "不把一切私人分享都视为永久放弃隐私。",
          },
          {
            id: "privacy-report-truth",
            label: "内容真实仍受隐私保护",
            meaning:
              "说明报告真实、朋友已知不使公开合法，林禾应停止未经许可的公开。",
            acceptable:
              "说真实的健康秘密也不能随便公开，不能只用都是真的来免责即可。",
            boundary: "不要求医学鉴定、诽谤故意或PIPL跨境处理分析。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-information-consent",
    title: "个人信息的公开与撤回同意",
    headline:
      "公开联系方式不是无限营销许可；只依同意处理的可选信息，可以撤回，先前合法处理也不会因此一概变成违法。",
    goal: "机构能否仅以手机号已在网上公开为由，无视陆宁明确拒绝继续营销使用？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "已合法公开的个人信息，可以在合理范围内依法处理；本人明确拒绝等情形不能忽略。不是所有公开信息都必须再取同意，也不是公开之后就可不管用途和拒绝。",
      "仅以个人同意为基础处理可选信息，本人可撤回。没有其他合法基础且不涉及法定留存、技术删除困难等例外，应停止相应处理并依法删除；撤回不影响撤回前基于有效同意完成的处理效力。",
    ],
    example: {
      title: "订单电话收到招生广告",
      facts:
        "本案为原创教学虚构，发生于2026年9月。陆宁在自营花店网站上公开自己的姓名和个人联系手机号，注明供顾客咨询花束订单。青禾培训机构收集号码后向其打招生营销电话。陆宁从未向该机构报名、订阅或购买服务，并已明确要求不再收集使用其号码做营销；机构确认收到拒绝后仍继续。该机构本次没有履行法定义务或紧急保护等其他处理依据。",
      analysis:
        "不能。个人信息已公开，也仍要在法定合理范围内处理，不能忽视本人明确拒绝。陆宁已拒绝培训营销，本案又没有其他合法处理依据，机构应停止这项使用；花店订单联系电话不是不受限制的招生资源。",
    },
    pitfall: "把公开等同放弃保护，或把曾经同意理解为永久不可撤回。",
    recall: {
      prompt:
        "机构能否仅以手机号已在网上公开为由，无视陆宁明确拒绝继续营销使用？",
      reference:
        "公开联系方式不是无限营销许可；只依同意处理的可选信息，可以撤回，先前合法处理也不会因此一概变成违法。",
    },
    sources: [
      "civil-personality-information1036",
      "civil-personality-pipl-public",
      "civil-personality-pipl-withdraw",
    ],
    exercises: [
      {
        caseId: "civil-personality-information-public-phone-refusal",
        relatedTopicIds: ["civil-information-consent"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁在自营花店网站上公开自己的姓名和个人联系手机号，注明供顾客咨询花束订单。青禾培训机构收集号码后向其打招生营销电话。陆宁从未向该机构报名、订阅或购买服务，并已明确要求不再收集使用其号码做营销；机构确认收到拒绝后仍继续。该机构本次没有履行法定义务或紧急保护等其他处理依据。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。个人信息已公开，也仍要在法定合理范围内处理，不能忽视本人明确拒绝。陆宁已拒绝培训营销，本案又没有其他合法处理依据，机构应停止这项使用；花店订单联系电话不是不受限制的招生资源。",
        sources: [
          "civil-personality-information1036",
          "civil-personality-pipl-public",
        ],
        id: "civil-personality-information-public-phone-refusal-choice",
        kind: "objective",
        choiceMode: "single",
        title: "订单电话收到招生广告：选择判断",
        prompt:
          "机构能否仅以手机号已在网上公开为由，无视陆宁明确拒绝继续营销使用？",
        options: [
          {
            id: "a",
            text: "机构不收费打电话，就无须考虑任何个人信息保护规则",
            explanation: "是否收费不是忽略处理基础及拒绝的理由。",
          },
          {
            id: "b",
            text: "不能；公开不排除本人明确拒绝，本案应停止这项营销使用",
            explanation: "第27条及民法典第1036条均要求审查公开信息处理的边界。",
          },
          {
            id: "c",
            text: "能，只要某处公开过，任何人永久都能不顾拒绝任意使用",
            explanation: "公开不等于放弃个人信息权益。",
          },
          {
            id: "d",
            text: "不能，但理由是任何合法公开信息在任何用途下都必须重新同意",
            explanation: "法律允许合理范围处理已公开信息，不能作另一极端。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-personality-information-public-phone-refusal",
        relatedTopicIds: ["civil-information-consent"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁在自营花店网站上公开自己的姓名和个人联系手机号，注明供顾客咨询花束订单。青禾培训机构收集号码后向其打招生营销电话。陆宁从未向该机构报名、订阅或购买服务，并已明确要求不再收集使用其号码做营销；机构确认收到拒绝后仍继续。该机构本次没有履行法定义务或紧急保护等其他处理依据。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。个人信息已公开，也仍要在法定合理范围内处理，不能忽视本人明确拒绝。陆宁已拒绝培训营销，本案又没有其他合法处理依据，机构应停止这项使用；花店订单联系电话不是不受限制的招生资源。",
        sources: [
          "civil-personality-information1036",
          "civil-personality-pipl-public",
        ],
        id: "civil-personality-information-public-phone-refusal-written",
        kind: "subjective",
        title: "订单电话收到招生广告：写出分析",
        prompt:
          "机构能否仅以手机号已在网上公开为由，无视陆宁明确拒绝继续营销使用？请结合案情说明理由。",
        criteria: [
          {
            id: "information-public-not-free",
            label: "公开信息仍有处理边界",
            meaning:
              "说明不能仅凭号码公开就任意使用，已公开信息仍受合理范围和明确拒绝等限制。",
            acceptable:
              "说放在网上给客户联系，不代表谁都能不顾本人意思拿去做任何事情即可。",
            boundary: "不把所有已公开信息处理一概说成必须再次同意。",
          },
          {
            id: "information-public-refusal",
            label: "本案明确拒绝后应停止营销",
            meaning:
              "联系本人已明确拒绝、机构知悉且无其他处理依据，判断应停止这项营销使用。",
            acceptable:
              "说他已经明确不要招生营销，机构又没有别的法律依据，就不能继续打着公开的旗号用即可。",
            boundary: "不要求认定所有最初收集已经违法，也不核行政罚款。",
          },
        ],
      },
      {
        caseId: "civil-personality-information-optional-withdrawal",
        relatedTopicIds: ["civil-information-consent"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁使用沐禾购物应用时，在充分告知后自愿开启可选兴趣标签，只用于其同意的商品推荐；撤回前的这项处理始终在有效同意范围内，合法性没有争议。后来陆宁关闭授权并要求删除这项标签。该标签并非订单履行所需，应用对它没有其他合法处理基础，也没有法定留存义务，技术上可以删除。本题不涉及订单记录、账户安全或其他信息。应用称第一次同意后永远不能撤回，还说若允许撤回，就只能认定先前所有处理都违法。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能继续按原同意分析、保存这项可选标签，应停止相应处理并删除；本案没有其他处理基础或留存例外。陆宁有权撤回同意，但撤回只影响此后的这项处理，不会把撤回前基于有效同意已经合法完成的处理一概变成违法。",
        sources: [
          "civil-personality-pipl-withdraw",
          "civil-personality-information1036",
        ],
        id: "civil-personality-information-optional-withdrawal-choice",
        kind: "objective",
        choiceMode: "single",
        title: "关闭可选兴趣标签：选择判断",
        prompt:
          "应用能否继续分析、保存这项标签？撤回是否使先前合法处理一概违法？",
        options: [
          {
            id: "a",
            text: "撤回任何一个可选标签，就必须删除所有依法保留的订单与账户信息",
            explanation: "本题明确限定可选标签，不能扩到其他必要记录。",
          },
          {
            id: "b",
            text: "可以继续，因为一次同意就永久不可撤回",
            explanation: "第15条赋予个人撤回同意的权利。",
          },
          {
            id: "c",
            text: "撤回意味着先前已经合法完成的所有处理自动变成违法",
            explanation: "撤回不影响撤回前基于同意处理的效力。",
          },
          {
            id: "d",
            text: "应停止并删除本案可选标签，先前合法处理不因撤回而一概违法",
            explanation:
              "结合第15、47条及本案无其他基础、可删除且无留存例外的事实。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-personality-information-optional-withdrawal",
        relatedTopicIds: ["civil-information-consent"],
        facts:
          "本案为原创教学虚构，发生于2026年9月。陆宁使用沐禾购物应用时，在充分告知后自愿开启可选兴趣标签，只用于其同意的商品推荐；撤回前的这项处理始终在有效同意范围内，合法性没有争议。后来陆宁关闭授权并要求删除这项标签。该标签并非订单履行所需，应用对它没有其他合法处理基础，也没有法定留存义务，技术上可以删除。本题不涉及订单记录、账户安全或其他信息。应用称第一次同意后永远不能撤回，还说若允许撤回，就只能认定先前所有处理都违法。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能继续按原同意分析、保存这项可选标签，应停止相应处理并删除；本案没有其他处理基础或留存例外。陆宁有权撤回同意，但撤回只影响此后的这项处理，不会把撤回前基于有效同意已经合法完成的处理一概变成违法。",
        sources: [
          "civil-personality-pipl-withdraw",
          "civil-personality-information1036",
        ],
        id: "civil-personality-information-optional-withdrawal-written",
        kind: "subjective",
        title: "关闭可选兴趣标签：写出分析",
        prompt:
          "应用能否继续分析、保存这项标签？撤回是否使先前合法处理一概违法？请结合案情说明理由。",
        criteria: [
          {
            id: "information-withdraw-stop-delete",
            label: "撤回后停止并依法删除本项信息",
            meaning:
              "说明同意可撤回，本案无其他处理依据或留存例外，应停止并删除可选标签。",
            acceptable:
              "说本人关闭了这个自愿功能，应用就不能靠以前那次同意继续用，本题标签也应删除即可。",
            boundary:
              "不把结论扩到履约必要订单记录、法定留存或技术不能删除的例外。",
          },
          {
            id: "information-withdraw-prior-valid",
            label: "先前合法处理不因撤回一概违法",
            meaning: "明确撤回不影响撤回前基于有效同意已经合法完成的处理效力。",
            acceptable:
              "说以前在有效授权下做的仍有效，不是现在撤了就倒过来全部违法即可。",
            boundary: "本题先前合法性已给定，不要求重做全部历史合规审计。",
          },
        ],
      },
    ],
  },
];

export const civilPersonalityChapters = [
  {
    id: "CIV-PERSON-NAME",
    title: "姓名、名称与笔名网名",
    section: "民法",
    topicIds: ["civil-name-use", "civil-name-alias"],
  },
  {
    id: "CIV-PORTRAIT-RIGHTS",
    title: "肖像同意与合理使用",
    section: "民法",
    topicIds: ["civil-portrait-consent", "civil-portrait-fair-use"],
  },
  {
    id: "CIV-REPUTATION-RIGHTS",
    title: "名誉保护与报道更正",
    section: "民法",
    topicIds: ["civil-reputation-publication", "civil-reputation-correction"],
  },
  {
    id: "CIV-PRIVACY-INFORMATION",
    title: "隐私与个人信息保护",
    section: "民法",
    topicIds: ["civil-privacy-space", "civil-information-consent"],
  },
];

export const civilPersonalityExercises = civilPersonalityTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilPersonalityContentPack = {
  revision: civilPersonalityRevision,
  snapshot: {
    topics: civilPersonalityTopics,
    sources: civilPersonalitySources,
  },
};
export const civilPersonalityDefaultQueues = {
  objective: civilPersonalityExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilPersonalityExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilPersonalityQuestion(id: string) {
  const question = civilPersonalityExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilPersonalityTopicForQuestion(id: string) {
  return civilPersonalityTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilPersonalitySameCaseQuestions(id: string) {
  const question = civilPersonalityQuestion(id);
  return question
    ? structuredClone(
        civilPersonalityExercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function civilPersonalityChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilPersonalityChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilPersonalityTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
