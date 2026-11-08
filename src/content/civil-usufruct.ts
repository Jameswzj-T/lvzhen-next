import type { ContentSources, FaultTopic } from "./fault-unit";

// Original fictional cases. Paired forms share facts, not independent outcomes.
export const civilUsufructRevision = "civil-usufruct-2026-10-24.v1";

export const civilUsufructSources: ContentSources = {
  "civil-usufruct-habitation366368": {
    title: "《民法典》第366—368条：居住权内容与登记设立",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-371.html",
    note: "2026-10-24直接核读最高人民法院知识产权法庭官方《民法典》正文；2020-05-28通过，2021-01-01施行。书面合同与取得钥匙入住不能替代居住权登记；登记后可按约占有使用住宅，无偿不等于房主可随时赶人。合同效力与物权设立分开；另核第215条，未登记不当然使合同无效。",
  },
  "civil-usufruct-habitation369370": {
    title: "《民法典》第369、370条：转让继承限制、出租例外与消灭",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-371.html",
    note: "2026-10-24直接核读最高人民法院知识产权法庭官方《民法典》正文；2020-05-28通过，2021-01-01施行。死亡案只问居住权本身：权利人死亡即消灭，不因尚未注销或原约定期限未满而可继承。出租案为双方合同明确允许的短期外出期间出租，租期未越过居住权存续期。不把租赁等同于转让居住权，也不把居住权消灭扩大为所有合同债权消灭。",
  },
  "civil-usufruct-easement372374": {
    title: "《民法典》第372—374条：书面地役权合同与设立",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-371.html",
    note: "2026-10-24直接核读最高人民法院知识产权法庭官方《民法典》正文；2020-05-28通过，2021-01-01施行。有效书面地役权合同生效时设立；登记不是该项设立条件。便捷路线用于提高需役地效益，有其他正常公共出路不否定合同地役权；期限与付款均明确，无附加登记生效约定。",
  },
  "civil-usufruct-neighbor291": {
    title: "《民法典》第291、372条：必要相邻通行与合同地役权",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-371.html",
    note: "2026-10-24直接核读最高人民法院知识产权法庭官方《民法典》正文；2020-05-28通过，2021-01-01施行。相邻必要通行须有必须利用事实；地役权可依有效合同约定提高需役地效益。本案已有正常公共路，不能套用相邻必要性去否定已经约定的合同地役权。",
  },
  "civil-usufruct-easement-third374": {
    title: "《民法典》第374条：未登记地役权与善意第三人",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-371.html",
    note: "2026-10-24直接核读最高人民法院知识产权法庭官方《民法典》正文；2020-05-28通过，2021-01-01施行。第三人是已依法受让并登记取得供役地建设用地使用权及厂房的受让人，不是普通债权人。原地役未登记、未使用无外观，交易中查簿勘查且无其他应知线索；第三人在取得时善意作为非所考前提无争议。仅判不能以该地役权对抗其取得，不说原合同从未生效。",
  },
  "civil-usufruct-easement-supply375": {
    title: "《民法典》第375条：供役地权利人不得妨害约定利用",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-371.html",
    note: "2026-10-24直接核读最高人民法院知识产权法庭官方《民法典》正文；2020-05-28通过，2021-01-01施行。有效并登记的地役权仍在约定期内，需役方按约付款使用，未解除。供役方不能只因需役方还有别路或自己想堆货，就封住约定路线；没有第三人或权属争议。",
  },
  "civil-usufruct-easement-use376377": {
    title: "《民法典》第376、377条：目的方法限用与期限",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-371.html",
    note: "2026-10-24直接核读最高人民法院知识产权法庭官方《民法典》正文；2020-05-28通过，2021-01-01施行。合同明确轻型送货车、指定边缘路线，不能擅自改重型工程车或拓宽占用；应尽量减少对供役地权利的限制。各案期限未超过所涉用益物权剩余期限，不编免费永久占用、固定赔偿或自动解除结果。",
  },
  "civil-usufruct-building349": {
    title: "《民法典》第215、348—349条：出让合同与登记设立",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。通过出让新设国有建设用地使用权。书面出让合同依法有效、费用已付但尚未登记；合同效力与物权设立分开。不是划拨、继承、法院形成判决或其他法定非登记取得。本题不以未登记倒推有效合同无效。",
  },
  "civil-usufruct-space345": {
    title: "《民法典》第345—346条：空间分层与既有权利",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。登记及合同已明确既有权利的空间边界，拟另设地下层与之不重叠，勘查排除损害既有用益物权。仅判断能否分别设立，不认定取得地表层即控制无限地下，也不免除规划、用途、登记等手续。",
  },
  "civil-usufruct-building357": {
    title: "《民法典》第355—357条：房地一并处分",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。合法仓库及其占用范围内建设用地使用权同属一人，符合转让条件，无区分所有、抵押、查封等另项争议。只考建筑转让时的房地一体，未办理变更登记不直接认定买方已取得物权，不扩大到同一地块所有无关范围。",
  },
  "civil-usufruct-residential359": {
    title: "《民法典》第359条：住宅用地自动续期",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。已明确为住宅建设用地使用权，原合法产权无争议，无公共利益提前收回事实。自动续期与续期费用另依法律行政法规分开，不保证一律免费，不扩成非住宅、租赁或居住权自动续期。",
  },
  "civil-usufruct-contract333": {
    title: "《民法典》第331、333条：家庭承包权的设立",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。农户家庭承包、集体发包程序合法、合同已生效；证书尚在办理不妨碍本题土地承包经营权已经设立。不是荒山等其他方式承包，亦不把农户身份、农村成员资格或合同有效性作为隐含争点。",
  },
  "civil-usufruct-contract337": {
    title: "《民法典》第336—337条：承包期内保护",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。家庭承包合同尚在期限内，承包方正常耕种、未交回、无征收或法定调整收回事由；仅因为另一经营者愿多付款，不得收回重包。不把禁止任意收回说成法律永无例外。",
  },
  "civil-usufruct-management341": {
    title: "《民法典》第339—341条：土地经营权流转与登记",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/202006/t20200602_1913330.html",
    note: "2026-10-24直接核读官方正文。《民法典》2020-05-28通过，2021-01-01施行；北京市政府官方全文。家庭承包方在剩余期限内依法出租经营权七年，书面合同已生效、所需备案和资质事项完成，无善意第三人冲突。五年以上土地经营权合同生效即设立，未登记影响对抗善意第三人，不等于合同双方之间没有权利，也不等于承包关系已转让。",
  },
  "civil-usufruct-rural38": {
    title: "《农村土地承包法》第36—44条：经营权流转的期限和边界",
    url: "https://fgs.moa.gov.cn/flfg/202002/t20200217_6337175.htm",
    note: "2026-10-24直接核读农业农村部官方正文第36—44条，重点第38条第三项。2018-12-29第二次修正，2019-01-01施行。流转期限不得超过承包期剩余期限。八年案现有承包期只剩三年、无已取得的延长安排，不要求判断超期条款之外合同部分的效力、返还或违约责任，也不否定依法继续承包后的另行安排。七年案已向发包方备案、受让人有农业经营能力，继续农业用途，原承包关系不因经营权出租而当然终止。",
  },
};

