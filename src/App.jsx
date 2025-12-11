import React, { useState, useMemo } from 'react';
import { Eye, EyeOff, CheckCircle, XCircle, RefreshCw, BookOpen, AlertCircle } from 'lucide-react';

const QUIZ_DATA = [
  {
    section: "一、問答題",
    questions: [
      {
        id: "p1-1",
        q: "太陽系九個行星中，哪一顆行星的表面溫度最高？是什麼原因？",
        a: "1. 金星\n2. 溫室效應"
      },
      {
        id: "p1-2",
        q: "寫出至少三種可以長時間連續觀測太陽的方法。",
        a: "1. 衛星\n2. 設立全球觀測網\n3. 在高緯度地區觀測"
      },
      {
        id: "p1-3",
        q: "「果報女神」(Nemesis) 理論試圖解釋的是什麼現象？",
        a: "地球上大規模物種滅絕的原因─可能是太陽的「伴星」擾動彗星雲，造成彗星撞擊。"
      },
      {
        id: "p1-4",
        q: "「地－月」系統的演化中，因為彼此之間潮汐力的互相作用，在地月各自的運動上，產生何種結果？",
        a: "地球愈轉愈慢，月球愈離愈遠。"
      },
      {
        id: "p1-5",
        q: "如果今晚月亮和天狼星同時於九時於東方地平出現，那明晚這兩個天體將於何時東昇？",
        a: "1. 月亮：9時50分\n2. 天狼星：8時56分"
      },
      {
        id: "p1-6",
        q: "像太陽一樣質量較小的恆星，最終其核心和外層大氣各自會成為何種天體？",
        a: "1. 核心：白矮星\n2. 外層大氣：行星狀星雲"
      },
      {
        id: "p1-7",
        q: "預計在去（2003）年耶誕節放出登陸艇，降落在火星表面的歐洲太空船「火星特快車」號，它的登陸艇叫什麼名字？登陸結果是成功還是失敗？",
        a: "1. 小獵犬二號\n2. 失敗。"
      },
      {
        id: "p1-8",
        q: "地球表面所發現的隕石分哪三種？其中哪一種有著規律的花紋，是地球的自然環境中無法模擬的？",
        a: "1. 石隕石，鐵隕石，石質隕鐵\n2. 鐵隕石"
      },
      {
        id: "p1-9",
        q: "在電磁輻射六大譜區中，和外星高智生物互通訊息的最佳波段為何？被地球大氣吸收得最厲害的是哪兩個波段？",
        a: "1. 無線電波\n2. 紫外線；X-射線"
      },
      {
        id: "p1-10",
        q: "水星近日點的漂移現象由哪一位科學家，使用了何種理論做出圓滿的解釋？",
        a: "1. 愛因斯坦\n2. 廣義相對論"
      },
      {
        id: "p1-11",
        q: "在研究宇宙生物的領域中，德瑞克公式（Drake）的目的在作何種估計？",
        a: "估計我們銀河系中有多少高智文明。"
      },
      {
        id: "p1-12",
        q: "因為哪兩個原因，我們認為太空中的灰塵和碎片接近「地－月」系統時，較會選擇地球而非月球？",
        a: "1. 地球截面積大\n2. 地球重力場強"
      },
      {
        id: "p1-13",
        q: "1984年在南極洲發現的隕石ALH84001，含有像是原始細胞活動過的遺跡。這塊隕石據推測來自何處？有何證據？",
        a: "1. 火星\n2. 隕石中的氣泡所包含的氣體與Viking 1& 2在火星表面偵測到的大氣成分一樣。"
      },
      {
        id: "p1-14",
        q: "深入研究小行星的Near-Shoemaker任務，主要的研究對象是哪一顆小行星？在其任務接近尾聲時，又做了什麼戲劇化的結束？",
        a: "1. 433Eros(愛神小行星)\n2. 嘗試登陸，結果成功"
      },
      {
        id: "p1-15",
        q: "太陽系中的「主小行星帶」（Main Asteroid Belt）位於哪兩個行星軌道之間？「古柏帶」（Kuiper Belt）又位於哪一個行星之外？",
        a: "1. 火星與木星之間\n2. 海王星軌道之外"
      },
      {
        id: "p1-16",
        q: "中央大學、中央研究院，和美國Lawrence Livermore國家實驗室合作進行的TAOS計畫，是用什麼方法找尋何種天體？",
        a: "1. 掩星(擋光)的方法\n2. 小行星或彗核"
      },
      {
        id: "p1-17",
        q: "1986年1月28日，「挑戰者號」太空梭失事；2003年2月1日，「哥倫比亞」號太空梭失事。科學家所瞭解的這兩次失事原因各為何？",
        a: "1. 挑戰者號：一側固體燃料火箭的O型環凍裂。\n2. 哥倫比亞：主燃料箱的絕熱泡棉剝落，撞擊左側機翼造成破裂。"
      },
      {
        id: "p1-18",
        q: "為什麼天文學家相信，過去火星表面曾經有一段相當長的時間，保持溫暖而潮濕？",
        a: "觀察到表面的細小河床，這種侵蝕的痕跡需要液態水長期切割才能形成，因此火星過去應該有一段長期的溫暖而潮濕的階段。"
      },
      {
        id: "p1-19",
        q: "為何是「每兩年」才有太空船前往火星？去一趟單程大約需時多久？",
        a: "1. 因為地球和火星每兩年接近一次\n2. 6~11個月，平均8個月"
      },
      {
        id: "p1-20",
        q: "火星有幾個衛星？直徑大約多少公里（數量級估計即可）？科學家相信這些火星衛星的來源為何？",
        a: "1. 兩個\n2. 十幾二十公里\n3. 來自小行星帶逸出的小行星"
      },
      {
        id: "p1-21",
        q: "當彗星接近太陽的時候我們常說它既更容易觀測，也更不容易觀測， (i) 請問這個矛盾現象的原因為何？ (ii) 慧星中常可見到偏黃色以及偏藍色的尾巴，請問他們各自的主要組成成分為何？中國古代中彗星的「慧」的意思是什麼？ (iii) 是哪位科學家發現彗星的週期性？他又是根據何位科學家的理論發現彗星的週期性？該理論是什麼？ (iv) 長短週期彗星的劃分依據各為多少年？依據發現彗星週期性的科學家命名的彗星其週期為何？下一次觀測到此彗星的年份為？",
        a: "(i) 容易：受熱揮發產生彗尾彗髮，亮度大增。\n     不易：角距離離太陽太近，受太陽光輝掩蓋。\n(ii) 黃色：塵埃尾；藍色：離子尾。「慧」指掃帚。\n(iii) 哈雷；牛頓；萬有引力定律。\n(iv) 200年；約76年；2061年"
      }
    ]
  },
  {
    section: "二、簡答題",
    questions: [
      {
        id: "p2-1",
        q: "前天（2004年1月4日）的美國火星登陸任務，其探測車的名稱為何？是成功還是失敗？第二輛相同的探測車，其名稱為何？將在台灣時間幾月幾日登陸火星？",
        a: "1. 精神號，成功\n2. 機會號，1月25日"
      },
      {
        id: "p2-2",
        q: "最近這十幾年來，什麼方法是最有效的，可以讓天文學家在太陽系四周的恆星旁邊找尋行星？到現在為止，大約找到了多少個恆星系統可能有行星存在？",
        a: "1. 利用雙星運動的原理，由恆星的週期性擺動推估旁邊行星的大小與距離。\n2. 大約110個左右(或寫100個以上)"
      },
      {
        id: "p2-3",
        q: "1999年9月，天文學家在其中一個相信有行星的恆星系統HD209458中，幾乎直接地看到了行星的存在，他們用的是什麼方法？2001年10月，天文學家甚至在這顆恆星的行星上，觀察到大氣的存在，這又是用的什麼方法？",
        a: "1. 行星軌道剛好橫過恆星表面，造成恆星的亮度有微小變化，有如水星凌日。\n2. 在行星通過恆星前方時，哈柏望遠鏡的光譜儀觀測到新的吸收譜線，應該是來自行星的大氣吸收恆星光線所造成。"
      },
      {
        id: "p2-4",
        q: "兩千年前，托勒密（Ptolemy）是如何描述天上的日月行星和天體的運動的？",
        a: "以地球為中心，使用「均輪」和「周轉圓」來描述行星的運動，各行星有各自的周轉圓，其圓心在均輪上運動。\n日月則各有軌道，環繞地球。\n最外面的星辰居於天球上，繞地球運轉。"
      },
      {
        id: "p2-5",
        q: "月球表面坑坑窪窪，為何地球表面沒有什麼隕石撞擊的痕跡？",
        a: "因為地表有風化、水蝕、火山爆發、板塊漂移等作用，造成隕石坑的痕跡隱而不顯。"
      },
      {
        id: "p2-6",
        q: "在正常恆星（如太陽）的核心中所進行的核融合反應消耗何種元素？產生何種元素？反應過程中有多少比例的質量會完全轉為能量？",
        a: "1. 氫→氦\n2. 千分之七"
      },
      {
        id: "p2-7",
        q: "所有的恆星到了生命晚期，都會演化成為「紅巨星」，高質量恆星最終的命運有哪些可能？",
        a: "超新星爆炸─中子星+超新星遺骸\n─黑洞+超新星遺骸\n─超新星遺骸"
      },
      {
        id: "p2-8",
        q: "恆星為何是圓的？但為何又不太圓？",
        a: "1. 因為恆星往內的重力和向外的氣體和輻射壓力互相平衡於軸向的方向上，因此是圓的。\n2. 因為恆星有自轉，所以赤道直徑較寬，兩極距離較短。"
      },
      {
        id: "p2-9",
        q: "1953年生命的創始實驗是如何進行的？得到了什麼結果？",
        a: "Urry和Muller將H2、CH4(甲烷)、NH3(阿摩尼亞)、H2O的蒸氣混合，通入電火花放電，結果得到濃稠的黃色液體，其中有胺基酸。"
      },
      {
        id: "p2-10",
        q: "天文學家是如何利用無線電波的訊號，以及何種數學知識，對可能的外星高智生物居住地，傳送有意義的畫面？",
        a: "利用無線電波傳送二進位的0與1，數目的總數為兩個質數的乘積，以行及列的方式展開，可得2D的圖案。"
      },
      {
        id: "p2-11",
        q: "何謂「生態圈」？藍白色的亮星生態圈較寬，是否較易在其近旁找到高智生物？",
        a: "1. 恆星旁邊水能夠保持液態的範圍\n2. 不，因為藍白色的亮星壽命過短，沒有足夠的時間在其附近演化出高智生物。"
      },
      {
        id: "p2-12",
        q: "哈柏(Edwin Hubble)和史萊佛(Vesto Slipher)觀察到了何種現象，所以相信宇宙是起源於一次大爆炸？",
        a: "觀察到星系光譜的紅移，知道星系在離我們遠去；哈柏更觀察得出「哈柏定律」：離得愈遠，跑的愈快。"
      },
      {
        id: "p2-13",
        q: "為何地球比火星大許多，但地球表面最高的山，只有火星上最高的山的三分之一高度？",
        a: "因為地球上有板塊漂移，所以每次同一處火山噴發常無法在固定點持續累積。"
      },
      {
        id: "p2-14",
        q: "為什麼我們說在電影「世界末日」中，在鐵隕石上挖洞時，洞中卻噴出氣體，是不合理的？",
        a: "因為鐵隕石需極度緩慢的冷卻過程才會形成，大約每一萬年降低一度，在這種緩慢的過程中，氣體皆早已揮發完畢。"
      },
      {
        id: "p2-15",
        q: "「深度撞擊」（Deep Impact）彗星研究太空船，準備要用何種方法研究彗星？為什麼？「羅塞塔」（Rosetta）彗星研究太空船，本來要用何種方法研究彗星？現在為何無法進行？",
        a: "1.「深度撞擊」預計飛到一個彗星附近，拋出一個銅塊，撞擊彗星表面，以研究其表層下的地質環境。\n2. 「羅塞塔」任務原本預計要迎向一顆「彗核」，然後伴隨著它繞經太陽系內部，觀察它一路變熱，發展出彗髮和彗尾的過程，但因為亞利安五號火箭的問題，錯過了發射的窗口。"
      }
    ]
  },
  {
    section: "三、補充題",
    questions: [
      {
        id: "p3-10",
        q: "火星和地球相同和相異的地方各有那些？",
        a: "相同點：\n1. 自轉週期： 火星的一天（約 24 小時 37 分）與地球（24 小時）非常接近。\n2. 自轉軸傾角： 火星傾角約 25 度，地球約 23.5 度，因此火星也有與地球相似的春夏秋冬四季變化。\n3. 極冠： 兩極都有冰冠（火星主要為乾冰與水冰）。\n\n相異點：\n1. 大氣層： 火星大氣極稀薄（不到地球 1%），且 95% 以上是二氧化碳；地球大氣濃密，以氮氣和氧氣為主。\n2. 大小與質量： 火星直徑約為地球的一半，重力約為地球的 1/3。\n3. 磁場： 火星缺乏像地球一樣強大的全球性磁場。"
      },
      {
        id: "p3-11",
        q: "冥王星無法歸類為類地行星或是類木行星，天文學家認為冥王星最可能來自何處？",
        a: "答案： 古柏帶（Kuiper Belt）。\n\n解析： 冥王星既不是岩石構成的類地行星，也不是氣體組成的類木行星，它是一顆「冰矮星」。天文學家認為它是古柏帶中最大的天體之一（屬於海王星外天體 TNOs）。"
      },
      {
        id: "p3-12",
        q: "排放大量二氧化碳與氟氯碳化物的後果？在哪個行星觀察到？",
        a: "1. 二氧化碳（CO₂）： 會造成溫室效應（Greenhouse Effect），導致全球暖化。這種現象在「金星（Venus）」上最為極端（金星表面溫度高達 400°C 以上）。\n2. 氟氯碳化物（CFCs）： 會破壞大氣中的臭氧層（Ozone Layer），導致紫外線輻射增強（這與溫室效應是兩件不同的事，考試常混淆）。"
      },
      {
        id: "p3-13",
        q: "果報女神（Nemesis）的理論是用來解釋什麼現象？",
        a: "答案： 解釋地球歷史上週期性的大規模生物滅絕（約每 2600 萬年發生一次）。\n\n解析： 該理論假設太陽有一顆未被發現的伴星（褐矮星或紅矮星），當它運行到近日點時，會擾動歐特雲（Oort Cloud），導致大量彗星撞擊地球。"
      },
      {
        id: "p3-14",
        q: "哈雷彗星的彗核、彗髮、彗尾大概各有多大？如果撞擊地球，會造成什麼後果？",
        a: "大小估計：\n1. 彗核： 極小，約 10~15 公里（像馬鈴薯大小的髒雪球）。\n2. 彗髮： 很大，可達 數萬至數十萬公里（有時甚至比木星還大）。\n3. 彗尾： 極長，可延伸 數百萬至上億公里（跨越天際）。\n\n撞擊後果： 毀滅性災難。會揚起巨大塵埃遮蔽陽光，造成全球氣候劇變（類似核子冬天），導致生物大滅絕（如恐龍滅絕等級）。"
      },
      {
        id: "p3-15",
        q: "唯一曾經連續拜訪過木星、土星、天王星，與海王星的行星際探測船是那一艘？",
        a: "答案： 航海家二號（Voyager 2）。\n\n解析： 航海家一號在土星探測完土衛六（Titan）後就飛離黃道面了，只有二號完成了「太陽系壯遊（Grand Tour）」。"
      },
      {
        id: "p3-16",
        q: "彗星的周期性是那一位天文學家發現的？他又是借助了誰的理論？",
        a: "發現者： 愛德蒙·哈雷（Edmond Halley）。\n借助理論： 牛頓（Isaac Newton）的萬有引力定律。\n\n解析： 哈雷利用牛頓的公式計算，預言了這顆彗星會在 1758 年回歸，證實了彗星是繞日運行的天體。"
      },
      {
        id: "p3-17",
        q: "從科學的角度來看，占星術有那些問題？",
        a: "1. 歲差（Precession）： 地球自轉軸會擺動，導致現在的星座日期與兩千年前定義時已經位移了（例如你以為你是牡羊座，其實太陽當時在雙魚座）。\n2. 缺乏物理機制： 行星對人的引力或潮汐力微乎其微（產房裡的產婆對嬰兒的引力都比火星大）。\n3. 統計學不成立： 科學統計無法證實星座與性格的相關性（巴納姆效應）。"
      },
      {
        id: "p3-18",
        q: "天文學家如何估計我們銀河中可能存在的高智文明的數目？關鍵的因素最可能是那一項？",
        a: "方法： 德雷克公式（Drake Equation）。\n關鍵因素： L（高智文明能夠存在並釋放訊號的時間長度）。\n\n解析： 如果文明發展出高科技後很快就自我毀滅（核戰、環境崩潰），那麼 L 很短，宇宙中能溝通的文明就會非常少。"
      },
      {
        id: "p3-19",
        q: "天文學家用什麼波段搜尋外星文明？行星探測太空船上又攜帶了什麼資訊？",
        a: "搜尋波段： 無線電波（Radio Waves），特別是「水洞（Water Hole）」波段（氫原子 21 公分譜線附近）。\n\n攜帶資訊：\n1. 先鋒號（Pioneer 10 & 11）： 鍍金鋁板（畫有人類一男一女圖像、地球在銀河系的位置）。\n2. 航海家號（Voyager 1 & 2）： 金唱片（The Golden Record），收錄了地球的聲音、圖像、語言問候和音樂。"
      },
      {
        id: "p3-20",
        q: "流星的本質是什麼？流星雨又是怎麼發生的？隕石的來源有那幾個地方？",
        a: "流星本質： 太空中的塵埃或砂粒高速進入大氣層，因摩擦生熱而發光的現象（通常在掉到地面前就燒完了）。\n流星雨成因： 地球軌道經過彗星遺留下來的軌道碎片（塵埃帶），大量塵埃同時進入大氣層。\n隕石來源： 絕大多數來自小行星帶（Asteroid Belt），極少數來自月球或火星。"
      },
      {
        id: "p3-21",
        q: "請將太陽系的八大行星，依照體積由小到大進行排序。",
        a: "回答： 水星 < 火星 < 金星 < 地球 < 海王星 < 天王星 < 土星 < 木星\n\n解析：\n1. 水星最小，木星最大。\n2. 容易搞混的點：火星比地球和金星都小（火星約為地球的一半大）。\n3. 地球略大於金星（兩者常被稱為雙胞胎）。\n4. 天王星的體積略大於海王星（雖然海王星質量較重，但直徑是天王星比較大）。"
      },
      {
        id: "p3-22",
        q: "2020年的火星探測任務中，隨著毅力號（Perseverance）一同登陸火星，並成為人類史上第一架在「地球以外的星球」進行動力飛行的無人直升機名稱為何？",
        a: "回答： 機智號（Ingenuity）\n\n解析： 火星大氣層非常稀薄（只有地球的 1%），因此它的螺旋槳轉速必須非常快才能產生足夠的升力。"
      },
      {
        id: "p3-23",
        q: "流星雨通常在每年的固定時間發生，且看起來像是從夜空中的某一個點向外發散出來。\n1. 這個中心點被稱為什麼？\n2. 流星雨的成因（來源）是什麼？",
        a: "回答：\n1. 輻射點（Radiant point）\n2. 地球穿過了彗星遺留在軌道上的塵埃帶。\n\n解析： 當地球公轉經過這些密集的塵埃帶時，大量砂粒高速進入大氣層燃燒，就形成了流星雨。"
      },
      {
        id: "p3-24",
        q: "隕石依成分主要分為哪三類？另外，地表的岩石因受隕石撞擊的高溫高壓熔化並飛濺，冷卻後形成的天然玻璃物質稱為什麼？",
        a: "回答：\n1. 三大類：石質隕石、鐵質隕石、石鐵隕石\n2. 天然玻璃：玻璃隕石（或稱 衝擊玻璃 / Tektite）\n\n解析： 玻璃隕石（Tektite）本身不是從太空掉下來的隕石，而是「地球物質」被撞擊後變質形成的產物。"
      },
      {
        id: "p3-25",
        q: "關於彗星的觀測：\n1. 為什麼彗星運行到近日點（離太陽最近）時，地球上反而很難觀測？\n2. 哈雷彗星上次回歸是 1986 年，下一次回歸將是西元哪一年？\n3. 1994 年，哪一顆彗星撞擊了木星，造成全球轟動？",
        a: "回答：\n1. 因為會在白天出現，且太陽光太強，掩蓋了彗星的光芒。\n2. 2061 年（哈雷彗星週期約 76 年）。\n3. 舒梅克－李維九號彗星（Shoemaker-Levy 9, SL9）。"
      },
      {
        id: "p3-26",
        q: "關於愛因斯坦與相對論：\n1. 「狹義相對論」與「廣義相對論」最大的差別在於後者探討了什麼？\n2. 1919 年，艾丁頓（Arthur Eddington）利用日全食觀測證明了廣義相對論，他觀測到了什麼現象？",
        a: "回答：\n1. 廣義相對論探討了重力（時空的扭曲）。（狹義相對論主要探討光速不變）。\n2. 太陽的重力場使得背景恆星的光線發生偏折。"
      },
      {
        id: "p3-27",
        q: "2015 年，LIGO（雷射干涉重力波天文台）首次直接偵測到「重力波」。請問重力波的定義是什麼？這次偵測到的訊號源自於什麼天體事件？",
        a: "回答：\n1. 定義：帶有質量的物體加速運動時，造成時空的漣漪（波動）向外傳遞。\n2. 來源：雙黑洞合併（兩個黑洞互相以此繞轉並結合）。"
      },
      {
        id: "p3-28",
        q: "1953 年著名的「米勒－尤里實驗（Miller-Urey experiment）」模擬了生命誕生的過程：\n1. 實驗中使用了哪四種氣體來模擬原始地球的大氣？\n2. 實驗中使用什麼方式來模擬能量來源（如閃電）？",
        a: "回答：\n1. 氣體：甲烷、氨、氫氣、水蒸氣（注意：沒有氧氣）。\n2. 能量：電擊（放電）。"
      },
      {
        id: "p3-29",
        q: "關於太空望遠鏡與太空史：\n1. 哈伯（Edwin Hubble）最大的貢獻是發現了什麼？\n2. 韋伯太空望遠鏡（JWST）是以誰的名字命名？他有什麼貢獻？\n3. JWST 之所以能比哈伯望遠鏡看得更遠、更清晰，主要是因為它觀測的波段是什麼？",
        a: "回答：\n1. 哈伯：發現宇宙正在膨脹（星系紅移）。\n2. 韋伯：NASA 第二任署長，主導了阿波羅計畫（登月計畫）。\n3. 波段：紅外線（可以穿透塵埃，並觀測到因宇宙膨脹而紅移的古老光線）。"
      },
      {
        id: "p3-30",
        q: "在美蘇太空競賽中，為美國打造「農農五號（Saturn V）」火箭，將人類送上月球的關鍵人物是誰？他的背景為何？",
        a: "回答：\n1. 人物：華納·馮·布朗（Wernher von Braun）。\n2. 背景：德國人，二戰期間為納粹德國發明了 V2 火箭（飛彈），戰後投靠美國。"
      },
      {
        id: "p3-31",
        q: "請將以下天體結構依照空間尺度由小到大排列：\n【 銀河系、地球、太陽系、宇宙大尺度結構、星系團、太陽 】",
        a: "回答： 地球 < 太陽 < 太陽系 < 銀河系 < 星系團 < 宇宙大尺度結構"
      },
      {
        id: "p3-32",
        q: "根據目前的宇宙論，宇宙的組成成分中，佔比由多到少分別是哪些？（請寫出名稱與大約比例）",
        a: "回答：\n1. 暗能量（Dark Energy）：約 68% （推動宇宙加速膨脹）。\n2. 暗物質（Dark Matter）：約 27% （提供額外的重力）。\n3. 一般物質（重子物質）：約 5% （我們看得到的星星、氣體和人類）。"
      }
    ]
  },
  {
    section: "四、進階主題測驗",
    questions: [
      {
        id: "p4-1",
        q: "【隕石】隕石主要分為哪三種？",
        a: "回答： 主要分為三大類：石質隕石、鐵質隕石、石鐵隕石。\n解説： 這是依據隕石的化學成分與結構進行的分類，其中石質隕石最常見，鐵質隕石則較容易被辨識出來（因為密度大且具磁性）。"
      },
      {
        id: "p4-2",
        q: "【隕石】網路上常有人販售所謂「玻璃隕石（Tektite）」，它的本質是什麼？真的是來自太空的隕石嗎？",
        a: "回答： 它的本質是「地球的岩石」。它不是來自太空的隕石，而是巨大的隕石撞擊地球時，高溫熔化了地表的岩石，噴濺到空中冷卻後形成的天然玻璃（衝擊玻璃）。\n解説： 很多人誤以為它是外星物質，其實它是地球物質因撞擊而被「煉製」成的。它通常呈現氣動力學形狀（如水滴狀、啞鈴狀），是曾經飛行過的證據。"
      },
      {
        id: "p4-3",
        q: "【隕石】我們在地球上也發現過來自月球或火星的隕石，這些石頭是怎麼從那裡跑到地球的？",
        a: "回答： 這是因為小行星巨大撞擊月球或火星表面，將當地的岩石噴射（濺射）出該星球的重力範圍，在太空中漂流許久後，被地球引力捕捉而掉落。\n解説： 科學家是透過分析石頭內封存氣體的同位素比例（與火星大氣比對）或礦物成分，來確認它們的身世。"
      },
      {
        id: "p4-4",
        q: "【彗星】彗星靠近太陽時（近日點）雖然最亮，為什麼反而「不容易」觀測？但為什麼又說「更容易」觀測（視條件而定）？",
        a: "不容易： 因為彗星在近日點時通常與太陽同方向，會被太陽耀眼的光芒掩蓋（除非發生日全食）。\n更容易（視條件）： 因為受太陽熱輻射影響，揮發性物質大量噴發，使彗髮與彗尾發展得最大、最亮。\n解説： 觀測彗星往往需要在「亮度夠亮」與「離太陽夠遠（背景夠黑）」之間取得平衡。"
      },
      {
        id: "p4-5",
        q: "【彗星】哈雷（Edmond Halley）是依據誰的什麼理論，成功預測了彗星的週期性？",
        a: "回答： 依據牛頓（Newton）的萬有引力定律（與運動定律）。\n解説： 哈雷發現 1531、1607、1682 年出現的彗星軌道驚人一致，利用牛頓力學計算後斷言它們是同一顆，這是天文學從觀測紀錄走向精確預測的重要里程碑。"
      },
      {
        id: "p4-6",
        q: "【彗星】哈雷彗星的週期約為幾年？下次回歸是何時？",
        a: "回答： 平均週期約 76 年。下次回歸約在 2061 年。\n解説： 哈雷彗星是人一生中唯一可能裸眼看見兩次的短週期彗星。"
      },
      {
        id: "p4-7",
        q: "【彗星】天文學界定義「長週期彗星」與「短週期彗星」的分界線是幾年？",
        a: "回答： 200 年（200 年以下為短週期，200 年以上為長週期）。\n解説： 短週期彗星通常來自柯伊伯帶（Kuiper Belt），長週期彗星則多來自更遙遠的歐特雲（Oort Cloud）。"
      },
      {
        id: "p4-8",
        q: "【舒梅克－李維九號彗星】人類曾觀測到哪一顆彗星撞擊了木星？",
        a: "回答： 舒梅克－李維九號彗星（Shoemaker-Levy 9）。\n解説： 該撞擊發生於 1994 年，是人類首次親眼目睹太陽系內天體的巨大撞擊事件。"
      },
      {
        id: "p4-9",
        q: "【舒梅克－李維九號彗星】這顆彗星在撞擊前呈現什麼特殊的狀態（特色）？",
        a: "回答： 它被木星強大的潮汐力撕裂，碎裂成 20 多塊碎片，像一串「珍珠項鍊」一樣排成一列撞擊木星。\n解説： 這些碎片接連撞擊木星大氣層，在木星表面留下的深色疤痕甚至比地球還大。"
      },
      {
        id: "p4-10",
        q: "【流星雨】為什麼會發生流星雨？",
        a: "回答： 當地球軌道與彗星（或小行星）遺留下的塵埃帶相交時，大量塵埃同時進入大氣層燃燒。\n解説： 這些塵埃通常只有沙粒般大小，但在高速摩擦下會發出耀眼光芒。"
      },
      {
        id: "p4-11",
        q: "【流星雨】為什麼流星雨看起來都會從一個「輻射點」發射出來？",
        a: "回答： 這是「透視原理」造成的視覺效果。流星體其實是平行進入大氣層的，就像平行的鐵軌在遠方看起來會交會於一點。\n解説： 就像開車在雪中行駛，雪花看起來都從車頭前方某點發散出來一樣。"
      },
      {
        id: "p4-12",
        q: "【流星雨】「英仙座流星雨」、「獅子座流星雨」是怎麼命名的？是那些星座掉星星下來嗎？",
        a: "回答： 是因為流星雨的輻射點位於該星座的範圍內。\n解説： 這與該星座的恆星毫無關係，只是視覺位置剛好重疊在那裡而已。"
      },
      {
        id: "p4-13",
        q: "【火箭】戈達德（Robert Goddard）的主要貢獻是什麼？",
        a: "回答： 他被稱為現代火箭之父，發明並製造了人類第一枚液態燃料火箭。\n解説： 他證明了火箭可以在真空中運作（當時常被誤解為不可能），奠定了現代航太推進的基礎。"
      },
      {
        id: "p4-14",
        q: "【火箭】華納·馮·布朗（Wernher von Braun）在「德國時期」與「美國時期」的主要貢獻分別為何？",
        a: "回答：\n德國時期： 開發出 V2 火箭（世界上第一種彈道飛彈/長程武器）。\n美國時期： 主持開發 農農五號（Saturn V） 火箭。\n解説： 農農五號是至今最強大的火箭之一，成功執行阿波羅計畫將人類送上月球。"
      },
      {
        id: "p4-15",
        q: "【相對論】「狹義相對論」與「廣義相對論」的核心概念分別是什麼？",
        a: "回答：\n狹義相對論： 探討等速運動，提出光速恆定，及時間膨脹、長度收縮、E=mc²。\n廣義相對論： 探討加速運動與重力，提出物質會造成時空彎曲（重力即是時空的幾何形狀）。\n解説： 狹義相對論修正了我們對時間和空間的看法；廣義相對論則重新定義了引力的本質。"
      },
      {
        id: "p4-16",
        q: "【相對論】艾丁頓（Eddington）為什麼要去觀測日食？他是為了驗證什麼？",
        a: "回答： 他利用日全食擋住太陽光，觀測太陽背後的恆星位置是否發生偏移。這是為了驗證廣義相對論中「光線會被重力彎曲」的預測。\n解説： 這是廣義相對論獲得實驗證實的關鍵時刻，證明了太陽的質量確實彎曲了周圍的時空。"
      },
      {
        id: "p4-17",
        q: "【黑洞與重力波】重力波是如何產生的？",
        a: "回答： 當帶有質量的物體（特別是大質量天體如黑洞、中子星）做加速運動時，會擾動時空，產生像漣漪般的波動向外擴散。\n解説： 愛因斯坦百年前就預言了重力波，直到現代科技才精確捕捉到這種極其微弱的時空震盪。"
      },
      {
        id: "p4-18",
        q: "【黑洞與重力波】2015 年人類首次直接探測到重力波（LIGO計畫），該事件源自什麼？",
        a: "回答： 源自兩個黑洞的合併（Inspiral and Merger）。\n解説： 這開啟了「重力波天文學」的新時代，讓我們除了用「看（光）」的，還能用「聽（重力波）」的來探索宇宙。"
      },
      {
        id: "p4-19",
        q: "【黑洞與重力波】人類是如何拍到 M87 星系中心的黑洞照片（甜甜圈狀影像）？",
        a: "回答： 使用「事件視界望遠鏡（EHT）」，利用特長基線干涉技術（VLBI），將散佈全球的無線電望遠鏡連線，模擬成一個地球一樣大的望遠鏡。\n解説： 因為黑洞非常遠且小，單一望遠鏡無法達到足夠的解析度，必須聯合全球之力才能成像。"
      },
      {
        id: "p4-20",
        q: "【宇宙組成】天體的規模由小到大排列為何？",
        a: "回答： 地球 < 太陽系 < 銀河系 < 星系團 < 超星系團 < 宇宙大尺度結構。\n解説： 這是宇宙的層級結構，地球只是太陽系的一小部分，而太陽系又是銀河系數千億恆星中的一顆。"
      },
      {
        id: "p4-21",
        q: "【宇宙組成】宇宙中除了我們看得到的「一般物質（重子物質）」外，還存在哪兩種未知的東西？它們的占比大約是多少？",
        a: "回答：\n暗能量（Dark Energy）： 約 68%（占比最高，排斥力）。\n暗物質（Dark Matter）： 約 27%（重力，維繫星系）。\n一般物質：約 5%。\n解説： 我們所熟知的宇宙萬物，其實只佔了宇宙總成分的 5%，其餘 95% 是目前物理學尚未完全解開的謎團。"
      },
      {
        id: "p4-22",
        q: "【火星】地球與火星大約每兩年會接近一次（衝），但為什麼每隔 15~17 年會有一次「大接近（大衝）」？",
        a: "回答： 因為火星軌道是比較扁的橢圓形。當兩者相會時，若火星剛好位於其軌道的近日點附近，距離就會特別近。\n解説： 「大衝」是觀測火星的最佳時機，火星看起來會最大、最亮。"
      },
      {
        id: "p4-23",
        q: "【火星】2021 年毅力號（Perseverance）登陸火星時，多帶了什麼設備，讓探測可以更靈活？",
        a: "回答： 機智號（Ingenuity）無人直升機。\n解説： 它驗證了在火星極稀薄大氣中進行動力飛行的可行性，是人類首次在外星球實現動力飛行。"
      }
    ]
  }
];

