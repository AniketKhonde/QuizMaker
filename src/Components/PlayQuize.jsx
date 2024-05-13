import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, Box, TextField, AppBar, Toolbar, Alert } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const PlayQuiz = () => {
    const [userName, setUserName] = useState('');
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showResultModal, setShowResultModal] = useState(false);
    const [quizResult, setQuizResult] = useState('');
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [flag, setFlag] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        // Fetch quizzes from local storage or API
        const storedQuizzes = JSON.parse(localStorage.getItem('quizzes'));
        if (storedQuizzes) {
            setQuizzes(storedQuizzes);
        }
    }, []);

    const handleStartQuiz = (quiz) => {
        setSelectedQuiz(quiz);
        setCurrentQuestionIndex(0); // Set current question index to the first question
        // Initialize selectedAnswers array with default values
        const defaultSelectedAnswers = Array(quiz.questions.length).fill(null);
        setSelectedAnswers(defaultSelectedAnswers);
        setFlag(1); // Set flag to indicate the quiz has started
    };

    const handleOptionChange = (e, questionIndex, optionIndex) => {
        setSelectedAnswers(prevSelectedAnswers => {
            const newSelectedAnswers = [...prevSelectedAnswers];
            newSelectedAnswers[questionIndex] = optionIndex;
            return newSelectedAnswers;
        });
    };

    const handleSubmitQuiz = () => {
        // Calculate quiz result
        const score = calculateScore(selectedAnswers, selectedQuiz.questions);
        const totalQuestions = selectedQuiz.questions.length;
        const result = `Your score: ${score}/${totalQuestions}`;
        setQuizResult(result);
        setShowResultModal(true);
    };

    const calculateScore = (selectedAnswers, questions) => {
        let score = 0;
        questions.forEach((question, index) => {
            const selectedOption = selectedAnswers[index];
            const correctOption = question.correctAnswer;
            if (selectedOption === correctOption) {
                score++;
            }
        });
        return score;
    };

    const handleNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleStartClick = () => {
        if (userName.length < 5 || userName.length > 50) {
            alert("username should be grater than 5 and liss than 50");
        }
        else {
            setFlag(1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    const activeQuizzes = quizzes.filter(quiz => quiz.isActive);

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.3)' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box
                        sx={{
                            height: { md: '40px' },
                            width: { md: '150px' },
                            display: {xs:'none',md:'flex'},
                            gap: "0px",
                            alignItems: 'center',
                        }}
                    >
                        <img src="/logo.gif" alt="Logo" style={{ marginRight: '0px', width: '60px', height: '60px', }} />
                        <Typography variant="body1" fontWeight="bold" sx={{ color: '#76ff03', marginTop: '8px', fontSize: '25px' }}>QuizMaker</Typography>
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                        <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: location.pathname === '/' ? 'blue' : 'black', marginRight: { xs: '15px', md: '20px' }, fontSize: { xs: '13px', md: '21px' } }}>
                            Home
                        </Typography>
                        <Typography variant="h6" component={RouterLink} to="/MyQuizes" sx={{ textDecoration: 'none', color: location.pathname === '/MyQuizzes' ? 'blue' : 'black', marginRight: { xs: '15px', md: '20px' }, fontSize: { xs: '13px', md: '21px' } }}>
                            My Quizzes
                        </Typography>
                        <Typography variant="h6" component={RouterLink} to="/CreateQuiz" sx={{ textDecoration: 'none', color: location.pathname === '/CreateQuiz' ? 'blue' : 'black', marginRight: { xs: '15px', md: '20px' }, fontSize: { xs: '13px', md: '21px' } }}>
                            Create Quiz
                        </Typography>
                        <Typography variant="h6" component={RouterLink} to="/PlayQuize" sx={{ textDecoration: 'none', color: location.pathname === '/PlayQuize' ? 'blue' : 'black', marginRight: { xs: '5px', md: '10px' }, fontSize: { xs: '13px', md: '21px' } }}>
                            Play Quiz
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            <Typography variant="h2" align="center" mt={10} sx={{ fontSize: { xs: '30px', md: '44px' } }}>Play Quiz</Typography>
            {flag === 0 ? (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h6">Enter your name to continue:</Typography>
                    <TextField
                        value={userName}
                        onChange={handleNameChange}
                        variant="outlined"
                        margin="normal"
                    />
                    <Button onClick={handleStartClick} variant="contained" color="primary">Start</Button>
                </Box>
            ) : (
                <>
                    {activeQuizzes.length === 0 ? (
                        <Box sx={{}}>
                            <Typography variant="h5" align="center" mt={4}>No active quizzes available</Typography>
                            <Button variant="contained" color="primary" component={RouterLink} to='/CreateQuiz' sx={{ marginLeft: {xs:'200px',md:'990px'} }}>Create Quiz</Button>
                            <Box sx={{ display: 'flex', width: {xs:'90%',md:'50%'}, height:{xs:'170px',md:'270px'}, marginLeft: { xs: '10px', md: '400px' }, marginTop: '30px', justifyContent: 'center', alignItems: 'center', boxShadow: 5, borderRadius: '30px' }}>
                                <img src="./no_toshow.gif" alt="" />
                            </Box>
                        </Box>
                    ) : (
                        selectedQuiz ? (
                            <>
                                <Box sx={{ display: "flex", border: '2px solid black', marginTop: '30px', width: { xs: "95%", md: '60%' }, marginLeft: { xs: '5px', md: '280px' }, boxShadow: 5, flexDirection: "column", borderRadius: '20px' }}>
                                    <Box sx={{ marginLeft: '20px' }}>
                                        <Typography variant="h5" sx={{ marginLeft: { xs: '35px', md: '300px' }, fontSize: { xs: '22px', md: '28px' } }}>{selectedQuiz.title}</Typography>
                                        <Box key={currentQuestionIndex} sx={{ marginBottom: '20px' }}>
                                            <Typography variant="h5" sx={{ marginTop: '30px', marginLeft: { xs: '10px', md: '30px' }, fontSize: { xs: '17px', md: '25px' } }}>{selectedQuiz.questions[currentQuestionIndex].question}</Typography>
                                            {selectedQuiz.questions[currentQuestionIndex].options.map((option, optionIndex) => (
                                                <Box key={optionIndex} display="flex" alignItems="center" sx={{ marginLeft: { xs: '10px', md: '30px' }, marginTop: '10px', marginBottom: '6px', fontSize: { xs: '14px', md: '19px' } }}>
                                                    <input
                                                        type="radio"
                                                        id={`option-${optionIndex}`}
                                                        checked={selectedAnswers[currentQuestionIndex] === optionIndex}
                                                        onChange={(e) => handleOptionChange(e, currentQuestionIndex, optionIndex)}
                                                    />
                                                    <label htmlFor={`option-${optionIndex}`}>{option}</label>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                    <Box>
                                        {currentQuestionIndex < selectedQuiz.questions.length - 1 ? (
                                            <Button onClick={handleNextQuestion} variant="contained" color="primary" sx={{ marginBottom: '20px', marginLeft: { xs: '70%', md: '80%' } }}>Next</Button>
                                        ) : (
                                            <Button onClick={handleSubmitQuiz} variant="contained" color="primary" sx={{ marginBottom: '20px', marginLeft: { xs: '70%', md: '80%' } }}>Submit</Button>
                                        )}
                                    </Box>
                                    <Typography variant="h6" sx={{ marginLeft: '30px', marginBottom: '20px' }}>{`${currentQuestionIndex + 1}/${selectedQuiz.questions.length}`}</Typography>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{ marginTop: '50px', border: '2px solid black', width: { xs: '80%', md: '50%' }, marginLeft: { xs: '10px', md: '350px' }, display: 'flex', flexWrap: 'wrap', boxShadow: 5, borderRadius: '20px', alignIt8ms: 'center', padding: '20px' }}>
                                    {activeQuizzes.map((quiz, index) => (
                                        <>
                                            <Box key={index} sx={{ marginTop: '30px', marginLeft: { xs: '5px', md: '30px' }, display: 'flex' }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '20px' }}>
                                                    <Box sx={{
                                                        height: { xs: '100px', md: "200px" },
                                                        width: { xs: '100px', md: "200px" },
                                                        backgroundImage: 'url("/play.jpg")',
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        backgroundRepeat: 'no-repeat',
                                                        borderRadius: '20px',
                                                        marginBottom: '2px',
                                                        boxShadow: 5,
                                                        '&:hover': {
                                                            height: { xs: '110px', md: "210px" },
                                                            width: { xs: '110px', md: "210px" },
                                                            border: "2px solid green",
                                                            boxShadow: 3
                                                        }

                                                    }} onClick={() => handleStartQuiz(quiz)}>
                                                    </Box>
                                                    <Typography variant={{ xs: "h11", md: "h6" }}>{quiz.title}</Typography>
                                                </Box>
                                            </Box>
                                        </>
                                    ))}
                                </Box>
                            </>
                        )
                    )}
                </>
            )}

            <Modal
                open={showResultModal}
                onClose={() => setShowResultModal(false)}
                aria-labelledby="quiz-result-modal"
                aria-describedby="quiz-result-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '200px', md: '400px' }, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '10px' }}>
                    <Typography variant="h6" id="quiz-result-modal">Quiz Result</Typography>
                    <Typography id="quiz-result-modal-description">{quizResult}</Typography>
                    <Button onClick={() => setShowResultModal(false)} variant="contained" color="primary">Close</Button>
                </Box>
            </Modal>
        </>
    );
};

export default PlayQuiz;
