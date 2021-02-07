/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';
import AlternativesForm from '../AlternativesForm';
import BackLinkArrow from '../BackLinkArrow';
import Button from '../Button';
import Widget from '../Widget';
import QuizPopUp from '../QuizPopUp';

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [countdown, setCountdown] = useState(60 * 1000);
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  function handleForm() {
    setIsQuestionSubmited(true);
    setTimeout(() => {
      addResult(isCorrect ? countdown / 1000 : 0);
      onSubmit();
      setCountdown(60 * 1000);
      setIsQuestionSubmited(false);
      setSelectedAlternative(undefined);
    }, 4 * 1000);
  }

  useEffect(() => {
    setTimeout(() => {
      if (!isQuestionSubmited && countdown !== 0) {
        const countdownTime = countdown - 1000;
        setCountdown(countdownTime);
      } else if (!isQuestionSubmited && countdown === 0) {
        handleForm();
      }
    }, 1000);
  });

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions} ${moment(countdown).format('mm:ss')}`}</h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            handleForm();
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
              {JSON.stringify(question, null, 4)}
            </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && (
          <QuizPopUp>
            <QuizPopUp.Center
              as={motion.section}
              transition={{ delay: 0.5, duration: 0.5 }}
              variants={{
                show: { opacity: 1, y: '0' },
                hidden: { opacity: 0, y: '100%' },
              }}
              initial="hidden"
              animate="show"
            >
              <QuizPopUp.Img
                as={motion.img}
                initial={{ scale: 0 }}
                animate={{ rotate: 180, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                src="img/correct.svg"
                alt="Correct"
              />
              <QuizPopUp.P>Você acertou!</QuizPopUp.P>
            </QuizPopUp.Center>
          </QuizPopUp>
          )}
          {isQuestionSubmited && !isCorrect && (
          <QuizPopUp>
            <QuizPopUp.Center
              as={motion.section}
              transition={{ delay: 0.5, duration: 0.5 }}
              variants={{
                show: { opacity: 1, y: '0' },
                hidden: { opacity: 0, y: '100%' },
              }}
              initial="hidden"
              animate="show"
            >
              <QuizPopUp.Img
                as={motion.img}
                initial={{ scale: 0 }}
                animate={{ rotate: 180, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                src="img/wrong.svg"
                alt="Wrong"
              />
              <QuizPopUp.P>Você errou!</QuizPopUp.P>
            </QuizPopUp.Center>
          </QuizPopUp>
          )}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

export { QuestionWidget as default };
