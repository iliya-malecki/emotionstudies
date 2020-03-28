import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

import './App.css';

const WORDS = [
'нос', 
'корица', 
'дышать', 
'перец', 
'слышать', 
'гвоздика', 
'дуновение', 
'кофе', 
'роза', 
'видеть', 
'уксус', 
'аромат', 
'выпечка', 
'духи', 
'пицца'
];

const CHECK_WORDS = [
  "чай", 
  "нос", 
  "звук", 
  "роза", 
  "стакан", 
  "перец", 
  "аромат", 
  "сыр", 
  "гвоздика", 
  "дышать", 
  "салфетки", 
  "бровь", 
  "картина", 
  "молоко", 
  "запах", 
  "мясо", 
  "дуновение", 
  "слышать", 
  "пакет", 
  "касание", 
  "весы", 
  "свечка", 
  "зонд", 
  "духи", 
  "корица", 
  "уксус", 
  "вино", 
  "видеть", 
  "выпечка", 
  "кофе", 
  "пицца"
  ];

let CHECKS = {};

for (let word of CHECK_WORDS) {
  CHECKS[word] = false;
}

const IMAGES = {
  '1': 'https://i.imgur.com/ON1wsKU.png', 
  '2': 'https://i.imgur.com/3VBy4Pc.png', 
  '3': 'https://i.imgur.com/E4XgMI1.png', 
  '4': 'https://i.imgur.com/lh9RUvs.png', 
  '5': 'https://i.imgur.com/2tDdvKK.png', 
  '6': 'https://i.imgur.com/LojZieS.png', 
  '7': 'https://i.imgur.com/EB6sSyU.png', 
  '8': 'https://i.imgur.com/uMqVgyo.png', 
  '9': 'https://i.imgur.com/fwqiAGp.png', 
  '10': 'https://i.imgur.com/OYQyGsT.png', 
  '11': 'https://i.imgur.com/pucqQL5.png', 
  '12': 'https://i.imgur.com/Aw7QIux.png', 
  '13': 'https://i.imgur.com/ewMXRs4.png', 
  '14': 'https://i.imgur.com/xJ5Q0ll.png', 
  '15': 'https://i.imgur.com/oCDtNuR.png', 
  '16': 'https://i.imgur.com/wXj5sEj.png', 
  '17': 'https://i.imgur.com/Srm2FRc.png', 
  '18': 'https://i.imgur.com/HoaACuL.png', 
  '19': 'https://i.imgur.com/6P7HQue.png', 
  '20': 'https://i.imgur.com/ZB48Edb.png', 
  '21': 'https://i.imgur.com/j7twqBF.png', 
  '22': 'https://i.imgur.com/16Man62.png', 
  '23': 'https://i.imgur.com/BEbZ5jR.png', 
  '24': 'https://i.imgur.com/NRsc7nm.png', 
  '25': 'https://i.imgur.com/dgM0wqv.png'
};

let IMAGE_CHECKS = {};

for(let image in IMAGES) {
  IMAGE_CHECKS[image] = false;
}

const queryString = window.location.search
const urldata = new URLSearchParams(queryString)
let batch;
batch = urldata.get("batch")

