import { Avatar, Flex } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Message } from '../types/custom'

const Chat = ({ content, role }: Message) => {
  const [chatMessage, setChatMessage] = useState('') // 現在表示されているメッセージを保持
  const [currentIndex, setCurrentIndex] = useState(0) // 次に表示する文字のインデックスを保持

  useEffect(() => {
    if (currentIndex < content.length) {
      // メッセージを1文字ずつ表示する。アシスタントのメッセージのみで使用
      const timeoutId = setTimeout(() => {
        // メッセージの次の文字を追加し、chatStringIndexを更新
        setChatMessage((prevText) => prevText + content[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, 80)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [content, currentIndex])

  return (
    <motion.div
      style={{
        alignSelf: role === 'assistant' ? 'flex-start' : 'flex-end',
        width: 'auto',
      }}
      initial={{
        opacity: 0,
        translateY: '100%',
      }}
      animate={{ opacity: 1, translateY: 0, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, translateY: 0 }}
    >
      <Flex
        gap="5px"
        w="full"
        flexDir={role === 'assistant' ? 'row' : 'row-reverse'}
        mt="10"
      >
        <Avatar
          name={role === 'user' ? 'Me' : 'GPT'}
          w="40px"
          h="40px"
          src={
            role === 'assistant'
              ? 'https://emoji-img.s3.ap-northeast-1.amazonaws.com/svg/1f609.svg'
              : 'https://emoji-img.s3.ap-northeast-1.amazonaws.com/svg/1f47c.svg'
          }
        />
        {/* 背景色を黒に変更 */}
        <Flex
          borderWidth={1}
          borderColor="blue.400"
          bg="main-bg"
          p="0.5rem 1rem"
          w="auto"
          mt="16"
          rounded={
            role === 'assistant' ? '0 20px 20px 20px' : '20px 0 20px 20px'
          }
          fontSize={{ base: '8px', md: '18px' }}
          flexDir="column"
          color="black"
        >
          {/* 背景色を黒に変更 */}
          {role === 'assistant' && (
            <Flex
              alignSelf="flex-end"
              fontStyle="italic"
              opacity={0.4}
              fontSize="8px"
              as="small"
              fontWeight={500}
              color="black"
            >
              GPT
            </Flex>
          )}
          {/* 背景色を黒に変更 */}
          {role === 'user' && (
            <Flex
              alignSelf="flex-start"
              fontStyle="italic"
              opacity={0.4}
              fontSize="8px"
              as="small"
              fontWeight={500}
              color="black"
            >
              あなた
            </Flex>
          )}
          {role === 'assistant' ? chatMessage || '' : content || ''}
        </Flex>
      </Flex>
    </motion.div>
  )
}

export default Chat
