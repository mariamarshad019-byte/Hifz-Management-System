import { useState } from "react";
import "../App.css";
import { supabase } from "../supabaseClient";

const questions = [
  {
    english: "How many Surahs are there in the Quran?",
    urdu: "قرآن مجید میں کتنی سورتیں ہیں؟",
    options: ["110", "114", "120", "124"],
    answer: "114",
  },
  {
    english: "Which Surah is the first Surah of the Quran?",
    urdu: "قرآن مجید کی پہلی سورت کون سی ہے؟",
    options: ["Al-Baqarah", "Al-Ikhlas", "Al-Fatihah", "An-Nas"],
    answer: "Al-Fatihah",
  },
  {
    english: "How many Ayahs are in Surah Al-Fatihah?",
    urdu: "سورۃ الفاتحہ میں کتنی آیات ہیں؟",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    english: "Which Surah is the longest Surah in the Quran?",
    urdu: "قرآن مجید کی سب سے لمبی سورت کون سی ہے؟",
    options: ["Al-Fatihah", "Al-Baqarah", "Ya-Sin", "Al-Mulk"],
    answer: "Al-Baqarah",
  },
  {
    english: "How many Juz are there in the Quran?",
    urdu: "قرآن مجید کے کتنے پارے ہیں؟",
    options: ["20", "25", "30", "40"],
    answer: "30",
  },
  {
    english: "Which Surah is at the end of the Quran?",
    urdu: "قرآن مجید کے آخر میں کون سی سورت ہے؟",
    options: ["Al-Falaq", "Al-Ikhlas", "Al-Masad", "An-Nas"],
    answer: "An-Nas",
  },
  {
    english: "Which Surah has only 3 Ayahs?",
    urdu: "کون سی سورت صرف 3 آیات پر مشتمل ہے؟",
    options: ["Al-Kawthar", "Al-Asr", "An-Nasr", "Al-Fil"],
    answer: "Al-Kawthar",
  },
  {
    english: "Which Surah begins with Alhamdulillahi Rabbil Alameen?",
    urdu: "کون سی سورت الحمد للہ رب العالمین سے شروع ہوتی ہے؟",
    options: ["Al-Fatihah", "Al-Baqarah", "Al-Ikhlas", "An-Nas"],
    answer: "Al-Fatihah",
  },
  {
    english: "What is the name commonly given to the last Juz?",
    urdu: "آخری پارے کو عام طور پر کیا کہا جاتا ہے؟",
    options: ["Juz Amma", "Juz Tabarak", "Juz Yaseen", "Juz Alif Lam Mim"],
    answer: "Juz Amma",
  },
  {
    english: "Which Surah is commonly known as the heart of the Quran?",
    urdu: "قرآن مجید کا دل کس سورت کو کہا جاتا ہے؟",
    options: ["Ya-Sin", "Al-Mulk", "Al-Fatihah", "Al-Kahf"],
    answer: "Ya-Sin",
  },

  {
    english: "Which Surah contains Ayat al-Kursi?",
    urdu: "آیت الکرسی کس سورت میں ہے؟",
    options: ["Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Maidah"],
    answer: "Al-Baqarah",
  },
  {
    english: "Which Surah is number 112 in the Quran?",
    urdu: "قرآن مجید میں سورت نمبر 112 کون سی ہے؟",
    options: ["Al-Falaq", "Al-Ikhlas", "An-Nas", "Al-Masad"],
    answer: "Al-Ikhlas",
  },
  {
    english: "Which Surah is number 113?",
    urdu: "قرآن مجید میں سورت نمبر 113 کون سی ہے؟",
    options: ["Al-Falaq", "An-Nas", "Al-Ikhlas", "Al-Kafirun"],
    answer: "Al-Falaq",
  },
  {
    english: "Which Surah is number 114?",
    urdu: "قرآن مجید میں سورت نمبر 114 کون سی ہے؟",
    options: ["Al-Falaq", "An-Nas", "Al-Ikhlas", "Al-Masad"],
    answer: "An-Nas",
  },
  {
    english: "Which Surah is number 1?",
    urdu: "قرآن مجید میں سورت نمبر 1 کون سی ہے؟",
    options: ["Al-Baqarah", "Al-Fatihah", "An-Nas", "Al-Ikhlas"],
    answer: "Al-Fatihah",
  },
  {
    english: "Which Surah is number 2?",
    urdu: "قرآن مجید میں سورت نمبر 2 کون سی ہے؟",
    options: ["Al-Imran", "Al-Fatihah", "Al-Baqarah", "An-Nisa"],
    answer: "Al-Baqarah",
  },
  {
    english: "Which Surah has 6 Ayahs?",
    urdu: "کس سورت میں 6 آیات ہیں؟",
    options: ["An-Nas", "Al-Ikhlas", "Al-Kawthar", "Al-Asr"],
    answer: "An-Nas",
  },
  {
    english: "Which Surah has 4 Ayahs?",
    urdu: "کس سورت میں 4 آیات ہیں؟",
    options: ["Al-Ikhlas", "Al-Kawthar", "Al-Falaq", "An-Nas"],
    answer: "Al-Ikhlas",
  },
  {
    english: "Which Surah has 5 Ayahs?",
    urdu: "کس سورت میں 5 آیات ہیں؟",
    options: ["Al-Falaq", "Al-Kawthar", "Al-Ikhlas", "An-Nas"],
    answer: "Al-Falaq",
  },
  {
    english: "Which Surah has 3 Ayahs?",
    urdu: "کس سورت میں 3 آیات ہیں؟",
    options: ["Al-Kawthar", "Al-Ikhlas", "Al-Falaq", "An-Nas"],
    answer: "Al-Kawthar",
  },

  {
    english: "Which Surah is known as Surah Tabarak?",
    urdu: "سورۃ تبارک کس سورت کو کہا جاتا ہے؟",
    options: ["Al-Mulk", "Al-Kahf", "Ya-Sin", "Al-Waqiah"],
    answer: "Al-Mulk",
  },
  {
    english: "Which Surah begins with Ya-Sin?",
    urdu: "کون سی سورت یٰسین سے شروع ہوتی ہے؟",
    options: ["Ya-Sin", "Al-Rahman", "Al-Mulk", "Al-Waqiah"],
    answer: "Ya-Sin",
  },
  {
    english: "Which Surah is known as Ar-Rahman?",
    urdu: "سورۃ الرحمن کون سی سورت ہے؟",
    options: ["Surah 55", "Surah 56", "Surah 57", "Surah 58"],
    answer: "Surah 55",
  },
  {
    english: "Which Surah is known as Al-Waqiah?",
    urdu: "سورۃ الواقعہ کون سی سورت ہے؟",
    options: ["Surah 54", "Surah 55", "Surah 56", "Surah 57"],
    answer: "Surah 56",
  },
  {
    english: "Which Surah comes immediately after Al-Fatihah?",
    urdu: "سورۃ الفاتحہ کے فوراً بعد کون سی سورت آتی ہے؟",
    options: ["Al-Imran", "Al-Baqarah", "An-Nisa", "Al-Maidah"],
    answer: "Al-Baqarah",
  },
  {
    english: "Which Surah comes immediately before An-Nas?",
    urdu: "سورۃ الناس سے فوراً پہلے کون سی سورت آتی ہے؟",
    options: ["Al-Ikhlas", "Al-Falaq", "Al-Masad", "An-Nasr"],
    answer: "Al-Falaq",
  },
  {
    english: "Which Surah comes immediately before Al-Falaq?",
    urdu: "سورۃ الفلق سے فوراً پہلے کون سی سورت آتی ہے؟",
    options: ["Al-Masad", "An-Nas", "Al-Ikhlas", "An-Nasr"],
    answer: "Al-Ikhlas",
  },
  {
    english: "Which Surah comes immediately after Al-Ikhlas?",
    urdu: "سورۃ الاخلاص کے فوراً بعد کون سی سورت آتی ہے؟",
    options: ["Al-Falaq", "An-Nas", "Al-Masad", "Al-Kafirun"],
    answer: "Al-Falaq",
  },
  {
    english: "Which Surah comes before Al-Ikhlas?",
    urdu: "سورۃ الاخلاص سے پہلے کون سی سورت آتی ہے؟",
    options: ["Al-Masad", "Al-Kafirun", "An-Nasr", "Al-Falaq"],
    answer: "Al-Masad",
  },
  {
    english: "Which Surah is known as The Victory?",
    urdu: "فتح کے نام سے کون سی سورت مشہور ہے؟",
    options: ["Al-Fath", "An-Nasr", "Al-Kahf", "Al-Fil"],
    answer: "Al-Fath",
  },

  {
    english: "Which Surah tells the story of the People of the Elephant?",
    urdu: "اصحاب الفیل کا واقعہ کس سورت میں ہے؟",
    options: ["Al-Fil", "Quraysh", "Al-Masad", "Al-Asr"],
    answer: "Al-Fil",
  },
  {
    english: "Which Surah is about the Quraysh?",
    urdu: "قریش کے بارے میں کون سی سورت ہے؟",
    options: ["Al-Fil", "Quraysh", "Al-Kawthar", "Al-Maun"],
    answer: "Quraysh",
  },
  {
    english: "Which Surah mentions Abu Lahab?",
    urdu: "ابو لہب کا ذکر کس سورت میں ہے؟",
    options: ["Al-Masad", "Al-Fil", "Al-Kafirun", "Al-Lahab"],
    answer: "Al-Masad",
  },
  {
    english: "Which Surah is called Al-Maun?",
    urdu: "سورت الماعون کون سی ہے؟",
    options: ["Surah 105", "Surah 106", "Surah 107", "Surah 108"],
    answer: "Surah 107",
  },
  {
    english: "Which Surah is called Al-Kafirun?",
    urdu: "سورت الکافرون کون سی ہے؟",
    options: ["Surah 108", "Surah 109", "Surah 110", "Surah 111"],
    answer: "Surah 109",
  },
  {
    english: "Which Surah is called An-Nasr?",
    urdu: "سورت النصر کون سی ہے؟",
    options: ["Surah 108", "Surah 109", "Surah 110", "Surah 111"],
    answer: "Surah 110",
  },
  {
    english: "Which Surah is called Al-Masad?",
    urdu: "سورت المسد کون سی ہے؟",
    options: ["Surah 109", "Surah 110", "Surah 111", "Surah 112"],
    answer: "Surah 111",
  },
  {
    english: "Which Surah is called Al-Asr?",
    urdu: "سورت العصر کون سی ہے؟",
    options: ["Surah 101", "Surah 102", "Surah 103", "Surah 104"],
    answer: "Surah 103",
  },
  {
    english: "Which Surah is called At-Takathur?",
    urdu: "سورت التکاثر کون سی ہے؟",
    options: ["Surah 101", "Surah 102", "Surah 103", "Surah 104"],
    answer: "Surah 102",
  },
  {
    english: "Which Surah is called Al-Humazah?",
    urdu: "سورت الہمزہ کون سی ہے؟",
    options: ["Surah 103", "Surah 104", "Surah 105", "Surah 106"],
    answer: "Surah 104",
  },

  {
    english: "Which Surah contains the command to pray and sacrifice?",
    urdu: "نماز پڑھنے اور قربانی کرنے کا حکم کس سورت میں آیا ہے؟",
    options: ["Al-Kawthar", "Al-Maun", "Al-Asr", "Al-Fil"],
    answer: "Al-Kawthar",
  },
  {
    english: "Which Surah is named after a night?",
    urdu: "کون سی سورت ایک رات کے نام پر ہے؟",
    options: ["Al-Layl", "Ad-Duha", "Ash-Shams", "Al-Fajr"],
    answer: "Al-Layl",
  },
  {
    english: "Which Surah is named after the sun?",
    urdu: "کون سی سورت سورج کے نام پر ہے؟",
    options: ["Ash-Shams", "Al-Layl", "Ad-Duha", "Al-Fajr"],
    answer: "Ash-Shams",
  },
  {
    english: "Which Surah is named after the morning brightness?",
    urdu: "کون سی سورت صبح کی روشنی کے نام پر ہے؟",
    options: ["Ad-Duha", "Al-Layl", "Ash-Shams", "Al-Fajr"],
    answer: "Ad-Duha",
  },
  {
    english: "Which Surah is named after the dawn?",
    urdu: "کون سی سورت فجر کے نام پر ہے؟",
    options: ["Al-Fajr", "Ad-Duha", "Ash-Shams", "Al-Layl"],
    answer: "Al-Fajr",
  },
  {
    english: "Which Surah is named after the fig?",
    urdu: "کون سی سورت انجیر کے نام پر ہے؟",
    options: ["At-Tin", "Ad-Duha", "Al-Balad", "Al-Alaq"],
    answer: "At-Tin",
  },
  {
    english: "Which Surah is named after the city?",
    urdu: "کون سی سورت شہر کے نام پر ہے؟",
    options: ["Al-Balad", "At-Tin", "Al-Fajr", "Al-Qadr"],
    answer: "Al-Balad",
  },
  {
    english: "Which Surah mentions the Night of Decree?",
    urdu: "شب قدر کا ذکر کس سورت میں ہے؟",
    options: ["Al-Qadr", "Al-Fajr", "Ad-Duha", "Al-Layl"],
    answer: "Al-Qadr",
  },
  {
    english: "Which Surah is named Al-Alaq?",
    urdu: "سورت العلق کون سی سورت ہے؟",
    options: ["Surah 94", "Surah 95", "Surah 96", "Surah 97"],
    answer: "Surah 96",
  },
  {
    english: "Which Surah is named Al-Qadr?",
    urdu: "سورت القدر کون سی سورت ہے؟",
    options: ["Surah 95", "Surah 96", "Surah 97", "Surah 98"],
    answer: "Surah 97",
  },

  {
    english: "How many Ayahs are in Surah Al-Ikhlas?",
    urdu: "سورۃ الاخلاص میں کتنی آیات ہیں؟",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    english: "How many Ayahs are in Surah Al-Kawthar?",
    urdu: "سورۃ الکوثر میں کتنی آیات ہیں؟",
    options: ["2", "3", "4", "5"],
    answer: "3",
  },
  {
    english: "How many Ayahs are in Surah An-Nas?",
    urdu: "سورۃ الناس میں کتنی آیات ہیں؟",
    options: ["5", "6", "7", "8"],
    answer: "6",
  },
  {
    english: "How many Ayahs are in Surah Al-Falaq?",
    urdu: "سورۃ الفلق میں کتنی آیات ہیں؟",
    options: ["4", "5", "6", "7"],
    answer: "5",
  },
  {
    english: "How many Ayahs are in Surah Al-Asr?",
    urdu: "سورۃ العصر میں کتنی آیات ہیں؟",
    options: ["2", "3", "4", "5"],
    answer: "3",
  },
  {
    english: "Which Surah contains the shortest Ayah?",
    urdu: "مختصر ترین آیت کس سورت میں مشہور طور پر بیان کی جاتی ہے؟",
    options: ["Al-Kawthar", "Al-Ikhlas", "Al-Fatihah", "An-Nas"],
    answer: "Al-Kawthar",
  },
  {
    english: "Which Surah is the second Surah of the Quran?",
    urdu: "قرآن مجید کی دوسری سورت کون سی ہے؟",
    options: ["Al-Imran", "Al-Baqarah", "An-Nisa", "Al-Maidah"],
    answer: "Al-Baqarah",
  },
];

