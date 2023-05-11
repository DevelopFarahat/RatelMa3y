import { useEffect, useState } from "react";
import axios from "axios";
import { TiStarburst } from "react-icons/ti";
import styles from "./BookBoard.module.css";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { BiUnlink, BiLink } from "react-icons/bi";
import { juzStartsArray, surahArray, surahStartsArray } from "./data.mjs";

const BookBoard = () => {
  const nameOfsurahQuran = surahArray;
  const surahStarterPage = surahStartsArray;
  const juzStarterPage = juzStartsArray;

  const { t } = useTranslation();
  const [book, setBook] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentSurah, setCurrentSurah] = useState(1);
  const [isSurahSpecificPages, setIsSurahSpecificPages] = useState(false);
  const FULL_PAGES_ARRAY = Array.from(Array(605).keys());

  //DEFINE PAGES FOR THIS SURAH ONLY

  const [pages, setPages] = useState(FULL_PAGES_ARRAY);

  const getNumOfSurahPages = (index) => {
    let diff =
      surahStarterPage[Number.parseInt(index) + 1] - surahStarterPage[index];
    let pagesArr = Array.from(Array(diff + 1).keys())?.map(
      (i) => i + surahStarterPage[index] - 1
    );
    setPages(pagesArr);
    setPageNumber(surahStarterPage[index]);
  };

  useEffect(() => {
    //API Call for Quran Pages
    axios
      .get(`https://api.alquran.cloud/v1/page/${pageNumber}/ar.asad`)
      .then((res) => {
        setBook(res.data.data.ayahs);
        setCurrentSurah(res.data.data.ayahs[0].surah.number);
      })
      .catch((err) => console.error(err));
  }, [pageNumber]);

  //TODO: select Ayah
  function selectAyah(e) {}

  return (
    <div className={styles["quran_board_main"]}>
      <div
        className={styles["quran-surah-settings"]}
        style={{ backgroundColor: "#038674", color: "white" }}
      >
        <div>
          <BsArrowBarRight
            className="d-flex d-sm-none"
            size={28}
            style={{
              minWidth: 24,
              cursor: "pointer",
              transitionDuration: ".2s",
            }}
            onClick={(e) => {
              setPageNumber((prev) => {
                {
                  e.target.style.transform = "translateX(4px)";
                  setTimeout(
                    () => (e.target.style.transform = "translateX(0px)"),
                    200
                  );
                  return prev == 1 ? 1 : Number.parseInt(prev) - 1;
                }
              });
            }}
          />

          <Form.Select
            onChange={(event) => {
              // getNumOfSurahPages(event.target.value),
              setPageNumber(surahStarterPage[event.target.value]);
            }}
            value={currentSurah - 1}
          >
            <option style={{ display: "none" }}>{t("surah")}</option>
            {nameOfsurahQuran.map((surahName, index) => (
              <option key={index} value={index} style={{ fontWeight: 600 }}>
                {index + 1} {surahName}
              </option>
            ))}
          </Form.Select>
          <BsArrowBarLeft
            className="d-flex d-sm-none"
            size={28}
            style={{
              minWidth: 24,
              cursor: "pointer",
              transitionDuration: ".2s",
            }}
            onClick={(e) =>
              setPageNumber((prev) => {
                e.target.style.transform = "translateX(-4px)";
                setTimeout(
                  () => (e.target.style.transform = "translateX(0px)"),
                  200
                );
                return Number.parseInt(prev) + 1;
              })
            }
          />
        </div>
        {/* TODO: Here to add the page changer */}
        {false && (
          <span
            onClick={() => {
              pages.length > 400
                ? getNumOfSurahPages(currentSurah)
                : setPages(FULL_PAGES_ARRAY);
            }}
          >
            {" "}
            {pages.length > 400 ? <BiUnlink size={32} /> : <BiLink size={32} />}
          </span>
        )}
        <div className="d-none d-sm-flex">
          <BsArrowBarRight
            size={28}
            style={{
              minWidth: 24,
              cursor: "pointer",
              transitionDuration: ".2s",
            }}
            onClick={(e) => {
              setPageNumber((prev) => {
                {
                  e.target.style.transform = "translateX(4px)";
                  setTimeout(
                    () => (e.target.style.transform = "translateX(0px)"),
                    200
                  );
                  return prev == 1 ? 1 : Number.parseInt(prev) - 1;
                }
              });
            }}
          />
          <Form.Select
            onChange={(event) => setPageNumber(event.target.value)}
            value={pageNumber}
            style={{ textAlign: "center" }}
          >
            {juzStarterPage.map((juzStart, index) => (
              <optgroup
                key={`Juz ${index + 1}`}
                label={`${t("sidebar_book_juz")} ${index + 1}`}
                style={{ color: "white", backgroundColor: "#01574c" }}
              >
                <option style={{ display: "none" }}>{t("page")}</option>
                {pages
                  .slice(juzStart - 1, juzStarterPage[index + 1])
                  ?.map((page, index) => {
                    if (index == 0) return;
                    return (
                      <option
                        key={page}
                        value={page}
                        style={{
                          fontWeight: 700,
                          backgroundColor: "white",
                          color: "#01574c",
                        }}
                      >
                        {page}
                      </option>
                    );
                  })}
              </optgroup>
            ))}
          </Form.Select>
          <BsArrowBarLeft
            size={28}
            style={{
              minWidth: 24,
              cursor: "pointer",
              transitionDuration: ".2s",
            }}
            onClick={(e) =>
              setPageNumber((prev) => {
                e.target.style.transform = "translateX(-4px)";
                setTimeout(
                  () => (e.target.style.transform = "translateX(0px)"),
                  200
                );
                return Number.parseInt(prev) + 1;
              })
            }
          />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#f8f9fa",
          direction: "rtl",
          margin: "16px auto 0 auto",
          padding: "20px",
          textAlign: "justify",
          width: "92%",
          borderRadius: "5px",
          userSelect: "auto",
        }}
      >
        {book?.map((ayah, index) => (
          <span key={`${ayah.page}-${ayah.number}`} style={{ lineHeight: 2 }}>
            {ayah.text.startsWith("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ") ? (
              <>
                <h2 style={{ textAlign: "center", padding: "16px" }}>
                  {ayah.text.substring(0, 39)}
                </h2>
                <span>{ayah.text.substring(39, ayah.text.length)}</span>
              </>
            ) : (
              ayah.text
            )}
            <div
              style={{
                position: "relative",
                textAlign: "center",
                width: 36,
                height: 20,
                display: "inline-block",
                cursor: "pointer",
              }}
              onClick={selectAyah}
            >
              {" "}
              <TiStarburst
                color="#038674"
                size={36}
                style={{
                  position: "absolute",
                  top: "-20%",
                  bottom: 0,
                  left: "0%",
                }}
              />{" "}
              <span
                style={{
                  position: "absolute",
                  display: "table",

                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: 12,
                  top: "3%",
                  left: "0%",
                  bottom: 0,
                  right: 0,
                  textAlign: "center",
                  color: "white",
                }}
              >
                {ayah.numberInSurah}
              </span>
            </div>
          </span>
        ))}
      </div>
    </div>
  );
};

export default BookBoard;
