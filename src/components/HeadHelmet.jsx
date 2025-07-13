import {Helmet} from 'react-helmet'

const HeadHelmet = ({title, desc}) => {
  return (
    <Helmet>
      <title>QufLearn | {title}</title>
      <meta name='description' content={desc}/>
    </Helmet>
  )
}

export default HeadHelmet
