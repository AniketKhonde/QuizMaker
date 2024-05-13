import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Modal, Fade, Button, TextField, Checkbox } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

function CreateQuiz() {
    const [open, setOpen] = useState(true);
    const [quizzes, setQuizzes] = useState([]);
    const [titleText, setTitleText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: ['', ''], correctAnswer: 0 }]);
    const [status, setStatus] = useState('Active'); // Default status is Active

    useEffect(() => {
        const storedQuizzes = JSON.parse(localStorage.getItem('quizzes'));
        if (storedQuizzes) {
            setQuizzes(storedQuizzes);
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddOption = (index) => {
        if (questions[index].options.length < 4) {
            const updatedQuestions = [...questions];
            updatedQuestions[index].options.push('');
            setQuestions(updatedQuestions);
        }
    };

    const handleRemoveOption = (questionIndex, optionIndex) => {
        if (questions[questionIndex].options.length > 2) {
            const updatedQuestions = [...questions];
            updatedQuestions[questionIndex].options.splice(optionIndex, 1);
            setQuestions(updatedQuestions);
        }
    };

    const handleQuestionChange = (index, e) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = e.target.value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, e) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
        setQuestions(updatedQuestions);
    };

    const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].correctAnswer = optionIndex;
        setQuestions(updatedQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', ''], correctAnswer: 0 }]);
    };

    const handleRemoveQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = () => {
        if (titleText.length < 10 || titleText.length > 30) {
            alert('Title should be between 10 and 30 characters.');
            return;
        }
        if (questions.some(question => question.question.length < 10 || question.question.length > 200)) {
            alert('Question length should be between 10 and 200 characters.');
            return;
        }
        if (titleText.trim() === '' || questions.some(question => question.question.trim() === '')) {
            alert('Title and questions cannot be empty.');
            return;
        }
        const quiz = {
            title: titleText,
            description: descriptionText,
            questions: questions,
            status: status, // Adding status field
            createdOn: new Date().toLocaleString() // Adding current date and time
        };
        const updatedQuizzes = [...quizzes, quiz];
        setQuizzes(updatedQuizzes);
        localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
        setTitleText('');
        setDescriptionText('');
        setQuestions([{ question: '', options: ['', ''], correctAnswer: 0 }]);
        setStatus('Active'); // Resetting status to default after submission
    };

    return (
        <>
            {/* this is navbar  */}
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
                        <Typography variant="h6" component={RouterLink} to="/MyQuizes" sx={{ textDecoration: 'none', color: location.pathname === '/MyQuizes' ? 'blue' : 'black', marginRight: { xs: '15px', md: '20px' }, fontSize: { xs: '13px', md: '21px' } }}>
                            My Quizzes
                        </Typography>
                        <Typography variant="h6" component={RouterLink} to="/CreateQuiz" sx={{ textDecoration: 'none', color: location.pathname === '/CreateQuiz' ? 'blue' : 'black', marginRight: { xs: '15px', md: '20px' }, fontSize: { xs: '13px', md: '21px' } }}>
                            Create Quiz
                        </Typography>
                        <Typography variant="h6" component={RouterLink} to="/PlayQuize" sx={{ textDecoration: 'none', color: location.pathname === '/PlayQuize' ? 'blue' : 'black', marginRight: { xs: '5px', md: '20px' }, fontSize: { xs: '13px', md: '21px' } }}>
                            Play Quiz
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content create quiz */}
            <Box sx={{ padding: { md: '20px' }}}>
                <Box sx={{ marginTop: {xs:'4vh',md:'14vh'}, display: 'flex', flexDirection: 'column' }} minHeight={'400px'} width={{ xs: '95vw', md: '65.2vw' }} marginLeft={{ xs: '0vw', md: '13vw' }}>
                    <Typography variant="h4" gutterBottom sx={{ marginBottom: '10px' }} fontSize={{ xs: '20px', md: '30px' }}>Create New Quiz</Typography>
                    <Box sx={{ border: '1px solid black', minHeight: '300px', boxShadow: '3', marginTop: '10px' }} width={{ xs: '95vw', md: '65.2vw' }}>
                        <TextField
                            id="title"
                            label="Enter the Quiz Title"
                            value={titleText}
                            onChange={(e) => setTitleText(e.target.value)}
                            sx={{ width: { xs: '85vw', md: '58vw' }, marginTop: '40px', marginLeft: '2.7vw' }}
                        />
                        <Typography sx={{ marginLeft: { xs: '13px', md: '40px' }, fontSize: { xs: '9px', md: '12px' } }}>Title should be minimum of 10 characters and maximum of 30 characters</Typography>

                        <TextField
                            id="description"
                            label="Description"
                            multiline
                            rows={4}
                            value={descriptionText}
                            onChange={(e) => setDescriptionText(e.target.value)}
                            sx={{ width: { xs: '85vw', md: '58vw' }, height: { xs: '60px', md: '90px' }, marginLeft: '2.7vw', marginTop: '4vh' }}
                        />
                    </Box>

                    {questions.map((question, questionIndex) => (
                        <>
                            <Box key={questionIndex} sx={{ width: { xs: '95vw', md: '65.2vw' }, minHeight: '300px', boxShadow: '3', marginTop: '10px' }}>
                                <TextField
                                    id={`question-${questionIndex}`}
                                    label={`Question ${questionIndex + 1}`}
                                    value={question.question}
                                    onChange={(e) => handleQuestionChange(questionIndex, e)}
                                    sx={{ width: { xs: '85vw', md: '58vw' }, marginTop: '40px', marginLeft: '2.7vw' }}
                                />
                                <Typography sx={{ marginLeft: { xs: '13px', md: '40px' }, fontSize: { xs: '9px', md: '12px' } }}>Question length should be minimum of 10 characters and maximum of 200 characters</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {question.options.map((option, optionIndex) => (
                                        <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <TextField
                                                id={`option-${questionIndex}-${optionIndex}`}
                                                label={`Option ${optionIndex + 1}`}
                                                value={option}
                                                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                                                sx={{ marginTop: '40px', marginLeft: '2.7vw', width: { xs: '140px', md: "290px" } }}
                                            />
                                            <Checkbox
                                                checked={question.correctAnswer === optionIndex}
                                                onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                                                sx={{ marginTop: '40px' }}
                                            />
                                            <Typography sx={{ marginTop: '40px' }}>ANS</Typography>

                                            {optionIndex > 1 && (
                                                <Button
                                                    size="small"
                                                    onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                                                    sx={{ marginTop: '40px', padding: '5px', marginLeft: '10px', border: '2px solid black', '&:hover': { backgroundColor: '#448aff', color: 'white' } }}
                                                >
                                                    delete
                                                </Button>
                                            )}
                                            {optionIndex === question.options.length - 1 && question.options.length < 4 && (
                                                <Button
                                                    size="small"
                                                    onClick={() => handleAddOption(questionIndex)}
                                                    sx={{ marginTop: '40px', fontSize: { xs: '10px', md: '13px' }, padding: '5px', marginLeft: '1.2vw', border: '2px solid black', '&:hover': { backgroundColor: '#448aff', color: 'white', } }}
                                                >
                                                    add option
                                                </Button>
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                                <Button
                                    size="small"
                                    onClick={() => handleRemoveQuestion(questionIndex)}
                                    sx={{ marginTop: '40px', padding: '5px', marginBottom: '50px', marginLeft: { xs: '90px', md: '40px' }, border: '2px solid black', '&:hover': { backgroundColor: '#448aff', color: 'white' } }}
                                >
                                    Remove Question
                                </Button>
                            </Box>
                        </>
                    ))}
                    <Button
                        size="small"
                        onClick={handleAddQuestion}
                        sx={{ marginTop: '40px', marginLeft: '24vw', width: { xs: '44vw', md: '12vw' }, padding: '5px', marginBottom: '40px', border: '2px solid black', '&:hover': { backgroundColor: '#448aff', color: 'white' } }}
                    >
                        Add Question
                    </Button>

                    <Button
                        size="small"
                        onClick={handleSubmit}
                        sx={{ width: { xs: '100px', md: '200px' }, marginLeft: { xs: '65vw', md: '53vw' }, padding: '5px', marginTop: '30px', marginBottom: '30px', backgroundColor: '#aeea00', border: '2px solid black', '&:hover': { backgroundColor: '#448aff', color: 'white' } }}
                    >
                        Save Quiz
                    </Button>

                </Box>
            </Box>
        </>
    );
}

export default CreateQuiz;
