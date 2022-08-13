import { useEffect, useState } from "react";
import axios from "axios";
import { TiStarburst } from "react-icons/ti";
import "./quran_board.css";
import Form from 'react-bootstrap/Form';
const BookBoard = () => {
  let nameOfsurahQuran = [
    "الفَاتِحَة",
    "البَقَرَة",
    "آل عِمرَان",
    "النِّسَاء",
    "المَائدة",
    "الأنعَام",
    "الأعرَاف",
    "الأنفَال",
    "التوبَة",
    "يُونس",
    "هُود",
    "يُوسُف",
    "الرَّعْد",
    "إبراهِيم",
    "الحِجْر",
    "النَّحْل",
    "الإسْرَاء",
    "الكهْف",
    "مَريَم",
    "طه",
    "الأنبيَاء",
    "الحَج",
    "المُؤمنون",
    "النُّور",
    "الفُرْقان",
    "الشُّعَرَاء",
    "النَّمْل",
    "القَصَص",
    "العَنكبوت",
    "الرُّوم",
    "لقمَان",
    "السَّجدَة",
    "الأحزَاب",
    "سَبَأ",
    "فَاطِر",
    "يس",
    "الصَّافات",
    "ص",
    "الزُّمَر",
    "غَافِر",
    "فُصِّلَتْ",
    "الشُّورَى",
    "الزُّخْرُف",
    "الدخَان",
    "الجَاثيَة",
    "الأحْقاف",
    "محَمَّد",
    "الفَتْح",
    "الحُجرَات",
    "ق",
    "الذَّاريَات",
    "الطُّور",
    "النَّجْم",
    "القَمَر",
    "الرَّحمن",
    "الوَاقِعَة",
    "الحَديد",
    "المجَادلة",
    "الحَشر",
    "المُمتَحنَة",
    "الصَّف",
    "الجُمُعَة",
    "المنَافِقون",
    "التغَابُن",
    "الطلَاق",
    "التحْريم",
    "المُلْك",
    "القَلَم",
    "الحَاقَّة",
    "المعَارج",
    "نُوح",
    "الجِن",
    "المُزَّمِّل",
    "المُدَّثِّر",
    "القِيَامَة",
    "الإنسَان",
    "المُرسَلات",
    "النَّبَأ",
    "النّازعَات",
    "عَبَس",
    "التَّكوير",
    "الانفِطار",
    "المطفِّفِين",
    "الانْشِقَاق",
    "البرُوج",
    "الطَّارِق",
    "الأَعْلى",
    "الغَاشِية",
    "الفَجْر",
    "البَلَد",
    "الشَّمْس",
    "الليْل",
    "الضُّحَى",
    "الشَّرْح",
    "التِّين",
    "العَلَق",
    "القَدْر",
    "البَينَة",
    "الزلزَلة",
    "العَادِيات",
    "القَارِعة",
    "التَّكَاثر",
    "العَصْر",
    "الهُمَزَة",
    "الفِيل",
    "قُرَيْش",
    "المَاعُون",
    "الكَوْثَر",
    "الكَافِرُون",
    "النَّصر",
    "المَسَد",
    "الإخْلَاص",
    "الفَلَق",
    "النَّاس"

  ]
  let juzArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  let surahPages = [[0, 1], [2, 49], [50, 76], [77, 106], [106, 127], [128, 150], [151, 176],
  [177, 186], [187, 207], [208, 221], [221, 235], [235, 248], [249, 255], [255, 261], [262, 267], [267, 281],
  [282, 293], [293, 304], [305, 312], [312, 321], [322, 331], [332, 341], [342, 349], [350, 359], [359, 366],
  [367, 376], [377, 385], [385, 396], [396, 404], [404, 414], [415, 417], [418, 427], [428, 434], [434, 440],
  [440, 445], [446, 452], [453, 458], [458, 467], [467, 476], [477, 482], [483, 489], [489, 495], [496, 498],
  [499, 502], [502, 506], [507, 510], [511, 515], [515, 517], [518, 520], [520, 523], [523, 525], [526, 528],
  [528, 531], [531, 534], [534, 537], [537, 541], [542, 545], [545, 548], [549, 551], [551, 552], [553, 554],
  [554, 555], [556, 557], [558, 559], [560, 561], [562, 564], [564, 566], [566, 568], [568, 570], [570, 571],
  [572, 573], [574, 575], [575, 577], [577, 578], [578, 580], [580, 581], [582, 583], [583, 584], [585, 585],
  [586, 586], [587, 587], [587, 589], [590, 590], [591, 591], [591, 592], [592, 592], [593, 594], [594, 594],
  [595, 595], [595, 596], [596, 596], [596, 596], [597, 597], [597, 597], [598, 598], [598, 599], [599, 599],
  [599, 600], [600, 600], [600, 600], [601, 601], [601, 601], [601, 601], [602, 602], [602, 602], [602, 602],
  [603, 603], [603, 603], [603, 603], [604, 604], [604, 604], [604, 604]];
  let surahStarterPage = [1, 2, 50, 77, 106, 128, 151, 177, 187, 208, 221, 235, 249, 255, 262, 267, 282,
    293, 305, 312, 322, 332, 342, 350, 359, 367, 377, 385, 396, 404, 415, 418, 428, 434, 440, 446, 453, 458, 467,
    477, 483, 489, 496, 499, 502, 507, 511, 515, 518, 520, 523, 526, 528, 531, 534, 537, 542, 545, 549, 551, 553,
    554, 556, 558, 560, 562, 564, 566, 568, 570, 572, 574, 575, 577, 578, 580, 582, 583, 585, 586, 587, 587, 589, 590,
    591, 591, 592, 593, 594, 595, 595, 596, 596, 597, 597, 598, 598, 599, 599, 600, 600, 601, 601, 601, 602, 602, 602,
    603, 603, 603, 604, 604, 604, 604];
  let pagesArr = [];
  const [book, setBook] = useState([]);
  const [pages, setPages] = useState([]);
  const [souarNames, setSouarName] = useState(nameOfsurahQuran);
  const [sourahPages, setSourahPages] = useState(surahPages);
  const [starterPage, setStarterPage] = useState(surahStarterPage);
  const [pageNumber, setPageNumber] = useState(1);
  const getNumOfSurahPages = (index) => {
    for (let i = sourahPages[index][0]; i <= sourahPages[index][1]; i++) {
      if (i !== 0)
        pagesArr.push(i);
    }
    setPages(pagesArr);
  }

  const getSouarOfJuz = (juzNumber) => {

    switch (Number(juzNumber)) {

      case 1:
        nameOfsurahQuran.splice(2, nameOfsurahQuran.length);
        setSouarName(nameOfsurahQuran);
        surahPages[1][1] = 21;
        surahPages.splice(2, surahPages.length);
        setSourahPages(surahPages);
        console.log(sourahPages);
        starterPage.splice(2, starterPage.length);
        break;
      case 2:
        nameOfsurahQuran.splice(2, nameOfsurahQuran.length);
        nameOfsurahQuran.shift();
        setSouarName(nameOfsurahQuran);
        surahPages.splice(2, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 22;
        surahPages[0][1] = 41;
        setSourahPages(surahPages);
        starterPage.splice(2, starterPage.length);
        starterPage.shift();
        starterPage[0] = 22;
        setStarterPage(starterPage);
        break;
      case 3:
        nameOfsurahQuran.splice(3, nameOfsurahQuran.length);
        nameOfsurahQuran.shift();
        setSouarName(nameOfsurahQuran);
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        break;
      case 4:
        nameOfsurahQuran.splice(4, nameOfsurahQuran.length);
        nameOfsurahQuran.splice(0, 2);
        setSouarName(nameOfsurahQuran);
        
        surahPages.splice(4, surahPages.length);
        surahPages.splice(0, 2);
        console.log(surahPages);
        
        surahPages[0][0] = 62;
        surahPages[1][1] = 81;
      
        setSourahPages(surahPages);
        /*
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 5:
        nameOfsurahQuran.splice(4, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 3);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        
        surahPages.splice(4, surahPages.length);
        surahPages.splice(0, 3);
        
        surahPages[0][0] = 82;
        surahPages[0][1] = 101;
        setSourahPages(surahPages);
        /*
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 6:
        nameOfsurahQuran.splice(5, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 3);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);


        surahPages.splice(5, surahPages.length);
        surahPages.splice(0, 3);
        
        surahPages[0][0] = 102;
        surahPages[1][1] = 121;
        
        setSourahPages(surahPages);
        console.log(surahPages);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 7:
        nameOfsurahQuran.splice(6, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 4);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 8:
        nameOfsurahQuran.splice(7, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 5);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 9:
        nameOfsurahQuran.splice(8, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 6);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 10:
        nameOfsurahQuran.splice(9, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 7);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 11:
        nameOfsurahQuran.splice(11, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 8);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 12:
        nameOfsurahQuran.splice(12, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 10);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 13:
        nameOfsurahQuran.splice(14, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 11);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 14:
        nameOfsurahQuran.splice(16, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 14);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 15:
        nameOfsurahQuran.splice(18, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 16);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 16:
        nameOfsurahQuran.splice(20, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 17);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 17:
        nameOfsurahQuran.splice(22, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 20);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 18:
        nameOfsurahQuran.splice(25, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 22);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 19:
        nameOfsurahQuran.splice(27, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 24);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 20:
        nameOfsurahQuran.splice(29, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 26);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 21:
        nameOfsurahQuran.splice(33, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 28);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 22:
        nameOfsurahQuran.splice(36, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 32);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 23:
        nameOfsurahQuran.splice(39, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 35);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 24:
        nameOfsurahQuran.splice(41, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 38);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 25:
        nameOfsurahQuran.splice(45, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 40);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 26:
        nameOfsurahQuran.splice(51, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 45);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 27:
        nameOfsurahQuran.splice(57, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 50);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 28:
        nameOfsurahQuran.splice(66, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 57);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 29:
        nameOfsurahQuran.splice(77, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 66);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      case 30:
        nameOfsurahQuran.splice(114, nameOfsurahQuran.length);
        console.log(nameOfsurahQuran);
        nameOfsurahQuran.splice(0, 77);
        console.log(nameOfsurahQuran);
        setSouarName(nameOfsurahQuran);
        /*
        surahPages.splice(3, surahPages.length);
        surahPages.shift();
        surahPages[0][0] = 42;
        surahPages[0][1] = 49;
        surahPages[1][1] = 62;
        setSourahPages(surahPages);
        starterPage.splice(3, starterPage.length);
        starterPage.splice(0, 1);
        starterPage[0] = 42;
        console.log(starterPage);
        setStarterPage(starterPage);
        */
        break;
      default:
      //console.log(juzNumber);
    }
  }
  useEffect(() => {

    //API Call for Quran Pages
    //https://api.alquran.cloud/v1/page/4/ar.asad
    //`https://api.alquran.cloud/v1/page/${pageNumber}/ar.asad`
    axios
      .get(`https://api.alquran.cloud/v1/page/${pageNumber}/ar.asad`)
      .then((res) => {
        // console.log(res.data.data.ayahs);
        console.log("ah ya farahat ah");
        setBook(res.data.data.ayahs);
      })
      .catch((err) => console.log(err));
  }, [pages, pageNumber]);
  return (
    <>

      <div className="quran-surah-settings">
        <div>
          <Form.Label>اسم الصورة</Form.Label>
          <Form.Select onChange={(event) => (
            // eslint-disable-next-line no-sequences
            getNumOfSurahPages(event.target.value),
            setPageNumber(starterPage[event.target.value])
          )}>
            <option>اختار</option>
            {souarNames.map((surahName, index) => (
              <option key={index} value={index}>{surahName}</option>
            ))}
          </Form.Select>
        </div>
        <div>
          <Form.Label>رقم الصفحة</Form.Label>
          <Form.Select onChange={(event) => setPageNumber(event.target.value)}>
            <option>اختار</option>
            {pages.length === 0 ? <option key={1} value={1}>1</option> : pages.map((page) => (
              <option key={page} value={page}>{page}</option>
            ))}

          </Form.Select>
        </div>
        <div>
          <Form.Label>الجزء</Form.Label>
          <Form.Select onChange={(event) => getSouarOfJuz(event.target.value)}>
            <option>اختار</option>
            {
              juzArr.map((juzNum) => (
                <option value={juzNum} key={juzNum}>الجزء{juzNum}</option>
              ))
            }
          </Form.Select>
        </div>
      </div>
      <div style={{ backgroundColor: "#fff1ac", direction: 'rtl', margin: '50px auto 0 auto', padding: '20px', textAlign: 'justify', width: '92%', borderRadius: '5px' }} className="quran-ayat-main-container">
        {book.map((ayah, index) => (



          <span
            key={`${ayah.page}-${ayah.number}`}
          >

            {
              ayah.text.startsWith("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ") ? <><h1 style={{ textAlign: 'center', padding: '30px' }}>{ayah.text.substring(0, 39)}</h1><span>{ayah.text.substring(39, ayah.text.length)}</span></> : ayah.text
            }
            {ayah.sajda}{" "}
            <span style={{ position: "relative", textAlign: "center" }}>
              {" "}
              <TiStarburst color="#f6003c" size={36} style={{ position: 'relative', top: '2px', left: '-1px' }} />{" "}
              <span
                style={{
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: 12,
                  top: 3,
                  left: 3,
                  bottom: 0,
                  right: 0,
                  textAlign: "center",
                  color: 'white'
                }}
              >
                {ayah.numberInSurah}
              </span>
            </span>
          </span>
        ))}
      </div>
    </>

  );
};

export default BookBoard;
