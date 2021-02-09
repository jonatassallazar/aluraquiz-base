/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import fire from '../config/db-firebase';
import db from '../db.json';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import Link from '../src/components/Link';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import LeaderboardContainer from '../src/components/LeaderboardContainer';

export default function Home({ leaderboardScore }) {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>
          {db.title}
        </title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form
              onSubmit={(infosDoEvento) => {
                infosDoEvento.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <LeaderboardContainer
        as={motion.section}
        transition={{ delay: 0, duration: 0.5 }}
        variants={{
          show: { opacity: 1, y: '0' },
          hidden: { opacity: 0, y: '100%' },
        }}
        initial="hidden"
        animate="show"
      >
        <Widget.Leaderboard>
          <Widget.Header>
            <h1>Leaderboard Score</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Seja o melhor!</p>
            <ul>
              {leaderboardScore.map((i) => (
                <Widget.LeaderboardScores key={i.id}>
                  <Widget.LeaderboardScores.p>{i.nome}</Widget.LeaderboardScores.p>
                  <Widget.LeaderboardScores.p>{i.pontuacao}</Widget.LeaderboardScores.p>
                </Widget.LeaderboardScores>
              ))}

            </ul>
          </Widget.Content>
        </Widget.Leaderboard>
      </LeaderboardContainer>
      <GitHubCorner projectUrl="https://github.com/jonatassallazar" />
    </QuizBackground>
  );
}

export async function getServerSideProps() {
  try {
    const scores = [];
    await fire
      .database()
      .ref('/leaderboard/')
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          scores.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
      });
    
    const leaderboardScore = scores.sort((a,b) => b.pontuacao - a.pontuacao)
    return {
      props: {
        leaderboardScore,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
