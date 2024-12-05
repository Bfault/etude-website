// src/PDFSelector.jsx
import React, { useState, useEffect } from 'react';
import PdfViewer from './PdfViewer';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    Drawer,
} from '@mui/material';
import { InsertDriveFile, Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const PDFSelector = () => {
    const [structure, setStructure] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Bfault/etude/gh-pages/static/structure.json')
            .then((response) => response.json())
            .then((data) => setStructure(data))
            .catch((error) => console.error('Erreur lors du chargement de structure.json:', error));
    }, []);

    const handleYearChange = (event) => {
        const yearName = event.target.value;
        const year = structure.find((item) => item.name === yearName);
        setSelectedYear(year);
        setSelectedSubject('');
        setSelectedFile('');
    };

    const handleSubjectChange = (event) => {
        const subjectName = event.target.value;
        const subject = selectedYear.children.find((item) => item.name === subjectName);
        setSelectedSubject(subject);
        setSelectedFile('');
    };

    const handleFileChange = (event) => {
        const fileName = event.target.value;
        const file = selectedSubject.children.find((item) => item.name === fileName);
        setSelectedFile(file);
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const renderSelects = (
        <>
            {/* Sélecteur pour l'année */}
            <FormControl variant="outlined" sx={{ minWidth: 120, mr: 2, mb: isMobile ? 2 : 0 }} size="small">
                <InputLabel 
                    id="year-label" 
                    sx={{ color: '#FFFFFF', '&.Mui-focused': { color: '#FFFFFF' } }}
                >
                    Année
                </InputLabel>
                <Select
                    labelId="year-label"
                    value={selectedYear.name || ''}
                    onChange={handleYearChange}
                    label="Année"
                    sx={{
                        color: '#FFFFFF',
                        '& .MuiSelect-icon': { color: '#FFFFFF' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FFFFFF' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FFFFFF' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FFFFFF' },
                    }}
                >
                    <MenuItem value="">
                        <em>Toutes</em>
                    </MenuItem>
                    {structure.map((year) => (
                        <MenuItem key={year.name} value={year.name}>
                            {year.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Sélecteur pour la matière */}
            {selectedYear && (
                <FormControl variant="outlined" sx={{ minWidth: 150, mr: 2, mb: isMobile ? 2 : 0 }} size="small">
                    <InputLabel 
                        id="subject-label" 
                        sx={{ color: '#FFFFFF', '&.Mui-focused': { color: '#FFFFFF' } }}
                    >
                        Matière
                    </InputLabel>
                    <Select
                        labelId="subject-label"
                        value={selectedSubject.name || ''}
                        onChange={handleSubjectChange}
                        label="Matière"
                        sx={{
                            color: '#FFFFFF',
                            '& .MuiSelect-icon': { color: '#FFFFFF' },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FFFFFF' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FFFFFF' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FFFFFF' },
                        }}
                    >
                        <MenuItem value="">
                            <em>Toutes</em>
                        </MenuItem>
                        {selectedYear.children.map((subject) => (
                            <MenuItem key={subject.name} value={subject.name}>
                                {subject.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {/* Sélecteur pour le fichier */}
            {selectedSubject && (
                <FormControl variant="outlined" sx={{ minWidth: 150, mb: isMobile ? 2 : 0 }} size="small">
                    <InputLabel 
                        id="file-label" 
                        sx={{ color: '#FFFFFF', '&.Mui-focused': { color: '#FFFFFF' } }}
                    >
                        Fichier
                    </InputLabel>
                    <Select
                        labelId="file-label"
                        value={selectedFile.name || ''}
                        onChange={handleFileChange}
                        label="Fichier"
                        sx={{
                            color: '#FFFFFF',
                            '& .MuiSelect-icon': { color: '#FFFFFF' },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FFFFFF' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FFFFFF' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FFFFFF' },
                        }}
                    >
                        <MenuItem value="">
                            <em>Tous</em>
                        </MenuItem>
                        {selectedSubject.children.map((file) => (
                            <MenuItem key={file.name} value={file.name}>
                                {file.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <AppBar position="static" sx={{ backgroundColor: '#3e3e3e' }}> {/* Couleur gris foncé */}
                <Toolbar>
                    <InsertDriveFile sx={{ mr: 2 }} /> {/* Ajout de l'icône */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#FFFFFF' }}>
                        Visualiseur de PDF
                    </Typography>

                    {isMobile ? (
                        <>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="right"
                                open={drawerOpen}
                                onClose={toggleDrawer(false)}
                            >
                                <Box
                                    sx={{ 
                                        width: 250, 
                                        p: 2,
                                        height: '100%',
                                        bgcolor: '#3e3e3e' // Match AppBar color
                                    }}
                                    role="presentation"
                                >
                                    <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF' }}>
                                        Filtres
                                    </Typography>
                                    {renderSelects}
                                </Box>
                            </Drawer>
                        </>
                    ) : (
                        renderSelects
                    )}
                </Toolbar>
            </AppBar>

            {/* Section principale pour le PDF */}
            <Box sx={{ 
                flexGrow: 1, 
                overflow: 'hidden', // Changed from 'auto'
                height: 'calc(100vh - 64px)', // Full height minus AppBar
                bgcolor: '#f5f5f5'
            }}>
                {selectedFile ? (
                    <PdfViewer
                        pdfUrl={`https://raw.githubusercontent.com/Bfault/etude/gh-pages${selectedFile.path}`}
                    />
                ) : (
                    <Box mt={4} textAlign="center">
                        <Typography variant="h6">
                            Veuillez sélectionner un fichier à visualiser.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default PDFSelector;