export const civilUsufructTopics: FaultTopic[] = [
  {
    id: "civil-habitation-establishment",
    title: "居住权的设立",
    headline:
      "居住权从登记时设立；合同与入住本身不能替代登记，登记后可按约居住。",
    goal: "仅凭有效书面合同和实际入住，乔霏的居住权是否已经设立？",
    prerequisite: "能分清合同生效、物权设立、登记效力和合同利用范围。",
    minutes: "6–10",
    paragraphs: [
      "居住权是按约占有、使用他人住宅以满足生活居住需要的用益物权。设立应订立书面合同，并办理登记；物权从登记时设立。合同有效与物权是否已设立，要分开判断。",
      "居住权原则上无偿，当事人也可另作约定。已经登记、仍在约定条件与期限内的居住，不会仅因不收费用就变成房主可随时撤回的借住。",
    ],
    example: {
      title: "拿到钥匙但还没有登记",
      facts:
        "本案为原创教学虚构，争议发生于2026年9月。9月1日，房屋所有人段澈与乔霏签订书面居住权合同，约定该住宅供乔霏本人生活居住八年。合同有效没有争议，段澈也按约交付钥匙，乔霏已经入住。但到9月10日，双方尚未申请或办理居住权登记。乔霏称签约加入住已经足够，自己已取得设立完毕的居住权。本题只问居住权物权是否设立。",
      analysis:
        "尚未设立。居住权自登记时设立，本案还没有登记；签合同、交钥匙和入住都不能替代这一步。",
    },
    pitfall: "认为拿到钥匙就已设立居住权，或把无偿等同于没有受保护的权利。",
    recall: {
      prompt: "仅凭有效书面合同和实际入住，乔霏的居住权是否已经设立？",
      reference:
        "居住权从登记时设立；合同与入住本身不能替代登记，登记后可按约居住。",
    },
    sources: ["civil-usufruct-habitation366368"],
    exercises: [
      {
        caseId: "civil-usufruct-habitation-contract-without-registration",
        relatedTopicIds: ["civil-habitation-establishment"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。9月1日，房屋所有人段澈与乔霏签订书面居住权合同，约定该住宅供乔霏本人生活居住八年。合同有效没有争议，段澈也按约交付钥匙，乔霏已经入住。但到9月10日，双方尚未申请或办理居住权登记。乔霏称签约加入住已经足够，自己已取得设立完毕的居住权。本题只问居住权物权是否设立。",
        hint: "直接说明结论和案情理由。",
        reference:
          "尚未设立。居住权自登记时设立，本案还没有登记；签合同、交钥匙和入住都不能替代这一步。",
        sources: ["civil-usufruct-habitation366368"],
        id: "civil-usufruct-habitation-contract-without-registration-choice",
        kind: "objective",
        choiceMode: "single",
        title: "拿到钥匙但还没有登记：选择判断",
        prompt: "仅凭有效书面合同和实际入住，乔霏的居住权是否已经设立？",
        options: [
          {
            id: "a",
            text: "尚未设立，合同和入住不能替代居住权登记",
            explanation: "第368条规定居住权自登记时设立。",
          },
          {
            id: "b",
            text: "已经设立，任何入住都自动产生居住权物权",
            explanation: "实际居住不等于完成居住权的法定设立。",
          },
          {
            id: "c",
            text: "已经设立，居住权与地役权都一律只需合同生效",
            explanation: "两者设立规则不同，不能把第374条直接移给居住权。",
          },
          {
            id: "d",
            text: "尚未设立，所以书面合同也当然无效",
            explanation: "物权未设立与合同效力不同，本题合同有效无争议。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-usufruct-habitation-contract-without-registration",
        relatedTopicIds: ["civil-habitation-establishment"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。9月1日，房屋所有人段澈与乔霏签订书面居住权合同，约定该住宅供乔霏本人生活居住八年。合同有效没有争议，段澈也按约交付钥匙，乔霏已经入住。但到9月10日，双方尚未申请或办理居住权登记。乔霏称签约加入住已经足够，自己已取得设立完毕的居住权。本题只问居住权物权是否设立。",
        hint: "直接说明结论和案情理由。",
        reference:
          "尚未设立。居住权自登记时设立，本案还没有登记；签合同、交钥匙和入住都不能替代这一步。",
        sources: ["civil-usufruct-habitation366368"],
        id: "civil-usufruct-habitation-contract-without-registration-written",
        kind: "subjective",
        title: "拿到钥匙但还没有登记：写出分析",
        prompt:
          "仅凭有效书面合同和实际入住，乔霏的居住权是否已经设立？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-usufruct-hab-unregistered",
            label: "未登记，居住权物权尚未设立",
            meaning:
              "结合虽已签有效合同并入住但尚未登记，说明居住权尚未设立，合同和交付不能替代登记。",
            acceptable:
              "说明还没登记，就还没设立居住权，签字或拿钥匙不够即可；接受等义表达。",
            boundary:
              "只问居住权物权，不把合同当然判无效，不否定可能已有的合同履行或居住依据。",
          },
        ],
      },
      {
        caseId: "civil-usufruct-habitation-registered-free-use",
        relatedTopicIds: ["civil-habitation-establishment"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。房主方舟与程萱于2026年3月订立有效书面合同，并完成居住权登记，约定住宅全部供程萱本人无偿生活居住五年。程萱一直按约使用，期限尚未届满，也无解除或其他消灭事实。9月，方舟想自己使用房屋，只以程萱没有付费为由要求她立即搬走，并准备换锁阻止进入。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。程萱的居住权已经登记，期限未满，也一直按约使用。无偿不意味着房主可以随时收回，方舟不能只因未收费用就赶她搬走或换锁阻止进入。",
        sources: ["civil-usufruct-habitation366368"],
        id: "civil-usufruct-habitation-registered-free-use-choice",
        kind: "objective",
        choiceMode: "single",
        title: "无偿不等于可以随时换锁：选择判断",
        prompt: "方舟能否只因居住无偿，就阻止程萱继续按约占有使用住宅？",
        options: [
          {
            id: "a",
            text: "能，无偿就意味着任何时候都只能算随意借住",
            explanation: "居住权可以依法无偿设立，无偿不排除其物权保护。",
          },
          {
            id: "b",
            text: "能，只要房主想改为自用，登记居住权就自动消灭",
            explanation:
              "本题没有发生期限届满、死亡等消灭事实，单方想自用并非所述自动消灭事由。",
          },
          {
            id: "c",
            text: "不能，已登记且仍按约存续的居住权不因无偿而可随意排除",
            explanation: "第366、368条支持其在合同约定条件内占有使用住宅。",
          },
          {
            id: "d",
            text: "不能，所以程萱已取得该房屋所有权",
            explanation: "居住权与房屋所有权并不相同。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-usufruct-habitation-registered-free-use",
        relatedTopicIds: ["civil-habitation-establishment"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。房主方舟与程萱于2026年3月订立有效书面合同，并完成居住权登记，约定住宅全部供程萱本人无偿生活居住五年。程萱一直按约使用，期限尚未届满，也无解除或其他消灭事实。9月，方舟想自己使用房屋，只以程萱没有付费为由要求她立即搬走，并准备换锁阻止进入。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。程萱的居住权已经登记，期限未满，也一直按约使用。无偿不意味着房主可以随时收回，方舟不能只因未收费用就赶她搬走或换锁阻止进入。",
        sources: ["civil-usufruct-habitation366368"],
        id: "civil-usufruct-habitation-registered-free-use-written",
        kind: "subjective",
        title: "无偿不等于可以随时换锁：写出分析",
        prompt:
          "方舟能否只因居住无偿，就阻止程萱继续按约占有使用住宅？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-usufruct-hab-registered-use",
            label: "已登记的无偿居住权可按约行使",
            meaning:
              "联系登记完成、期限未满、按约使用，说明方舟不能仅因无偿排除程萱继续居住。",
            acceptable:
              "说明登记后的居住权还在有效期内，不收费也不能由房主说赶就赶即可；接受等义表达。",
            boundary:
              "不要求取得房屋所有权，也不判断本题未发生的其他解除、消灭事由或赔偿。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-habitation-limits",
    title: "居住权的限制与消灭",
    headline:
      "居住权本身不得转让、继承；出租有约定例外，期满或权利人死亡则消灭。",
    goal: "杜朗能否继承这项居住权？尚未注销和期限未满是否改变结果？",
    prerequisite: "能分清合同生效、物权设立、登记效力和合同利用范围。",
    minutes: "6–10",
    paragraphs: [
      "居住权不得转让、继承。期限届满或居住权人死亡时，居住权消灭，应及时办理注销登记；没有注销，不会让已经消灭的本权继续存续。",
      "设立居住权的住宅原则上不得出租，但当事人可以另作约定。依明确许可出租，应守约定范围与期限；出租不是把居住权物权转给承租人。",
    ],
    example: {
      title: "登记还在，权利人已经死亡",
      facts:
        "本案为原创教学虚构，争议发生于2026年9月。罗宁名下住宅曾于2026年3月为杜璇依法登记居住权，原约定期限至2036年。杜璇于2026年9月5日死亡，注销手续尚未办理。成年儿子杜朗不是该房屋所有人，也没有另行登记居住权或独立居住协议。他只以自己是杜璇继承人、登记尚未注销且原期限未满为由，主张继承母亲的剩余居住权。本题只问该项居住权本身。",
      analysis:
        "不能。居住权不得继承，并在杜璇死亡时消灭。原期限未满、登记尚未注销都不能让杜朗继承这项已经消灭的居住权。",
    },
    pitfall: "把剩余年限当作可继承的财产，或把不得出租误说成没有任何约定例外。",
    recall: {
      prompt: "杜朗能否继承这项居住权？尚未注销和期限未满是否改变结果？",
      reference:
        "居住权本身不得转让、继承；出租有约定例外，期满或权利人死亡则消灭。",
    },
    sources: ["civil-usufruct-habitation369370"],
    exercises: [
      {
        caseId: "civil-usufruct-habitation-death-no-inheritance",
        relatedTopicIds: ["civil-habitation-limits"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。罗宁名下住宅曾于2026年3月为杜璇依法登记居住权，原约定期限至2036年。杜璇于2026年9月5日死亡，注销手续尚未办理。成年儿子杜朗不是该房屋所有人，也没有另行登记居住权或独立居住协议。他只以自己是杜璇继承人、登记尚未注销且原期限未满为由，主张继承母亲的剩余居住权。本题只问该项居住权本身。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。居住权不得继承，并在杜璇死亡时消灭。原期限未满、登记尚未注销都不能让杜朗继承这项已经消灭的居住权。",
        sources: ["civil-usufruct-habitation369370"],
        id: "civil-usufruct-habitation-death-no-inheritance-choice",
        kind: "objective",
        choiceMode: "single",
        title: "登记还在，权利人已经死亡：选择判断",
        prompt: "杜朗能否继承这项居住权？尚未注销和期限未满是否改变结果？",
        options: [
          {
            id: "a",
            text: "可以，只要原期限未满，剩余年限就一律转给继承人",
            explanation: "第369条禁止居住权继承，第370条明确死亡消灭。",
          },
          {
            id: "b",
            text: "不可以，死亡时本权已消灭，未注销也不让继承人成为居住权人",
            explanation: "注销应及时办理，但不是本案死亡消灭的发生条件。",
          },
          {
            id: "c",
            text: "可以，任何已经登记的权利都永远不会因死亡消灭",
            explanation: "居住权有专门的死亡消灭规定。",
          },
          {
            id: "d",
            text: "不可以，所以杜璇生前所有合同债权也一律随死亡消灭",
            explanation: "居住权本身消灭不能扩大为一切合同债权消灭。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-usufruct-habitation-death-no-inheritance",
        relatedTopicIds: ["civil-habitation-limits"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。罗宁名下住宅曾于2026年3月为杜璇依法登记居住权，原约定期限至2036年。杜璇于2026年9月5日死亡，注销手续尚未办理。成年儿子杜朗不是该房屋所有人，也没有另行登记居住权或独立居住协议。他只以自己是杜璇继承人、登记尚未注销且原期限未满为由，主张继承母亲的剩余居住权。本题只问该项居住权本身。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。居住权不得继承，并在杜璇死亡时消灭。原期限未满、登记尚未注销都不能让杜朗继承这项已经消灭的居住权。",
        sources: ["civil-usufruct-habitation369370"],
        id: "civil-usufruct-habitation-death-no-inheritance-written",
        kind: "subjective",
        title: "登记还在，权利人已经死亡：写出分析",
        prompt:
          "杜朗能否继承这项居住权？尚未注销和期限未满是否改变结果？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-usufruct-hab-death-extinction",
            label: "死亡消灭，不能继承本权",
            meaning:
              "联系杜璇死亡，说明居住权已消灭且不得继承，未注销和原期限未满均不能支持杜朗主张。",
            acceptable:
              "说明母亲一去世这项居住权就没了，儿子不能继承，证上还没注销也不改变即可；接受等义表达。",
            boundary:
              "结论只及居住权本身，不处理遗产其他财产、已发生的合同债权或独立居住安排。",
          },
        ],
      },
      {
        caseId: "civil-usufruct-habitation-agreed-rental-exception",
        relatedTopicIds: ["civil-habitation-limits"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。邹禾于2026年6月为梁芷完成住宅居住权登记，期限至2031年，双方有效合同明确约定：梁芷短期外出工作时，可将该住宅出租供他人居住，租期不得超出其居住权存续期。梁芷9月至11月在外工作，9月2日依此约定订立租约，租期为9月3日至11月30日，之后回来居住。邹禾仅以法律写有“不得出租”为由，称这次符合约定的出租仍绝对不允许。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。第369条允许当事人另作约定。本案合同明确许可短期外出期间出租，这次用途、情形和租期都符合约定，不能把原则上的不得出租说成绝无例外。",
        sources: ["civil-usufruct-habitation369370"],
        id: "civil-usufruct-habitation-agreed-rental-exception-choice",
        kind: "objective",
        choiceMode: "single",
        title: "合同允许外出期间出租：选择判断",
        prompt:
          "邹禾能否无视双方明确许可，仅凭“不得出租”认定本次出租违反第369条？",
        options: [
          {
            id: "a",
            text: "能，第369条的出租限制在任何情况下都不能另约",
            explanation: "该条明确保留当事人另有约定的例外。",
          },
          {
            id: "b",
            text: "能，因为所有居住权合同只要谈到出租就全部无效",
            explanation: "法律允许另有约定，不能如此扩大无效。",
          },
          {
            id: "c",
            text: "不能，所以承租人从此自动成为登记居住权人",
            explanation: "许可出租不等于转让居住权或变更登记权利人。",
          },
          {
            id: "d",
            text: "不能，这次出租符合有效合同明确许可，属于法定约定例外",
            explanation: "第369条但书适用，且没有超出题内约定条件和期限。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-usufruct-habitation-agreed-rental-exception",
        relatedTopicIds: ["civil-habitation-limits"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。邹禾于2026年6月为梁芷完成住宅居住权登记，期限至2031年，双方有效合同明确约定：梁芷短期外出工作时，可将该住宅出租供他人居住，租期不得超出其居住权存续期。梁芷9月至11月在外工作，9月2日依此约定订立租约，租期为9月3日至11月30日，之后回来居住。邹禾仅以法律写有“不得出租”为由，称这次符合约定的出租仍绝对不允许。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。第369条允许当事人另作约定。本案合同明确许可短期外出期间出租，这次用途、情形和租期都符合约定，不能把原则上的不得出租说成绝无例外。",
        sources: ["civil-usufruct-habitation369370"],
        id: "civil-usufruct-habitation-agreed-rental-exception-written",
        kind: "subjective",
        title: "合同允许外出期间出租：写出分析",
        prompt:
          "邹禾能否无视双方明确许可，仅凭“不得出租”认定本次出租违反第369条？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-usufruct-hab-rental-exception",
            label: "明确许可的出租适用约定例外",
            meaning:
              "联系合同允许短期外出期间出租、这次用途与租期相符，说明不能仅以原则不得出租否定本次出租。",
            acceptable:
              "说明法律允许双方另约，房主已同意这种短期出租，本次没越过约定就可依约出租即可；接受等义表达。",
            boundary:
              "不要求承租人取得居住权，也不判断未给出的租赁合同争议或居住权消灭后的租约处理。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-easement-establishment",
    title: "地役权的设立与登记效力",
    headline:
      "地役权从合同生效时设立；未登记仍可能已设立，但不能对抗善意第三人。",
    goal: "该地役权是否已设立？另有正常公共出路，是否就足以否定这项合同地役权？",
    prerequisite: "能分清合同生效、物权设立、登记效力和合同利用范围。",
    minutes: "6–10",
    paragraphs: [
      "地役权依书面合同约定利用他人不动产，提高自己不动产的效益，自合同生效时设立。它可约定更便利的通道，不要求像相邻必要通行那样先证明只有这一条出路。",
      "当事人可以申请地役权登记。未登记不妨碍依合同设立，但不能对抗善意第三人；不能把不对抗与从未设立混为一谈。",
    ],
    example: {
      title: "为了缩短送货路线订的合同",
      facts:
        "本案为原创教学虚构，争议发生于2026年9月。青遥公司与禾川公司分别合法享有相邻地块的建设用地使用权及厂房所有权，两地使用权剩余期限均超过十年。青遥仓库已有正常可用的公共出路，为缩短送货路线，双方于2026年9月1日签订立即生效的书面地役权合同：青遥可付费利用禾川地块边缘指定路线通行五年。费用已依约支付，无附加登记生效条件，尚未办理登记。9月3日，禾川仅以未登记、青遥还有其他出路为由，称地役权根本没有设立。",
      analysis:
        "已经设立。地役权自合同生效时设立，本案书面合同已生效，不以登记作为设立条件。它是双方为提高仓库使用效益约定的近路，不因已有其他正常出路就被否定。",
    },
    pitfall:
      "把居住权登记设立规则移给地役权，或反过来认为未登记地役权能对抗所有后来受让人。",
    recall: {
      prompt:
        "该地役权是否已设立？另有正常公共出路，是否就足以否定这项合同地役权？",
      reference:
        "地役权从合同生效时设立；未登记仍可能已设立，但不能对抗善意第三人。",
    },
    sources: [
      "civil-usufruct-easement372374",
      "civil-usufruct-neighbor291",
      "civil-usufruct-easement-third374",
    ],
    exercises: [
      {
        caseId: "civil-usufruct-easement-contract-no-registration",
        relatedTopicIds: ["civil-easement-establishment"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。青遥公司与禾川公司分别合法享有相邻地块的建设用地使用权及厂房所有权，两地使用权剩余期限均超过十年。青遥仓库已有正常可用的公共出路，为缩短送货路线，双方于2026年9月1日签订立即生效的书面地役权合同：青遥可付费利用禾川地块边缘指定路线通行五年。费用已依约支付，无附加登记生效条件，尚未办理登记。9月3日，禾川仅以未登记、青遥还有其他出路为由，称地役权根本没有设立。",
        hint: "直接说明结论和案情理由。",
        reference:
          "已经设立。地役权自合同生效时设立，本案书面合同已生效，不以登记作为设立条件。它是双方为提高仓库使用效益约定的近路，不因已有其他正常出路就被否定。",
        sources: [
          "civil-usufruct-easement372374",
          "civil-usufruct-neighbor291",
        ],
        id: "civil-usufruct-easement-contract-no-registration-choice",
        kind: "objective",
        choiceMode: "single",
        title: "为了缩短送货路线订的合同：选择判断",
        prompt:
          "该地役权是否已设立？另有正常公共出路，是否就足以否定这项合同地役权？",
        options: [
          {
            id: "a",
            text: "已经设立，未登记不妨碍设立，另有出路也不否定这项有效约定",
            explanation:
              "第372、374条支持合同地役权，不以相邻必要通行的唯一出路为条件。",
          },
          {
            id: "b",
            text: "没有设立，因为地役权与居住权一样只能登记后设立",
            explanation: "第374条与第368条的设立规则不同。",
          },
          {
            id: "c",
            text: "没有设立，因为任何通行地役权都要求完全没有其他道路",
            explanation: "这是把相邻必要通行条件误加到有效合同地役权上。",
          },
          {
            id: "d",
            text: "已经设立，所以青遥可永久无偿使用整块供役地",
            explanation: "本案合同仅五年、付费、指定路线，不产生无限扩张权。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-usufruct-easement-contract-no-registration",
        relatedTopicIds: ["civil-easement-establishment"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。青遥公司与禾川公司分别合法享有相邻地块的建设用地使用权及厂房所有权，两地使用权剩余期限均超过十年。青遥仓库已有正常可用的公共出路，为缩短送货路线，双方于2026年9月1日签订立即生效的书面地役权合同：青遥可付费利用禾川地块边缘指定路线通行五年。费用已依约支付，无附加登记生效条件，尚未办理登记。9月3日，禾川仅以未登记、青遥还有其他出路为由，称地役权根本没有设立。",
        hint: "直接说明结论和案情理由。",
        reference:
          "已经设立。地役权自合同生效时设立，本案书面合同已生效，不以登记作为设立条件。它是双方为提高仓库使用效益约定的近路，不因已有其他正常出路就被否定。",
        sources: [
          "civil-usufruct-easement372374",
          "civil-usufruct-neighbor291",
        ],
        id: "civil-usufruct-easement-contract-no-registration-written",
        kind: "subjective",
        title: "为了缩短送货路线订的合同：写出分析",
        prompt:
          "该地役权是否已设立？另有正常公共出路，是否就足以否定这项合同地役权？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-usufruct-ease-contract-effective",
            label: "合同生效时已设立，未登记不否定设立",
            meaning:
              "联系有效书面合同于9月1日生效、无登记生效另约，认定地役权已设立。",
            acceptable:
              "说明地役权合同已生效就设立，没登记也不是根本没有这个权利即可；接受等义表达。",
            boundary:
              "不把该结论扩大为能对抗一切第三人，不要求先办理地役权登记。",
          },
          {
            id: "civil-usufruct-ease-not-necessity",
            label: "有其他出路不否定有效合同地役权",
            meaning:
              "说明合同为提高需役地效益约定便捷通行，不以相邻必要通行的必须利用条件为设立前提。",
            acceptable:
              "说明这是双方约好的近路，不是强迫邻人让唯一出路；已有别路也能依合同设地役权即可。",
            boundary:
              "不把本案约定变成对未同意的邻人强制开路，也不创设免费永久使用。",
          },
        ],
      },
      {
        caseId: "civil-usufruct-easement-unregistered-good-faith-transferee",
        relatedTopicIds: ["civil-easement-establishment"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。2026年9月1日，松庭与予川就各自依法享有、剩余期限均超过十年的建设用地使用权订立有效书面地役权合同，予川可在松庭地块边缘通行四年，未登记。通行尚未实际实施，现场没有相关通道、标志或其他外观。9月15日，海禾公司依法受让该供役地全部建设用地使用权及厂房并完成变更登记，支付合理价格。海禾此前查过登记、实地勘查，登记无地役权记录，松庭未披露，也无其他应知线索；本题海禾在取得时不知道且不应知道该地役权，善意没有争议。9月20日，予川要求海禾按原地役权让路。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。地役权虽已随原合同生效而设立，但未登记不得对抗善意第三人。海禾已善意受让并登记取得供役地权利，予川不能凭这项未登记地役权强求海禾承担通行负担。",
        sources: [
          "civil-usufruct-easement372374",
          "civil-usufruct-easement-third374",
        ],
        id: "civil-usufruct-easement-unregistered-good-faith-transferee-choice",
        kind: "objective",
        choiceMode: "single",
        title: "后来取得供役地的受让人：选择判断",
        prompt:
          "予川能否以这项未登记的地役权，对抗已善意取得供役地权利的海禾？",
        options: [
          {
            id: "a",
            text: "能，只要原合同生效，任何未登记地役权都可对抗所有第三人",
            explanation: "第374条明确限制未登记地役权对善意第三人的效力。",
          },
          {
            id: "b",
            text: "不能，所以原合同从订立时就从未生效、地役权也从未设立",
            explanation: "不得对抗善意第三人与原合同及设立效力不同。",
          },
          {
            id: "c",
            text: "不能，原地役权未登记，不得对抗本案善意受让人",
            explanation: "海禾取得物权时善意已限定，符合第374条的对抗限制。",
          },
          {
            id: "d",
            text: "能，因为善意第三人仅能是普通债权人，不能是物权受让人",
            explanation:
              "本案善意受让供役地物权的人正是所问第三人，不应无依据排除。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-usufruct-easement-unregistered-good-faith-transferee",
        relatedTopicIds: ["civil-easement-establishment"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。2026年9月1日，松庭与予川就各自依法享有、剩余期限均超过十年的建设用地使用权订立有效书面地役权合同，予川可在松庭地块边缘通行四年，未登记。通行尚未实际实施，现场没有相关通道、标志或其他外观。9月15日，海禾公司依法受让该供役地全部建设用地使用权及厂房并完成变更登记，支付合理价格。海禾此前查过登记、实地勘查，登记无地役权记录，松庭未披露，也无其他应知线索；本题海禾在取得时不知道且不应知道该地役权，善意没有争议。9月20日，予川要求海禾按原地役权让路。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。地役权虽已随原合同生效而设立，但未登记不得对抗善意第三人。海禾已善意受让并登记取得供役地权利，予川不能凭这项未登记地役权强求海禾承担通行负担。",
        sources: [
          "civil-usufruct-easement372374",
          "civil-usufruct-easement-third374",
        ],
        id: "civil-usufruct-easement-unregistered-good-faith-transferee-written",
        kind: "subjective",
        title: "后来取得供役地的受让人：写出分析",
        prompt:
          "予川能否以这项未登记的地役权，对抗已善意取得供役地权利的海禾？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-usufruct-ease-good-faith-third",
            label: "未登记地役权不能对抗本案善意受让人",
            meaning:
              "联系原地役未登记、海禾已依法登记取得供役地权利且取得时善意无争议，说明予川不能以该地役权对抗海禾。",
            acceptable:
              "说明原合同可已设权，但没登记就不能拿它对抗这里确实不知情的善意新权利人即可；接受等义表达。",
            boundary:
              "善意作为不考前提，结论限本案受让人；不说原合同未生效，不判断予川对松庭的其他合同请求。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-easement-use-limits",
    title: "地役权的利用范围与双方义务",
    headline: "供役方不得挡住按约利用，需役方也不能超目的、超方法扩大负担。",
    goal: "邓清能否因宋可另有公共路、自己想堆货，就封住合同约定通道？",
    prerequisite: "能分清合同生效、物权设立、登记效力和合同利用范围。",
    minutes: "6–10",
    paragraphs: [
      "供役地权利人应按合同允许地役权人利用，不得妨害。合同仍有效、需役方依约使用时，供役方不能只因自己想另作安排就堵断路线。",
      "地役权人要依约定目的和方法利用，尽量减少对供役地权利的限制。期限受约定及相关用益物权剩余期限约束，不能把有限通行变成任意使用整块土地。",
    ],
    example: {
      title: "供役方把约定路线堆满货",
      facts:
        "本案为原创教学虚构，争议发生于2026年9月。邓清与宋可分别依法享有相邻地块使用权。2026年3月，双方有效书面地役权合同并已登记，允许宋可花苗仓每周三次沿邓清地块边缘指定通道使用轻型送货车，期限三年，不超过双方使用权剩余期限。宋可已按约付款和通行，合同未解除。9月，邓清把货物堆满这条通道，要求宋可改走绕远的公共路，理由是自己想把该处作临时货场，宋可又不是完全无路可走。",
      analysis:
        "不能。合同约定的地役权仍在，宋可也按约付款、使用。邓清应允许约定通行，不得堆货妨害；宋可还有其他路，不会因此让这项有效地役权自行失效。",
    },
    pitfall: "把仍有其他路线当成可随意毁约的理由，或把地役权当成供役地所有权。",
    recall: {
      prompt: "邓清能否因宋可另有公共路、自己想堆货，就封住合同约定通道？",
      reference: "供役方不得挡住按约利用，需役方也不能超目的、超方法扩大负担。",
    },
    sources: [
      "civil-usufruct-easement-supply375",
      "civil-usufruct-easement-use376377",
    ],
    exercises: [
      {
        caseId: "civil-usufruct-easement-servient-obstruction",
        relatedTopicIds: ["civil-easement-use-limits"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。邓清与宋可分别依法享有相邻地块使用权。2026年3月，双方有效书面地役权合同并已登记，允许宋可花苗仓每周三次沿邓清地块边缘指定通道使用轻型送货车，期限三年，不超过双方使用权剩余期限。宋可已按约付款和通行，合同未解除。9月，邓清把货物堆满这条通道，要求宋可改走绕远的公共路，理由是自己想把该处作临时货场，宋可又不是完全无路可走。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。合同约定的地役权仍在，宋可也按约付款、使用。邓清应允许约定通行，不得堆货妨害；宋可还有其他路，不会因此让这项有效地役权自行失效。",
        sources: [
          "civil-usufruct-easement-supply375",
          "civil-usufruct-easement-use376377",
        ],
        id: "civil-usufruct-easement-servient-obstruction-choice",
        kind: "objective",
        choiceMode: "single",
        title: "供役方把约定路线堆满货：选择判断",
        prompt: "邓清能否因宋可另有公共路、自己想堆货，就封住合同约定通道？",
        options: [
          {
            id: "a",
            text: "能，只要需役方还有任何其他道路，地役权就自动消灭",
            explanation: "其他道路的存在不自动消灭本案有效合同地役权。",
          },
          {
            id: "b",
            text: "不能，供役方应允许按约利用，不得擅自堵断约定通道",
            explanation: "第375条明确供役地权利人的允许利用与不得妨害义务。",
          },
          {
            id: "c",
            text: "能，只要土地由邓清依法使用，合同负担可随时忽略",
            explanation: "自己的使用权不等于可无视已经有效设立的约定负担。",
          },
          {
            id: "d",
            text: "不能，所以宋可可以连约定之外的区域也任意占用",
            explanation: "保护按约通行不等于扩大到其他区域。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-usufruct-easement-servient-obstruction",
        relatedTopicIds: ["civil-easement-use-limits"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。邓清与宋可分别依法享有相邻地块使用权。2026年3月，双方有效书面地役权合同并已登记，允许宋可花苗仓每周三次沿邓清地块边缘指定通道使用轻型送货车，期限三年，不超过双方使用权剩余期限。宋可已按约付款和通行，合同未解除。9月，邓清把货物堆满这条通道，要求宋可改走绕远的公共路，理由是自己想把该处作临时货场，宋可又不是完全无路可走。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。合同约定的地役权仍在，宋可也按约付款、使用。邓清应允许约定通行，不得堆货妨害；宋可还有其他路，不会因此让这项有效地役权自行失效。",
        sources: [
          "civil-usufruct-easement-supply375",
          "civil-usufruct-easement-use376377",
        ],
        id: "civil-usufruct-easement-servient-obstruction-written",
        kind: "subjective",
        title: "供役方把约定路线堆满货：写出分析",
        prompt:
          "邓清能否因宋可另有公共路、自己想堆货，就封住合同约定通道？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-usufruct-ease-servient-no-obstruction",
            label: "供役方不得妨害仍有效的约定通行",
            meaning:
              "联系登记地役权仍在期内、宋可依约付款使用，说明邓清不得只因另有路或想堆货而堵断通道。",
            acceptable:
              "说明这条路已经按合同设了地役权，对方照约用，就不能因自己想摆货或人家有别路而封掉即可；接受等义表达。",
            boundary:
              "不要求把必要通行作为额外条件，不授予占用约定外区域或计算赔偿的权利。",
          },
        ],
      },
      {
        caseId: "civil-usufruct-easement-dominant-excess-use",
        relatedTopicIds: ["civil-easement-use-limits"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。萧野与许棠就各自依法使用的地块，于2026年6月订立有效书面地役权合同并登记，期限两年，不超过剩余使用权期限。合同只允许萧野的小型送货车沿许棠地块边缘既有路线通行，费用已付。9月，萧野为另一项目施工，改派重型工程车经过，还未经同意把路线向院内拓宽、占压花坛，造成原路面破损。他说既然已有地役权，就能按自己业务需要调整车辆和路线。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。地役权应按合同约定的目的和方法行使。这里只约定轻型送货和既有边缘路线，重车施工运输、向院内拓宽都超出范围，还加重对许棠的限制，应停止这些超约使用。",
        sources: ["civil-usufruct-easement-use376377"],
        id: "civil-usufruct-easement-dominant-excess-use-choice",
        kind: "objective",
        choiceMode: "single",
        title: "轻型通行变成重车工地路：选择判断",
        prompt: "萧野能否凭已有地役权，擅自增加重型运输并拓宽使用范围？",
        options: [
          {
            id: "a",
            text: "能，地役权一设立，需役方就可按任何新业务任意扩用",
            explanation: "第376条要求依约定目的方法利用，不允许单方无限扩张。",
          },
          {
            id: "b",
            text: "能，只要曾经支付费用，就自动取得整块供役地所有权",
            explanation: "付费设立地役权不转移供役地所有权。",
          },
          {
            id: "c",
            text: "不能，所以所有地役权一律只允许步行，任何车辆都违法",
            explanation:
              "本题合同可以约定车辆通行，错误在超出具体轻型和路线约定。",
          },
          {
            id: "d",
            text: "不能，应停止超约重型运输与拓宽，按约并尽量减少限制",
            explanation: "符合第376条，且本案已经出现额外占压与路面破损。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-usufruct-easement-dominant-excess-use",
        relatedTopicIds: ["civil-easement-use-limits"],
        facts:
          "本案为原创教学虚构，争议发生于2026年9月。萧野与许棠就各自依法使用的地块，于2026年6月订立有效书面地役权合同并登记，期限两年，不超过剩余使用权期限。合同只允许萧野的小型送货车沿许棠地块边缘既有路线通行，费用已付。9月，萧野为另一项目施工，改派重型工程车经过，还未经同意把路线向院内拓宽、占压花坛，造成原路面破损。他说既然已有地役权，就能按自己业务需要调整车辆和路线。",
        hint: "直接说明结论和案情理由。",
        reference:
          "不能。地役权应按合同约定的目的和方法行使。这里只约定轻型送货和既有边缘路线，重车施工运输、向院内拓宽都超出范围，还加重对许棠的限制，应停止这些超约使用。",
        sources: ["civil-usufruct-easement-use376377"],
        id: "civil-usufruct-easement-dominant-excess-use-written",
        kind: "subjective",
        title: "轻型通行变成重车工地路：写出分析",
        prompt:
          "萧野能否凭已有地役权，擅自增加重型运输并拓宽使用范围？请结合案情说明理由。",
        criteria: [
          {
            id: "civil-usufruct-ease-no-excess-use",
            label: "不得超目的方法和范围加重负担",
            meaning:
              "联系合同只准轻型送货、既有边缘路线，而重车施工运输、拓宽占花坛并损路均超约，说明不能自行扩大，应停止超约利用并减少限制。",
            acceptable:
              "说明原来只让小送货车走指定边路，不能自己改成重车路、拓到院里并损坏设施，应回到合同范围即可；接受等义表达。",
            boundary:
              "不要求设固定赔偿、推定所有车辆违法或自动宣告地役权已解除消灭；解除等其他请求不在设问内。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-construction-establishment",
    title: "建设用地登记与空间范围",
    headline:
      "出让合同有效不等于物权已设立；建设用地使用权也可按地表、地上、地下分别设立。",
    goal: "公司是否已因付款取得这项建设用地使用权？未登记是否就使出让合同无效？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "通过出让设立建设用地使用权，要订立书面合同并依法办理登记，权利自登记时设立。合同有效、出让金已经付清，也不能跳过登记；反过来，未登记不当然使有效合同变成无效。",
      "建设用地使用权可以在地表、地上或地下分别设立。要看已登记的空间边界，并保护已经设立的用益物权；取得一个空间层的权利，不等于支配无限高度和深度。",
    ],
    example: {
      title: "出让金已付，登记还没办",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。2026年9月，栖原公司依法竞得一宗国有建设用地，与有权机关签订书面出让合同。合同依法成立并已生效，约定的出让金也已付清，双方没有将合同生效另附登记条件。至10月10日，建设用地使用权尚未记载于登记簿，没有其他法定非登记取得事由。公司认为付款就已经取得物权；另一人则说，既然没登记，出让合同也应当无效。",
      analysis:
        "建设用地使用权尚未设立，不能以付清出让金代替登记。这项出让取得的权利自登记时设立；但未登记不影响本案已经生效的出让合同，不能因此把合同说成无效。",
    },
    pitfall: "把付款当成物权登记，或把地表使用权说成包揽整片地下空间。",
    recall: {
      prompt:
        "公司是否已因付款取得这项建设用地使用权？未登记是否就使出让合同无效？",
      reference:
        "出让合同有效不等于物权已设立；建设用地使用权也可按地表、地上、地下分别设立。",
    },
    sources: ["civil-usufruct-building349", "civil-usufruct-space345"],
    exercises: [
      {
        caseId: "civil-usufruct-construction-contract-not-registered",
        relatedTopicIds: ["civil-construction-establishment"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，栖原公司依法竞得一宗国有建设用地，与有权机关签订书面出让合同。合同依法成立并已生效，约定的出让金也已付清，双方没有将合同生效另附登记条件。至10月10日，建设用地使用权尚未记载于登记簿，没有其他法定非登记取得事由。公司认为付款就已经取得物权；另一人则说，既然没登记，出让合同也应当无效。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "建设用地使用权尚未设立，不能以付清出让金代替登记。这项出让取得的权利自登记时设立；但未登记不影响本案已经生效的出让合同，不能因此把合同说成无效。",
        sources: ["civil-usufruct-building349"],
        id: "civil-usufruct-construction-contract-not-registered-choice",
        kind: "objective",
        choiceMode: "single",
        title: "出让金已付，登记还没办：选择判断",
        prompt:
          "公司是否已因付款取得这项建设用地使用权？未登记是否就使出让合同无效？",
        options: [
          {
            id: "a",
            text: "物权尚未设立；应办理登记，但未登记不使本案有效合同变无效",
            explanation: "区分第349条的物权登记设立与第215条的合同效力。",
          },
          {
            id: "b",
            text: "付款就已设立物权；登记只在所有合同无效后才需要",
            explanation: "把付款与物权登记混同。",
          },
          {
            id: "c",
            text: "物权和合同均无效，所有不动产合同都必须登记才生效",
            explanation: "本案合同已生效，未登记不当然否定合同效力。",
          },
          {
            id: "d",
            text: "物权已经设立，但原有效合同因付款而自动无效",
            explanation: "付款既不代替登记，也不使合同变成无效。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-usufruct-construction-contract-not-registered",
        relatedTopicIds: ["civil-construction-establishment"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，栖原公司依法竞得一宗国有建设用地，与有权机关签订书面出让合同。合同依法成立并已生效，约定的出让金也已付清，双方没有将合同生效另附登记条件。至10月10日，建设用地使用权尚未记载于登记簿，没有其他法定非登记取得事由。公司认为付款就已经取得物权；另一人则说，既然没登记，出让合同也应当无效。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "建设用地使用权尚未设立，不能以付清出让金代替登记。这项出让取得的权利自登记时设立；但未登记不影响本案已经生效的出让合同，不能因此把合同说成无效。",
        sources: ["civil-usufruct-building349"],
        id: "civil-usufruct-construction-contract-not-registered-written",
        kind: "subjective",
        title: "出让金已付，登记还没办：写出分析",
        prompt:
          "公司是否已因付款取得这项建设用地使用权？未登记是否就使出让合同无效？请结合案情说明理由。",
        criteria: [
          {
            id: "construction-establish-registration",
            label: "本项物权需登记才设立",
            meaning:
              "联系出让方式、未记载登记簿且无法定非登记取得事由，说明付款不能替代登记，物权尚未设立。",
            acceptable:
              "说钱虽付清，建设用地使用权还是要登记才成立，现在还没取得这项物权即可。",
            boundary:
              "不讨论继承、形成判决等其他取得方式，不把出让方式的登记要求扩到全部用益物权。",
          },
          {
            id: "construction-contract-remains-effective",
            label: "未登记不否定本案合同效力",
            meaning:
              "说明出让合同已经依法生效，未登记不因此使合同无效，应与物权设立分开。",
            acceptable:
              "说没登记只是这项物权还没设立，不能把已经有效的出让合同也说成无效即可。",
            boundary:
              "不要求判断未登记原因、违约赔偿数额或一方不存在的解除理由。",
          },
        ],
      },
      {
        caseId: "civil-usufruct-construction-separate-underground-layer",
        relatedTopicIds: ["civil-construction-establishment"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，栖原公司已登记取得某宗国有土地的地表层建设用地使用权，合同与登记附图明确了空间范围，不包括拟设的地下储能层。主管机关拟依法为另一单位另设该地下层的建设用地使用权。空间测绘确认两层不重叠，技术审查确认地下工程不损害栖原已有设施、安全和使用收益；其他规划、用途与办理条件无争议。栖原只因自己先取得地表层，主张整片地下无论深浅都不得另设权利。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能一概排除。建设用地使用权可以按不同空间层分别设立。栖原的登记范围不含拟设地下层，两层不重叠，地下工程又不损害既有权利，不能仅凭先取得地表层就独占全部地下空间。另设地下层仍须依法办理相应手续。",
        sources: ["civil-usufruct-space345"],
        id: "civil-usufruct-construction-separate-underground-layer-choice",
        kind: "objective",
        choiceMode: "single",
        title: "地表层之外的地下空间：选择判断",
        prompt:
          "栖原能否只凭已取得地表层权利，一概排除本案另设地下层建设用地使用权？",
        options: [
          {
            id: "a",
            text: "能，任何地表权利都自动延伸到无限深度",
            explanation: "法律允许不同空间层分别设立。",
          },
          {
            id: "b",
            text: "不能，所以地下工程无论是否危及地表设施都可任意施工",
            explanation: "分层设立仍不得损害既有用益物权。",
          },
          {
            id: "c",
            text: "不能仅凭地表层排除；本案不重叠且不损害既有权利，可依法分层设立",
            explanation: "符合第345—346条的空间分层及保护边界。",
          },
          {
            id: "d",
            text: "能，因为只有地下层先设立时才允许空间分层",
            explanation: "法律没有设定所称先后顺序限制。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-usufruct-construction-separate-underground-layer",
        relatedTopicIds: ["civil-construction-establishment"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，栖原公司已登记取得某宗国有土地的地表层建设用地使用权，合同与登记附图明确了空间范围，不包括拟设的地下储能层。主管机关拟依法为另一单位另设该地下层的建设用地使用权。空间测绘确认两层不重叠，技术审查确认地下工程不损害栖原已有设施、安全和使用收益；其他规划、用途与办理条件无争议。栖原只因自己先取得地表层，主张整片地下无论深浅都不得另设权利。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能一概排除。建设用地使用权可以按不同空间层分别设立。栖原的登记范围不含拟设地下层，两层不重叠，地下工程又不损害既有权利，不能仅凭先取得地表层就独占全部地下空间。另设地下层仍须依法办理相应手续。",
        sources: ["civil-usufruct-space345"],
        id: "civil-usufruct-construction-separate-underground-layer-written",
        kind: "subjective",
        title: "地表层之外的地下空间：写出分析",
        prompt:
          "栖原能否只凭已取得地表层权利，一概排除本案另设地下层建设用地使用权？请结合案情说明理由。",
        criteria: [
          {
            id: "construction-space-separate",
            label: "可分层设立并保护既有权利",
            meaning:
              "联系登记范围不含地下层、两层不重叠且不损害既有权利，说明不能仅凭地表权一概排除，可依法另设。",
            acceptable:
              "说登记只有地表这一层，地下另层又不冲突不损害，就不能说所有地下都被自己包下了即可。",
            boundary:
              "不要求推算工程深度，不把分层设立扩成免规划、免登记或可任意损害既有设施。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-construction-transfer-term",
    title: "房地一体与住宅用地续期",
    headline:
      "转让建筑物应一并处分其占用范围内的建设用地使用权；住宅建设用地期满自动续期。",
    goal: "能否按栖原提出的方式，将仓库与其占用范围内的建设用地使用权分开处分？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "建筑物转让、互换、出资或赠与，其占用范围内的建设用地使用权应一并处分。土地使用权转让时，其上附着的建筑物等也应一并处分；涉及物权变动仍须办理相应登记。",
      "住宅建设用地使用权期限届满，依法自动续期。续期费用按法律、行政法规办理，不能自行编成永远免费；非住宅建设用地不能直接套用住宅自动续期规则。",
    ],
    example: {
      title: "只转仓库，想把占用土地单独留下",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。2026年9月，栖原公司拟将一栋合法仓库转让给行舟公司。仓库所有权及其占用范围内的国有建设用地使用权都登记在栖原名下，符合转让条件，没有抵押、查封、区分所有或其他权利人的争议。栖原却提出，仓库转给行舟，仓库占用范围内的建设用地使用权仍永久单独留在自己名下。双方尚在拟定处分方案，本题不问未办理变更登记时买方是否已取得物权。",
      analysis:
        "不能这样分开。转让这栋仓库时，应把其占用范围内的建设用地使用权一并处分，不能把房屋转给买方，却把它所占土地的使用权永久单独留下。之后仍应依法办理相应的变更登记。",
    },
    pitfall:
      "试图把仓库和其占用土地使用权永久拆开处分，或把住宅用地期满说成房屋立即归零。",
    recall: {
      prompt:
        "能否按栖原提出的方式，将仓库与其占用范围内的建设用地使用权分开处分？",
      reference:
        "转让建筑物应一并处分其占用范围内的建设用地使用权；住宅建设用地期满自动续期。",
    },
    sources: ["civil-usufruct-building357", "civil-usufruct-residential359"],
    exercises: [
      {
        caseId: "civil-usufruct-construction-warehouse-land-together",
        relatedTopicIds: ["civil-construction-transfer-term"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，栖原公司拟将一栋合法仓库转让给行舟公司。仓库所有权及其占用范围内的国有建设用地使用权都登记在栖原名下，符合转让条件，没有抵押、查封、区分所有或其他权利人的争议。栖原却提出，仓库转给行舟，仓库占用范围内的建设用地使用权仍永久单独留在自己名下。双方尚在拟定处分方案，本题不问未办理变更登记时买方是否已取得物权。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能这样分开。转让这栋仓库时，应把其占用范围内的建设用地使用权一并处分，不能把房屋转给买方，却把它所占土地的使用权永久单独留下。之后仍应依法办理相应的变更登记。",
        sources: ["civil-usufruct-building357"],
        id: "civil-usufruct-construction-warehouse-land-together-choice",
        kind: "objective",
        choiceMode: "single",
        title: "只转仓库，想把占用土地单独留下：选择判断",
        prompt:
          "能否按栖原提出的方式，将仓库与其占用范围内的建设用地使用权分开处分？",
        options: [
          {
            id: "a",
            text: "可以，房屋与占用土地使用权依法必须分属不同人",
            explanation: "与第357条的一并处分规则相反。",
          },
          {
            id: "b",
            text: "不能；仓库转让时，其占用范围内建设用地使用权应一并处分",
            explanation: "适用房地一体处分，不扩大至无关地块。",
          },
          {
            id: "c",
            text: "可以，因为只有住宅才实行房地一体，合法仓库绝不适用",
            explanation: "第357条并未将建筑物限定为住宅。",
          },
          {
            id: "d",
            text: "不能，所以合同一签，即使没有登记买方也已经取得全部物权",
            explanation: "一并处分要求不代替不动产物权变更登记。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-usufruct-construction-warehouse-land-together",
        relatedTopicIds: ["civil-construction-transfer-term"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，栖原公司拟将一栋合法仓库转让给行舟公司。仓库所有权及其占用范围内的国有建设用地使用权都登记在栖原名下，符合转让条件，没有抵押、查封、区分所有或其他权利人的争议。栖原却提出，仓库转给行舟，仓库占用范围内的建设用地使用权仍永久单独留在自己名下。双方尚在拟定处分方案，本题不问未办理变更登记时买方是否已取得物权。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能这样分开。转让这栋仓库时，应把其占用范围内的建设用地使用权一并处分，不能把房屋转给买方，却把它所占土地的使用权永久单独留下。之后仍应依法办理相应的变更登记。",
        sources: ["civil-usufruct-building357"],
        id: "civil-usufruct-construction-warehouse-land-together-written",
        kind: "subjective",
        title: "只转仓库，想把占用土地单独留下：写出分析",
        prompt:
          "能否按栖原提出的方式，将仓库与其占用范围内的建设用地使用权分开处分？请结合案情说明理由。",
        criteria: [
          {
            id: "construction-warehouse-integrated-transfer",
            label: "仓库占用范围内房地一并处分",
            meaning:
              "说明转让仓库应把其占用范围内建设用地使用权一并处分，不能永久单留给卖方。",
            acceptable:
              "说仓库和它占的那块地的使用权要一起转，不能把仓库给人、脚下的使用权仍单独扣着即可。",
            boundary:
              "不要求处分整宗其他无关土地，也不以签合同代替物权变更登记。",
          },
        ],
      },
      {
        caseId: "civil-usufruct-construction-residential-auto-renewal",
        relatedTopicIds: ["civil-construction-transfer-term"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，秦澄名下一套合法住宅所对应的住宅建设用地使用权登记期限届满。住宅及用地权属没有争议，也无公共利益提前收回情形。邻居看到旧证上的截止日，就说“到期又没先取得新的续期审批，住宅用地权已经自动消失，住宅也不能再住”。本题只判断住宅用地是否因这个到期日而失去续期，不计算任何费用。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不会因此当然消失。住宅建设用地使用权期限届满，依法自动续期，不能只看旧证截止日就说住宅用地权没了。续期费用的缴纳或减免另按法律、行政法规办理，本题不能据此推定一律免费。",
        sources: ["civil-usufruct-residential359"],
        id: "civil-usufruct-construction-residential-auto-renewal-choice",
        kind: "objective",
        choiceMode: "single",
        title: "住宅用地的登记期限届满：选择判断",
        prompt:
          "这项住宅建设用地使用权是否因未先取得新续期审批而当然消失？续期应如何处理？",
        options: [
          {
            id: "a",
            text: "会，所有住宅用地一到期都无条件收回，房屋必须立刻腾空",
            explanation: "忽略第359条住宅用地自动续期。",
          },
          {
            id: "b",
            text: "不会，因为所有非住宅和住宅用地都一律永久免费续期",
            explanation: "将住宅规则扩大到非住宅，并编造统一免费。",
          },
          {
            id: "c",
            text: "会，因为只要证书日期已过，法律规定的自动续期就没有作用",
            explanation: "证书原截止日不排除法定续期。",
          },
          {
            id: "d",
            text: "不会；住宅建设用地期满依法自动续期，费用另按法律行政法规办理",
            explanation: "区分自动续期与费用规则。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-usufruct-construction-residential-auto-renewal",
        relatedTopicIds: ["civil-construction-transfer-term"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，秦澄名下一套合法住宅所对应的住宅建设用地使用权登记期限届满。住宅及用地权属没有争议，也无公共利益提前收回情形。邻居看到旧证上的截止日，就说“到期又没先取得新的续期审批，住宅用地权已经自动消失，住宅也不能再住”。本题只判断住宅用地是否因这个到期日而失去续期，不计算任何费用。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不会因此当然消失。住宅建设用地使用权期限届满，依法自动续期，不能只看旧证截止日就说住宅用地权没了。续期费用的缴纳或减免另按法律、行政法规办理，本题不能据此推定一律免费。",
        sources: ["civil-usufruct-residential359"],
        id: "civil-usufruct-construction-residential-auto-renewal-written",
        kind: "subjective",
        title: "住宅用地的登记期限届满：写出分析",
        prompt:
          "这项住宅建设用地使用权是否因未先取得新续期审批而当然消失？续期应如何处理？请结合案情说明理由。",
        criteria: [
          {
            id: "construction-residential-renewal",
            label: "住宅建设用地期满自动续期",
            meaning:
              "联系本案明确为住宅建设用地，说明期满依法自动续期，不能因原截止日或未先获新审批就说该权利消失。",
            acceptable:
              "说这是住宅用地，期满自动续，不是看证上日期到了就没有权利了即可。",
            boundary:
              "不要求计算费用、背审批流程，也不把自动续期扩到非住宅或一概承诺免费。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-land-contract-establishment",
    title: "承包权的设立与期内保护",
    headline:
      "家庭承包的权利从有效承包合同设立，不能只因证书未办好或有人愿多付钱就收回。",
    goal: "本案土地承包经营权是否一定要等证书发下才设立？现在是否已经设立？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "家庭承包中，土地承包经营权自土地承包经营权合同生效时设立。登记发证确认这项权利，不能仅因证书尚在办理就否定已经生效的合法承包。",
      "承包期内，发包方不得任意调整、收回承包地。法律规定的例外要依法办理；别人愿意出更高价，不是把正常耕种农户的地收回重包的理由。",
    ],
    example: {
      title: "合同生效，证书还在办理",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。2026年9月，青禾村集体按法定程序，与具备资格的本集体周宁农户签订书面家庭承包合同，将集体耕地交其种植。该合同已经依法生效，承包期内农户正常耕种，权属和程序均无争议。登记机构的证书尚在办理，没有其他取得或终止事由。有人认为，只要证书还没发下来，周宁农户就完全没有土地承包经营权。",
      analysis:
        "已经设立，不必等证书发下才开始有这项权利。家庭承包的土地承包经营权自承包合同生效时设立，本案合同已依法生效；登记发证是确认权利，不能仅因手续尚在办理就说权利不存在。",
    },
    pitfall:
      "把证书尚未办妥当成承包权从未设立，或把集体经济收益更高当作任意收地的依据。",
    recall: {
      prompt:
        "本案土地承包经营权是否一定要等证书发下才设立？现在是否已经设立？",
      reference:
        "家庭承包的权利从有效承包合同设立，不能只因证书未办好或有人愿多付钱就收回。",
    },
    sources: ["civil-usufruct-contract333", "civil-usufruct-contract337"],
    exercises: [
      {
        caseId: "civil-usufruct-land-contract-effective-before-certificate",
        relatedTopicIds: ["civil-land-contract-establishment"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，青禾村集体按法定程序，与具备资格的本集体周宁农户签订书面家庭承包合同，将集体耕地交其种植。该合同已经依法生效，承包期内农户正常耕种，权属和程序均无争议。登记机构的证书尚在办理，没有其他取得或终止事由。有人认为，只要证书还没发下来，周宁农户就完全没有土地承包经营权。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "已经设立，不必等证书发下才开始有这项权利。家庭承包的土地承包经营权自承包合同生效时设立，本案合同已依法生效；登记发证是确认权利，不能仅因手续尚在办理就说权利不存在。",
        sources: ["civil-usufruct-contract333"],
        id: "civil-usufruct-land-contract-effective-before-certificate-choice",
        kind: "objective",
        choiceMode: "single",
        title: "合同生效，证书还在办理：选择判断",
        prompt:
          "本案土地承包经营权是否一定要等证书发下才设立？现在是否已经设立？",
        options: [
          {
            id: "a",
            text: "已经设立；本案家庭承包合同生效即设立，不以证书发下为起点",
            explanation: "适用第333条，登记确认不能混成登记创设。",
          },
          {
            id: "b",
            text: "尚未设立，因为所有用益物权一律只能从发证时产生",
            explanation: "不同用益物权的设立规则并不相同。",
          },
          {
            id: "c",
            text: "没有设立，所以已经依法生效的承包合同也必然无效",
            explanation: "将登记情况与合同效力混同。",
          },
          {
            id: "d",
            text: "已经设立，所以农户也取得耕地所有权，可以随意改建工厂",
            explanation: "承包经营权不改变集体所有权和农业用途限制。",
          },
        ],
        answer: "a",
      },
      {
        caseId: "civil-usufruct-land-contract-effective-before-certificate",
        relatedTopicIds: ["civil-land-contract-establishment"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，青禾村集体按法定程序，与具备资格的本集体周宁农户签订书面家庭承包合同，将集体耕地交其种植。该合同已经依法生效，承包期内农户正常耕种，权属和程序均无争议。登记机构的证书尚在办理，没有其他取得或终止事由。有人认为，只要证书还没发下来，周宁农户就完全没有土地承包经营权。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "已经设立，不必等证书发下才开始有这项权利。家庭承包的土地承包经营权自承包合同生效时设立，本案合同已依法生效；登记发证是确认权利，不能仅因手续尚在办理就说权利不存在。",
        sources: ["civil-usufruct-contract333"],
        id: "civil-usufruct-land-contract-effective-before-certificate-written",
        kind: "subjective",
        title: "合同生效，证书还在办理：写出分析",
        prompt:
          "本案土地承包经营权是否一定要等证书发下才设立？现在是否已经设立？请结合案情说明理由。",
        criteria: [
          {
            id: "land-contract-created-on-effect",
            label: "有效家庭承包合同即设立权利",
            meaning:
              "联系本案合法家庭承包合同已生效，说明土地承包经营权已设立，证书尚在办理不否定它。",
            acceptable:
              "说承包合同已生效，这户就已有承包经营权，不能等证书没到手就说什么权利都没有即可。",
            boundary:
              "不要求讨论其他方式承包、成员身份争议或未给出的合同无效事由，不把承包权说成土地所有权。",
          },
        ],
      },
      {
        caseId: "civil-usufruct-land-contract-no-recovery-for-higher-bid",
        relatedTopicIds: ["civil-land-contract-establishment"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，周宁农户依合法家庭承包合同耕种村集体土地，承包期尚未届满，一直正常种粮，也没有自愿交回或其他法定收回、调整事由。另一经营者愿付更高费用。村集体仅以“换人承包能多收入”为由，通知农户立即交地，并准备将原地重新发包；周宁农户明确不同意。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。周宁农户的承包期还没结束，又没有法定收回事由或自愿交回。仅为收更高费用而换人承包，侵害其承包期内的权利，不能这样收回重包。",
        sources: ["civil-usufruct-contract337"],
        id: "civil-usufruct-land-contract-no-recovery-for-higher-bid-choice",
        kind: "objective",
        choiceMode: "single",
        title: "别人愿出高价就收回重包：选择判断",
        prompt:
          "村集体能否仅因另一经营者愿出更高费用，在承包期内收回这块地重包？",
        options: [
          {
            id: "a",
            text: "能，集体所有意味着随时都能不问承包期收地",
            explanation: "集体所有权并不消除承包期内的法定保护。",
          },
          {
            id: "b",
            text: "能，只要另一个人报价高，原合同当日自动终止",
            explanation: "更高报价不是本案法定收回事由。",
          },
          {
            id: "c",
            text: "不能；承包期未满且无合法收回事由，不能仅为更高收益收回重包",
            explanation: "第336—337条约束任意调整和收回。",
          },
          {
            id: "d",
            text: "不能，因为法律规定所有农村土地从来不可能因任何事由收回",
            explanation: "本案不能收回不等于法律没有例外。",
          },
        ],
        answer: "c",
      },
      {
        caseId: "civil-usufruct-land-contract-no-recovery-for-higher-bid",
        relatedTopicIds: ["civil-land-contract-establishment"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，周宁农户依合法家庭承包合同耕种村集体土地，承包期尚未届满，一直正常种粮，也没有自愿交回或其他法定收回、调整事由。另一经营者愿付更高费用。村集体仅以“换人承包能多收入”为由，通知农户立即交地，并准备将原地重新发包；周宁农户明确不同意。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。周宁农户的承包期还没结束，又没有法定收回事由或自愿交回。仅为收更高费用而换人承包，侵害其承包期内的权利，不能这样收回重包。",
        sources: ["civil-usufruct-contract337"],
        id: "civil-usufruct-land-contract-no-recovery-for-higher-bid-written",
        kind: "subjective",
        title: "别人愿出高价就收回重包：写出分析",
        prompt:
          "村集体能否仅因另一经营者愿出更高费用，在承包期内收回这块地重包？请结合案情说明理由。",
        criteria: [
          {
            id: "land-contract-no-price-recovery",
            label: "更高报价不能代替合法收回事由",
            meaning:
              "联系期限未满、正常种植、未自愿交回且无法定收回事由，说明仅为更高收入不能收回重包。",
            acceptable:
              "说这户还在合法承包期内，也没有该收回的情况，不能因为别人愿多付钱就把地拿走即可。",
            boundary:
              "不要求否定征收或法律另有规定的收回情形，也不推算未发生的损失和补偿额。",
          },
        ],
      },
    ],
  },
  {
    id: "civil-land-management-circulation",
    title: "土地经营权的流转与期限",
    headline:
      "依法出租经营权不等于转走全部承包关系；五年以上合同生效即设立，期限不得超过承包剩余期。",
    goal: "仅因尚未登记，能否说陈禾的这项七年土地经营权尚未设立？他是否可依约经营？",
    prerequisite: "能分清本题事实、责任主体与所问的法律条件。",
    minutes: "6–10",
    paragraphs: [
      "承包方可依法出租、入股等流转土地经营权，原承包关系不因经营权出租就当然终止。流转期限五年以上的土地经营权，自流转合同生效时设立；未经登记，不能对抗善意第三人，但不能据此说双方间合同和权利都没有。",
      "流转要保持土地农业用途、遵守法定条件，期限不得超过承包期剩余期限。承包方还剩三年，就不能只凭目前的承包权，保证别人再占用八年；后续依法继续承包的安排另行处理。",
    ],
    example: {
      title: "七年经营合同，尚未登记",
      facts:
        "本案为原创教学虚构，判断时间为2026年10月。2026年9月，周宁农户的合法家庭承包期还剩15年，自愿把其中一块地的经营权出租给具备农业经营能力的陈禾七年，用于继续种粮。双方书面合同已依法生效，所需备案已完成，土地及期限等条件均合法，尚未办理经营权登记，也没有第三人争议。周宁农户称“没登记就什么权利也没设立”，要求否认陈禾依该合同占有、经营、取得农业收益的依据。",
      analysis:
        "不能这样否定。七年超过五年，土地经营权自这份合法流转合同生效时就已设立，陈禾可以按约种植并取得农业收益。未登记影响对抗善意第三人，不是说合同双方之间没有经营权；本案也不涉及第三人。",
    },
    pitfall:
      "把经营权出租说成集体土地所有权转让，或把登记对抗误说成未登记就完全没权利。",
    recall: {
      prompt:
        "仅因尚未登记，能否说陈禾的这项七年土地经营权尚未设立？他是否可依约经营？",
      reference:
        "依法出租经营权不等于转走全部承包关系；五年以上合同生效即设立，期限不得超过承包剩余期。",
    },
    sources: ["civil-usufruct-management341", "civil-usufruct-rural38"],
    exercises: [
      {
        caseId: "civil-usufruct-land-management-seven-year-unregistered",
        relatedTopicIds: ["civil-land-management-circulation"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，周宁农户的合法家庭承包期还剩15年，自愿把其中一块地的经营权出租给具备农业经营能力的陈禾七年，用于继续种粮。双方书面合同已依法生效，所需备案已完成，土地及期限等条件均合法，尚未办理经营权登记，也没有第三人争议。周宁农户称“没登记就什么权利也没设立”，要求否认陈禾依该合同占有、经营、取得农业收益的依据。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能这样否定。七年超过五年，土地经营权自这份合法流转合同生效时就已设立，陈禾可以按约种植并取得农业收益。未登记影响对抗善意第三人，不是说合同双方之间没有经营权；本案也不涉及第三人。",
        sources: ["civil-usufruct-management341", "civil-usufruct-rural38"],
        id: "civil-usufruct-land-management-seven-year-unregistered-choice",
        kind: "objective",
        choiceMode: "single",
        title: "七年经营合同，尚未登记：选择判断",
        prompt:
          "仅因尚未登记，能否说陈禾的这项七年土地经营权尚未设立？他是否可依约经营？",
        options: [
          {
            id: "a",
            text: "能，五年以上经营权必须先取得土地所有权才可设立",
            explanation: "经营权不要求取得土地所有权。",
          },
          {
            id: "b",
            text: "不能；七年经营权自有效合同生效时设立，未登记不否定双方间依约经营",
            explanation: "第341条把设立与登记对抗区分开。",
          },
          {
            id: "c",
            text: "能，未登记不仅使经营权不存在，还使所有备案自动无效",
            explanation: "未登记没有本题所称的后果。",
          },
          {
            id: "d",
            text: "不能，所以无论是否登记，都可以对抗任何善意第三人",
            explanation: "未登记仍有不得对抗善意第三人的边界。",
          },
        ],
        answer: "b",
      },
      {
        caseId: "civil-usufruct-land-management-seven-year-unregistered",
        relatedTopicIds: ["civil-land-management-circulation"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，周宁农户的合法家庭承包期还剩15年，自愿把其中一块地的经营权出租给具备农业经营能力的陈禾七年，用于继续种粮。双方书面合同已依法生效，所需备案已完成，土地及期限等条件均合法，尚未办理经营权登记，也没有第三人争议。周宁农户称“没登记就什么权利也没设立”，要求否认陈禾依该合同占有、经营、取得农业收益的依据。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能这样否定。七年超过五年，土地经营权自这份合法流转合同生效时就已设立，陈禾可以按约种植并取得农业收益。未登记影响对抗善意第三人，不是说合同双方之间没有经营权；本案也不涉及第三人。",
        sources: ["civil-usufruct-management341", "civil-usufruct-rural38"],
        id: "civil-usufruct-land-management-seven-year-unregistered-written",
        kind: "subjective",
        title: "七年经营合同，尚未登记：写出分析",
        prompt:
          "仅因尚未登记，能否说陈禾的这项七年土地经营权尚未设立？他是否可依约经营？请结合案情说明理由。",
        criteria: [
          {
            id: "land-management-created-on-effect",
            label: "七年经营权合同生效设立",
            meaning:
              "联系流转为七年、书面合同合法生效，说明经营权已设立，可按约从事农业经营；未登记不否定双方间的权利。",
            acceptable:
              "说七年已超过五年，合同生效就有这项经营权，登记没办不等于承包方能否认他种地和收益的依据即可。",
            boundary:
              "不要求处理未给定第三人的优先关系，不能把未登记说成仍可对抗所有第三人。",
          },
        ],
      },
      {
        caseId: "civil-usufruct-land-management-beyond-remaining-term",
        relatedTopicIds: ["civil-land-management-circulation"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，周宁农户的现行耕地承包期只剩三年，尚无已依法取得的延长期限或其他新的用地依据。他拟将目前这项承包项下的土地经营权出租给陈禾八年，称只要两人愿意签字，陈禾就能凭目前这份权利要求持续占地到第八年。双方没有另行约定届满后依法继续承包再作安排，本题不判断超期条款之外部分的效力、返还或赔偿。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。土地经营权流转期限不得超过承包期剩余期限。周宁目前只剩三年，没有新的期限依据，不能仅凭双方签字就保证陈禾继续用到第八年；将来依法继续承包后的安排，应在有相应依据后另行处理。",
        sources: ["civil-usufruct-rural38", "civil-usufruct-management341"],
        id: "civil-usufruct-land-management-beyond-remaining-term-choice",
        kind: "objective",
        choiceMode: "single",
        title: "只剩三年，却保证流转八年：选择判断",
        prompt:
          "周宁能否仅凭目前还剩三年的承包权，约定并保证这次经营权流转持续八年？",
        options: [
          {
            id: "a",
            text: "能，流转合同只要双方同意，就可不受原承包期限限制",
            explanation: "当事人同意不能突破法定剩余期限限制。",
          },
          {
            id: "b",
            text: "能，因为八年合同会自动把原承包期延长五年",
            explanation: "流转合同不能自行延长原承包期限。",
          },
          {
            id: "c",
            text: "不能，所以所有正常期限内的经营权出租也一律禁止",
            explanation: "限制超期不等于禁止合法流转。",
          },
          {
            id: "d",
            text: "不能；目前流转期限不得超过剩余三年，不能凭签字保证八年",
            explanation: "符合农村土地承包法第38条第三项。",
          },
        ],
        answer: "d",
      },
      {
        caseId: "civil-usufruct-land-management-beyond-remaining-term",
        relatedTopicIds: ["civil-land-management-circulation"],
        facts:
          "本案为原创教学虚构，判断时间为2026年10月。2026年9月，周宁农户的现行耕地承包期只剩三年，尚无已依法取得的延长期限或其他新的用地依据。他拟将目前这项承包项下的土地经营权出租给陈禾八年，称只要两人愿意签字，陈禾就能凭目前这份权利要求持续占地到第八年。双方没有另行约定届满后依法继续承包再作安排，本题不判断超期条款之外部分的效力、返还或赔偿。",
        hint: "结合案情，直接说明结论和关键理由。",
        reference:
          "不能。土地经营权流转期限不得超过承包期剩余期限。周宁目前只剩三年，没有新的期限依据，不能仅凭双方签字就保证陈禾继续用到第八年；将来依法继续承包后的安排，应在有相应依据后另行处理。",
        sources: ["civil-usufruct-rural38", "civil-usufruct-management341"],
        id: "civil-usufruct-land-management-beyond-remaining-term-written",
        kind: "subjective",
        title: "只剩三年，却保证流转八年：写出分析",
        prompt:
          "周宁能否仅凭目前还剩三年的承包权，约定并保证这次经营权流转持续八年？请结合案情说明理由。",
        criteria: [
          {
            id: "land-management-remaining-limit",
            label: "流转不得超过现承包剩余期限",
            meaning:
              "联系当前承包剩余三年、没有延长或新依据，说明不能凭双方签字保证八年经营期限，受剩余期限约束。",
            acceptable:
              "说他自己目前只有三年，不能光签个八年合同就保证对方再占八年，流转不能超过现剩余期即可。",
            boundary:
              "只问超期流转限制，不要求认定合同全部无效、不否定依法继续承包，也不要求计算违约赔偿。",
          },
        ],
      },
    ],
  },
];

export const civilUsufructChapters = [
  {
    id: "CIV-HABITATION",
    title: "居住权",
    section: "民法",
    topicIds: ["civil-habitation-establishment", "civil-habitation-limits"],
  },
  {
    id: "CIV-EASEMENT",
    title: "地役权",
    section: "民法",
    topicIds: ["civil-easement-establishment", "civil-easement-use-limits"],
  },
  {
    id: "CIV-CONSTRUCTION-LAND",
    title: "建设用地使用权",
    section: "民法",
    topicIds: [
      "civil-construction-establishment",
      "civil-construction-transfer-term",
    ],
  },
  {
    id: "CIV-LAND-CONTRACT",
    title: "土地承包经营权",
    section: "民法",
    topicIds: [
      "civil-land-contract-establishment",
      "civil-land-management-circulation",
    ],
  },
];

export const civilUsufructExercises = civilUsufructTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilUsufructContentPack = {
  revision: civilUsufructRevision,
  snapshot: {
    topics: civilUsufructTopics,
    sources: civilUsufructSources,
  },
};
export const civilUsufructDefaultQueues = {
  objective: civilUsufructExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilUsufructExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilUsufructQuestion(id: string) {
  const question = civilUsufructExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilUsufructTopicForQuestion(id: string) {
  return civilUsufructTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilUsufructSameCaseQuestions(id: string) {
  const question = civilUsufructQuestion(id);
  return question
    ? structuredClone(
        civilUsufructExercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function civilUsufructChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilUsufructChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilUsufructTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