export default function App() {
  // Track revealed answers: { "p1-1": true, "p1-2": false }
  const [revealedState, setRevealedState] = useState({});
  // Track user grading: { "p1-1": 'correct', "p1-2": 'wrong' }
  const [userStatus, setUserStatus] = useState({});
  // View mode: 'all' or 'review'
  const [viewMode, setViewMode] = useState('all');

  // Toggle answer visibility
  const toggleReveal = (id) => {
    setRevealedState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Set grade (O or X)
  const handleGrade = (id, status) => {
    setUserStatus(prev => ({
      ...prev,
      [id]: status
    }));
    // If grading, auto-reveal just in case, though usually they reveal first
    setRevealedState(prev => ({ ...prev, [id]: true }));
  };

  // Helper to get counts
  const stats = useMemo(() => {
    let total = 0;
    let correct = 0;
    let wrong = 0;
    let answered = 0;

    QUIZ_DATA.forEach(section => {
      section.questions.forEach(q => {
        total++;
        if (userStatus[q.id] === 'correct') correct++;
        if (userStatus[q.id] === 'wrong') wrong++;
        if (userStatus[q.id]) answered++;
      });
    });

    return { total, correct, wrong, answered };
  }, [userStatus]);

  // Reset filter to see all
  const handleResetFilter = () => {
    setViewMode('all');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-4 pb-24">
      {/* Header / Stats Board */}
      <div className="max-w-3xl mx-auto mb-6 bg-white rounded-xl shadow-sm p-4 border border-gray-100 sticky top-2 z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              天文學題庫複習
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              完成度: {stats.answered} / {stats.total} 題
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> {stats.correct}
            </div>
            <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full flex items-center gap-1">
              <XCircle className="w-4 h-4" /> {stats.wrong}
            </div>
            <div className="h-8 w-px bg-gray-200 mx-1"></div>
            <button
              onClick={() => setViewMode(viewMode === 'all' ? 'review' : 'all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${viewMode === 'review'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
            >
              {viewMode === 'review' ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  顯示全部
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4" />
                  只複習錯題 ({stats.wrong})
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-3xl mx-auto space-y-8">
        {viewMode === 'review' && stats.wrong === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-lg">太棒了！目前沒有標記為錯誤的題目。</p>
            <button onClick={handleResetFilter} className="mt-4 text-blue-600 hover:underline">
              返回顯示全部題目
            </button>
          </div>
        )}

        {QUIZ_DATA.map((section) => {
          // Filter questions for this section
          const visibleQuestions = section.questions.filter(q => {
            if (viewMode === 'all') return true;
            return userStatus[q.id] === 'wrong';
          });

          if (visibleQuestions.length === 0) return null;

          return (
            <div key={section.section} className="space-y-4">
              <h2 className="text-lg font-bold text-gray-700 border-l-4 border-blue-500 pl-3">
                {section.section}
              </h2>

              {visibleQuestions.map((q, index) => {
                const isRevealed = revealedState[q.id];
                const status = userStatus[q.id];
                const isCorrect = status === 'correct';
                const isWrong = status === 'wrong';

                return (
                  <div
                    key={q.id}
                    className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all duration-300 ${isWrong ? 'border-red-200 shadow-red-50' :
                        isCorrect ? 'border-green-200 shadow-green-50' : 'border-gray-200'
                      }`}
                  >
                    {/* Question Area */}
                    <div className="p-5 md:p-6">
                      <div className="flex gap-4">
                        <span className="text-gray-400 font-mono text-sm shrink-0 mt-1">
                          #{q.id.split('-')[1]}
                        </span>
                        <h3 className="text-lg text-gray-900 font-medium leading-relaxed">
                          {q.q}
                        </h3>
                      </div>
                    </div>

                    {/* Action Bar (Show Answer) */}
                    {!isRevealed && (
                      <div className="px-6 pb-6 pt-0">
                        <button
                          onClick={() => toggleReveal(q.id)}
                          className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
                        >
                          <Eye className="w-5 h-5" />
                          查看解答
                        </button>
                      </div>
                    )}

                    {/* Answer Area (Collapsible) */}
                    {isRevealed && (
                      <div className="bg-slate-50 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-6">
                          <div className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                            解答
                          </div>
                          <div className="text-gray-800 whitespace-pre-line leading-relaxed pl-4 border-l-2 border-slate-300">
                            {q.a}
                          </div>
                        </div>

                        {/* Grading Controls */}
                        <div className="px-6 pb-4 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 bg-white p-4">
                          <span className="text-sm text-gray-500">這題答對了嗎？</span>
                          <div className="flex gap-3 w-full sm:w-auto">
                            <button
                              onClick={() => handleGrade(q.id, 'correct')}
                              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg border transition-all ${isCorrect
                                  ? 'bg-green-600 text-white border-green-600 shadow-md ring-2 ring-green-100'
                                  : 'bg-white text-gray-600 border-gray-300 hover:bg-green-50 hover:text-green-700 hover:border-green-200'
                                }`}
                            >
                              <CheckCircle className="w-5 h-5" />
                              <span>答對</span>
                            </button>

                            <button
                              onClick={() => handleGrade(q.id, 'wrong')}
                              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg border transition-all ${isWrong
                                  ? 'bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-100'
                                  : 'bg-white text-gray-600 border-gray-300 hover:bg-red-50 hover:text-red-700 hover:border-red-200'
                                }`}
                            >
                              <XCircle className="w-5 h-5" />
                              <span>答錯 / 複習</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Empty State for Section if all filtered out */}
        {viewMode === 'all' && stats.total === 0 && (
          <div className="text-center py-12">資料載入中...</div>
        )}
      </div>

      {/* Footer Info */}
      <div className="max-w-3xl mx-auto mt-12 text-center text-gray-400 text-sm pb-8">
        <p>點擊「答錯」的題目將會被加入複習清單。</p>
      </div>
    </div>
  );
}
