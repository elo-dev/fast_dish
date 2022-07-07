import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Affix, Divider, Input, Spin, Typography } from 'antd'
import { QuestionOutlined } from '@ant-design/icons'

import { useGetAnswerQuery } from '../../redux/services/chat'

import useDebounce from '../../hooks/useDebounce'

import cn from 'classnames'

import style from './Chat.module.scss'

const { Text } = Typography

const Chat = () => {
  const [question, setQuestion] = useState('')
  const [isOpenChat, setIsOpenChat] = useState(false)
  const chatRef = useRef()

  useEffect(() => {
    if (!isOpenChat) return

    const handleClick = (e) => {
      if (!chatRef.current) return
      if (!chatRef.current.contains(e.target)) {
        setIsOpenChat(false)
      }
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [isOpenChat])

  const debouncedQuestion = useDebounce(question)

  const { data: answer, isFetching } = useGetAnswerQuery(
    {
      question: debouncedQuestion,
    },
    { skip: !debouncedQuestion.length }
  )

  return (
    <>
      <div
        className={cn(style.chat, { [style.chat__open]: isOpenChat })}
        ref={chatRef}
      >
        <div className={cn(style.chat__body, style.body)}>
          <div className={style.body__header}>
            <Text>Assistant</Text>
            <Divider style={{ margin: '10px auto' }} />
          </div>
          <div className={style.body__content}>
            <div className={style.message}>
              <div className={style.message__outer}>
                <div className={style.message__inner}>
                  <div className={style.message__bubble}>
                    {debouncedQuestion}
                  </div>
                  <div className={style.message__spacer}></div>
                </div>
              </div>
            </div>
            {isFetching ? (
              <Spin className={style.loading} />
            ) : (
              <>
                <div className={style.answer}>
                  <div className={style.answer__outer}>
                    <div className={style.answer__inner}>
                      <div className={style.answer__bubble}>
                        {debouncedQuestion ? answer?.answerText : ''}
                      </div>
                      <div className={style.answer__spacer}></div>
                    </div>
                  </div>
                  {answer?.media.map(({ title, image, link }) => (
                    <div className={style.answer__outer}>
                      <div className={style.answer__inner}>
                        <div className={style.answer__media}>
                          <Link
                            onClick={() => setIsOpenChat(false)}
                            to={`/recipe/${link
                              .split('-')
                              .slice(-1)
                              .toString()}`}
                            className={style.answer__link}
                          >
                            <img
                              className={style.media}
                              src={image}
                              alt={title}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className={style.body__footer}>
            <Input
              className={style.input}
              placeholder="Ask a question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Affix offsetBottom={40} style={{ position: 'fixed', right: 40 }}>
        <div
          className={style.btn_wrapper}
          onClick={() => setIsOpenChat((open) => !open)}
        >
          <QuestionOutlined className={style.btn_icon} />
        </div>
      </Affix>
    </>
  )
}

export default Chat
