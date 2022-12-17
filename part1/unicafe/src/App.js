import { useEffect, useState } from 'react'

const Heading = ({value}) => {
  return (
    <h2>
      {value}
    </h2>
  )
}

const Votes = ({clickGood, clickBad, clickNeutral}) => {
  return (
    <div>
      <button onClick={clickGood}>good</button>
      <button onClick={clickNeutral}>neutral</button>
      <button onClick={clickBad}>bad</button>
    </div>
  )
}

const Statistics = ({datas}) => {
  const list = Object.keys(datas).map((k,i) => {
    return (
      <tr key={k}>
        <td>
          {String(Object.keys(datas)[i])}
        </td>
        <td>
          {String(datas[k])} {k === "positive" && "%"}
        </td>
      </tr>
    )
  })
  
  if (datas.all > 0) {
    return (
      <table>
        <tbody>
          {list}
        </tbody>
      </table>
    )
  } else {
    return (
      <p>
        No feedback given
      </p>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [Datas, setDatas] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0
  })

  const calculate = () => {
    const {good, bad, neutral} = Datas
    const all = good + bad + neutral
    const average = parseFloat(((good * 1 + bad * -1) / all).toFixed(1))
    const positive = parseFloat((good * 100 / all).toFixed(1))
    setDatas({...Datas, average, all, positive})
  }

  const clickGood = () => {
    setDatas({...Datas, good: Datas.good + 1})
  }
  
  const clickBad = () => {
    setDatas({...Datas, bad: Datas.bad + 1})
  }

  const clickNeutral = () => {
    setDatas({...Datas, neutral: Datas.neutral + 1})
  }

  const primary = [
    Datas.good,
    Datas.bad,
    Datas.neutral
  ]

  useEffect(() => {
    calculate()
  }, primary)
  
  return (
    <div>
      <Heading value={"give feedback"} />
      <Votes clickGood={clickGood} clickBad={clickBad} clickNeutral={clickNeutral} />
      <Heading value={"statistics"} />
      <Statistics datas={Datas} />
    </div>
  )
}

export default App