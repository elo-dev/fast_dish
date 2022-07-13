import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Affix, Divider, Input, Spin, Typography } from 'antd'
import { QuestionOutlined } from '@ant-design/icons'

import { useGetAnswerQuery } from '../../redux/services/chat'

import useDebounce from '../../hooks/useDebounce'
import useOutsideClick from '../../hooks/useOutsideClick'

import cn from 'classnames'

import style from './Chat.module.scss'

const { Text } = Typography

const Chat = () => {
  const [question, setQuestion] = useState('')
  const [isOpenChat, setIsOpenChat] = useState(false)
  const chatRef = useRef()

  useOutsideClick(chatRef, setIsOpenChat, isOpenChat)

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
                {debouncedQuestion ? (
                  <div className={style.answer}>
                    <div className={style.answer__outer}>
                      <div className={style.answer__inner}>
                        <div className={style.answer__bubble}>
                          {debouncedQuestion ? answer?.answerText : ''}
                        </div>
                        <div className={style.answer__spacer}></div>
                      </div>
                    </div>
                    {answer?.media.map(({ title, image, link }, index) => (
                      <div className={style.answer__outer} key={index}>
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
                ) : (
                  <Text className={style.empty}>
                    Ask the bot:
                    <span className={style.empty__question}>
                      Tell me a fact about food
                    </span>
                  </Text>
                )}
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
