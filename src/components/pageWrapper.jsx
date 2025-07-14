import {motion} from 'motion/react'
import { memo } from 'react'

const PageWrapper = ({children}) => {
    const pageVariants = {
        initial : { x : 200},
        animate : { x : 0},
        exit : { x: -200}
    }
  return (
    <motion.div variants={pageVariants} initial='initial' animate='animate' exit='exit' transition={{duration: 0.25, type: 'tween'}}>
      {children}
    </motion.div>
  )
}

export default memo(PageWrapper)