function App() {
  const [slide, setSlide] = useState(0);
  const [group, setGroup] = useState(null);
  const [dish, setDish] = useState('');
  const [mark, setMark] = useState(undefined);
  const [expReady, setExpReady] = useState(false);
  const [wordsEffectTrigger, setWordsEffectTrigger] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [checks, setChecks] = useState(CHECKS);
  const [imageEffectTrigger, setImageEffectTrigger] = useState(false);
  const [imageChecks, setImageChecks] = useState(IMAGE_CHECKS);

  useEffect(() => {
    if (wordsEffectTrigger) {
      const interval = setInterval(() => {
        if (wordIndex < WORDS.length - 1) {
          setWordIndex(wordIndex + 1);
        } else {
          setSlide(3);
          clearInterval(interval);
        }
      }, 1000)

      return () => clearInterval(interval);
    }
  }, [wordsEffectTrigger, wordIndex]);

  useEffect(() => {
    if (imageEffectTrigger) {  
      const timeout = setTimeout(() => {
        setSlide(5)
        setImageEffectTrigger(false);
      }, 10000)

      return () => clearTimeout(timeout);
    }
  }, [imageEffectTrigger])

  const start = () => {
    setGroup(Math.random() > 0.5 ? 'cont' : 'exp');
    setSlide(1);
  }

  const setWords = () => {
    setSlide(2);
    startWords();
  }

  const startWords = () => {
    setWordsEffectTrigger(true)
  }

  const finish = () => {
    const url = 'https://api.telegram.org/bot1106278055:AAGigFvur0fNqe_FcwwBjkJZ4Ottm5Yzekw/sendMessage';
    axios.post(url, {
      chat_id: '-483728903',
      text: JSON.stringify({
        batch,
        group,
        dish,
        mark,
        checks,
        imageChecks
      })
    });
    setSlide(6);
  }

  if (slide === 0) {
    return (
      <Grid container>
        <Typography variant="h4" align="center">
          Перед вами исследование особенностей эмоций и связанных с ними процессов.
          Оно займет не больше 2 минуты (да-да, действительно 120 секунд). 
          Полученные данные будут использоваться только в научных целях, и исследование полностью анонимно. 
          Участие добровольное, вы можете завершить его в любой момент, но просьба заполнить все поля (их немного) :)
        </Typography>
        <Grid item xs={12}>
          <Button onClick={start} variant="contained" color="primary">
            Начнём
          </Button>
        </Grid>
      </Grid>
    );
  }

  if (slide === 1) {
    if (group === 'cont' || expReady) {
      return (
        <Grid container>
          <Typography variant="h4" align="center">
            Обратите внимание на слова, которые по очереди будут появляться на экране
          </Typography>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={setWords}
            >
              Дальше
            </Button>
          </Grid>
        </Grid>
      )
    }

    if (group === 'exp') {
      return (
        <Grid container>
          <Typography variant="h4" align="center">
            Какое ваше любимое кулинарное блюдо? Опишите в нескольких словах, что вам в нем нравится больше всего?
          </Typography>
          <TextField value={dish} id="filled-basic" label="Опишите" variant="filled" onChange={e => setDish(e.target.value)}/>
          <Typography variant="h4" align="center">
            Оцените по шкале от 1 до 10, насколько вам нравится это блюдо: 1 – нейтральное отношение, 10 - высшее наслаждение
          </Typography>
          <Slider 
            min={1} 
            max={10} 
            value={mark ? mark : 1} 
            onChange={(evt, newVal) => setMark(newVal)} 
            step={1}
            marks 
          />
          <Grid item xs={12}>
            <Button 
              disabled={mark === undefined || dish === ''} 
              variant="contained" 
              color="primary" 
              onClick={() => setExpReady(true)}
            >
              Дальше
            </Button>
          </Grid>
        </Grid>
      )
    }
  }

    if (slide === 2) {
      return (
      <>
          <Typography variant="h4" align="center" className="word">
            {WORDS[wordIndex].toUpperCase()}
          </Typography>
      </>
      )
    }

    if (slide === 3) {
      return (
        <Grid container>
          <Typography variant="h4" align="center">
            Попробуйте вспомнить эти слова, и отметить в списке те, которые появлялись на экране. Отметьте хотя бы одно
          </Typography>
          {Object.entries(checks).map(([key, value]) => (
            <Grid item xs={12} key={key} alignContent="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value}
                    onChange={(e) => setChecks({...checks, [key]: e.target.checked})}
                    color="primary"
                  />
                }
                label={key.toUpperCase()}
              />
            </Grid>
          ))
          }
          <Grid item xs={12}>
            <Button 
              disabled={JSON.stringify(checks) === JSON.stringify(CHECKS)} 
              variant="contained" 
              color="primary" 
              onClick={() => setSlide(4)}
            >
              Дальше
            </Button>
          </Grid>
        </Grid>
      )
    }

    if (slide === 4) {
      return <>
        {
          imageEffectTrigger ?
          <img src="https://i.imgur.com/dHzYY8O.png" alt="много символов"/> :
          <Grid container>
            <Typography variant="h4" align="center">
              Сейчас вы увидите изображения фигур. У вас есть 10 секунд, чтобы постараться запомнить как можно большее количество фигур
            </Typography>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={() => setImageEffectTrigger(true)}>
                Дальше
              </Button>
            </Grid>
          </Grid>
        }
      </>
    }

    if (slide === 5) {
      return <Grid container>
        <Typography variant="h4" align="center">
          А сейчас среди нарисованных фигур выберите те, которые видели на предыдущей картинке. Выберите хотя бы одну
        </Typography>
        {Object.entries(imageChecks).map(([key, value]) => (
          <Grid item xs={12} key={key} alignContent="center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={value}
                  onChange={(e) => setImageChecks({...imageChecks, [key]: e.target.checked})}
                  color="primary"
                />
              }
              label={<img src={IMAGES[key]} alt="key"/>}
            />
          </Grid>
          ))
        }
        <Grid item xs={12}>
          <Button 
            disabled={JSON.stringify(imageChecks) === JSON.stringify(IMAGE_CHECKS)}
            variant="contained" 
            color="primary" 
            onClick={finish}
          >
            Закончить тест
          </Button>
        </Grid> 
      </Grid>
    }

    if (slide === 6) {
      return <Typography variant="h4" align="center">
        Спасибо! Ваши результаты были сохранены
      </Typography>
    }

    return null;
    
  
}

export default App;
