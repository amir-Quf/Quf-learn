import { Container, Row, Col, Card } from "react-bootstrap";
import MyNavbar from "../../components/nav/Nav";
import "./About.css";
import missionsImg from "../../assets/images/bg2.jpeg";
import fetchApi from "../../store/server";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import PageWrapper from "../../components/pageWrapper";
import HeadHelmet from "../../components/HeadHelmet";

const features = [
    {
        title: "Real Projects",
        desc: "Learn by doing with real-world coding challenges.",
        icon: "🛠️",
    },
  {
      title: "Expert Instructors",
      desc: "Courses by experienced engineers and mentors.",
      icon: "👨‍🏫",
    },
    {
        title: "Flexible Learning",
        desc: "Study anytime, anywhere, at your self-education own pace.",
        icon: "📱",
    },
];

const About = () => {
    const [users, setUsers]= useState([])
    useEffect(() => {
        fetchApi.get('/users')
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => console.log(err))
    },[])
    const admins = useCallback(users.filter(user => user.role == 'admin'),[users])
    return (
    <PageWrapper>
      <HeadHelmet title='about' desc='about QufLearn platform'/>
      <MyNavbar />

        <Container className="about-section">
        <Container className="about-hero">
          <h1>Welcome to QufLearn</h1>
          <p>
            Empowering learners through practical, project-based tech education.
          </p>
        </Container>
          <Row className="about-hero-container">
            <Col md={6}>
              <h2>🎯 Our Mission</h2>
              <p>
                We aim to make tech education accessible, practical, and
                results-driven. At QufLearn, we focus on building your portfolio
                with real-world apps so you're job-ready from day one.
              </p>
            </Col>
            <Col md={6}>
              <img loading="lazy" src={missionsImg} alt="Our Mission" className="img-fluid" />
            </Col>
          </Row>
        </Container>

        <Container className="about-section">
          <h2 className="text-center mb-4">✨ Key Features</h2>
          <Row>
            {features.map((item, index) => (
              <Col md={4} key={index}>
                <Card className="about-feature-card">
                  <Card.Body>
                    <h3>
                      {item.icon} {item.title}
                    </h3>
                    <p>{item.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        <Container className="about-section">
          <h2 className="text-center mb-4">👨‍💻 Meet The Team</h2>
          <Row>
            {admins.length ? admins.map((person) => (
              <Col md={4} key={person.id} className="text-center">
                <img
                loading="lazy"
                  src={person.img}
                  alt={person.username}
                  className="about-team-img"
                />
                <h4>{person.username}</h4>
                <p>{person.desc}</p>
              </Col>
            )): ''}
          </Row>
        </Container>

        <Container className="about-section stats-section">
          <Row className="text-center">
            <Col md={3}>
              <h2>50+</h2>
              <p>Courses</p>
            </Col>
            <Col md={3}>
              <h2>10k+</h2>
              <p>Students</p>
            </Col>
            <Col md={3}>
              <h2>2k+</h2>
              <p>Reviews</p>
            </Col>
            <Col md={3}>
              <h2>4.9⭐</h2>
              <p>Avg. Rating</p>
            </Col>
          </Row>
        </Container>

        <Container className="about-section text-center">
          <h2>📩 Get In Touch</h2>
          <p>
            If you’d like to collaborate, partner, or have questions, contact us
            at <b>support@quflearn.com</b>
          </p>
        </Container>
    </PageWrapper>
  );
};

export default memo(About);