function HifzQuiz({ onBack }) {
const [quizQuestions, setQuizQuestions] = useState(() => [...questions].sort(() =>
     Math.random() - 0.5).slice(0, 10));
  const [language, setLanguage] = useState("English");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[currentQuestion];

const handleAnswer = (option) => {
  if (selectedAnswer) return;

  setSelectedAnswer(option);

  if (option === question.answer) {
    setScore((prev) => prev + 1);
  }
};

const handleNext = async () => {
  if (!selectedAnswer) return;

  if (currentQuestion === quizQuestions.length - 1) {
    const userId = localStorage.getItem("userId");

    if (userId) {
      const { error } = await supabase
        .from("quiz_results")
        .insert({
          student_id: userId,
          score:
            score +
            (selectedAnswer === question.answer ? 1 : 0),
          total_questions: quizQuestions.length,
          language: language,
        });

      if (error) {
        console.error("Could not save quiz result:", error);
      } else {
        console.log("Quiz result saved successfully.");
      }
    }

    setFinished(true);
    return;
  }

  setCurrentQuestion((prev) => prev + 1);
  setSelectedAnswer("");
};

  const restartQuiz = () => {

setQuizQuestions([...questions].sort(() =>
     Math.random() - 0.5).slice(0, 10));

    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="quiz-page">
        <div className="quiz-result-card">
          <div className="quiz-result-icon">🏆</div>

          <span>QUIZ COMPLETE</span>

          <h1>MashaAllah!</h1>

<p>
  You scored <strong>{score}</strong> out of{" "}
  <strong>{quizQuestions.length}</strong>
</p>

          <div className="quiz-result-score">
            {Math.round((score / quizQuestions.length) * 100)}%
          </div>

          <div className="quiz-result-actions">
            <button
              className="quiz-primary-btn"
              onClick={restartQuiz}
            >
              Try Again
            </button>

            <button
              className="quiz-secondary-btn"
              onClick={onBack}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <header className="quiz-header">
        <button className="quiz-back-btn" onClick={onBack}>
          ← Dashboard
        </button>

        <div>
          <span>HIFZ QUIZ</span>
          <h1>Test Your Knowledge</h1>
        </div>

        <div className="quiz-language-switch">
          <button
            className={language === "English" ? "active" : ""}
            onClick={() => setLanguage("English")}
          >
            English
          </button>

          <button
            className={language === "Urdu" ? "active" : ""}
            onClick={() => setLanguage("Urdu")}
          >
            اردو
          </button>
        </div>
      </header>

      <main className="quiz-content">
        <div className="quiz-progress-info">

<span>
  Question {currentQuestion + 1} of {quizQuestions.length}
</span>

          <strong>
            Score: {score}
          </strong>
        </div>

        <div className="quiz-progress-bar">
          <div
            style={{
              width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
            }}
          ></div>
        </div>

        <div className="quiz-card">
          <div className="quiz-question-number">
            Q{currentQuestion + 1}
          </div>

          <h2>
            {language === "English"
              ? question.english
              : question.urdu}
          </h2>

          <div className="quiz-options">
            {question.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.answer;

              let className = "quiz-option";

              if (selectedAnswer) {
                if (isCorrect) {
                  className += " correct";
                } else if (isSelected) {
                  className += " incorrect";
                }
              }

              return (
                <button
                  key={option}
                  className={className}
                  onClick={() => handleAnswer(option)}
                >
                  <span>{option}</span>

                  {selectedAnswer && isCorrect && (
                    <span>✓</span>
                  )}

                  {selectedAnswer &&
                    isSelected &&
                    !isCorrect && (
                      <span>✕</span>
                    )}
                </button>
              );
            })}
          </div>

          {selectedAnswer && (
            <div
              className={
                selectedAnswer === question.answer
                  ? "quiz-feedback correct-feedback"
                  : "quiz-feedback incorrect-feedback"
              }
            >
              {selectedAnswer === question.answer
                ? "Correct! MashaAllah 🌿"
                : `The correct answer is ${question.answer}.`}
            </div>
          )}

          <button
            className="quiz-next-btn"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
    {currentQuestion === quizQuestions.length - 1
  ? "Finish Quiz"
  : "Next Question →"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default HifzQuiz;