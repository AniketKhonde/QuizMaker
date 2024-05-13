import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Modal, Fade, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const MyQuizes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    useEffect(() => {
        const storedQuizzes = JSON.parse(localStorage.getItem('quizzes'));
        if (storedQuizzes) {
            setQuizzes(storedQuizzes);
        }
    }, []);

    const handleDeleteQuiz = (index) => {
        setDeleteIndex(index);
        setDeleteConfirmationOpen(true);
    };

    const toggleQuizStatus = (index) => {
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[index].isActive = !updatedQuizzes[index].isActive;
        setQuizzes(updatedQuizzes);
        localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    };

    const handleEditQuiz = (index) => {
        setEditIndex(index);
        setEditedTitle(quizzes[index].title);
        setEditedDescription(quizzes[index].description);
        setEditModalOpen(true);
    };

    const saveEditedQuiz = () => {
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[editIndex].title = editedTitle;
        updatedQuizzes[editIndex].description = editedDescription;
        setQuizzes(updatedQuizzes);
        localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
        setEditModalOpen(false);
    };

    const confirmDeleteQuiz = () => {
        const updatedQuizzes = [...quizzes];
        updatedQuizzes.splice(deleteIndex, 1);
        setQuizzes(updatedQuizzes);
        localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
        setDeleteConfirmationOpen(false);
    };

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
                        <Typography variant="body1" sx={{ color: '#76ff03', marginTop: '8px', fontSize: '25px' }}>QuizMaker</Typography>
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

            {quizzes.length === 0 ? (
                <Typography variant="h5" align="center" mt={4}>No quizzes available</Typography>
            ) : (
                <TableContainer sx={{ marginLeft: { xs: '1px', md: '130px' }, marginTop: { xs: '40px', md: '100px' }, width: { xs: '98%', md: '80%' }, boxShadow: 5 }}>
                    <Table sx={{ minWidth: { xs: '100px', md: '650px' } }} aria-label="quiz table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Quiz No.</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Created On</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {quizzes.map((quiz, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{quiz.title}</TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body1" component="span" sx={{ mr: 0 }}>
                                            {quiz.isActive ? "Active" : "Inactive"}
                                        </Typography>
                                        <Switch
                                            checked={quiz.isActive}
                                            onChange={() => toggleQuizStatus(index)}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'toggle quiz status' }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">{quiz.createdOn}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => handleDeleteQuiz(index)} variant="outlined" color="secondary" sx={{ marginRight: { xs: '0px', md: '10px' } }}>
                                            <img src="./delete.gif" alt="Delete" style={{ width: '30px', height: '30px' }} />
                                        </Button>

                                        <Button onClick={() => handleEditQuiz(index)} variant="outlined" color="secondary">
                                            <img src="./edit.gif" alt="Edit" style={{ width: '30px', height: '30px' }} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Modal
                open={deleteConfirmationOpen}
                onClose={() => setDeleteConfirmationOpen(false)}
                aria-labelledby="delete-quiz-modal"
                aria-describedby="delete-quiz-modal-description"
            >
                <Fade in={deleteConfirmationOpen}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '200px', md: '400px' }, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                        <Typography variant="h6" id="delete-quiz-modal" sx={{ mb: 2 }}>
                            Are you sure you want to delete this quiz?
                        </Typography>
                        <Button onClick={confirmDeleteQuiz} variant="contained" color="primary" sx={{ mr: 2 }}>Yes</Button>
                        <Button onClick={() => setDeleteConfirmationOpen(false)} variant="contained" color="secondary">No</Button>
                    </Box>
                </Fade>
            </Modal>

            <Modal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                aria-labelledby="edit-quiz-modal"
                aria-describedby="edit-quiz-modal-description"
            >
                <Fade in={editModalOpen}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '200px', md: '400px' }, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                        <Typography variant="h6" id="edit-quiz-modal" sx={{ mb: 2 }}>
                            Edit Quiz
                        </Typography>
                        <TextField
                            label="Title"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Description"
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            multiline
                            fullWidth
                            rows={4}
                            sx={{ mb: 2 }}
                        />
                        <Button onClick={saveEditedQuiz} variant="contained" color="primary">Save</Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default MyQuizes;
