// MealSearchDoubleRowPagination.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/Blog/MealSearchPagination.css';
import logo from '../../assets/bonApp.png';

const MealSearchPagination = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const mealsPerPage = 8; // 2 rangées de 4

    useEffect(() => {
        const handleSearch = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
                const data = await response.json();

                // Vérifiez si des repas ont été trouvés
                if (data.meals) {
                    setSearchResults(data.meals); // Afficher tous les résultats
                } else {
                    console.error(`No meals found for the name "${searchTerm}"`);
                    setSearchResults([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Effect déclenché à chaque modification de searchTerm
        handleSearch();
    }, [searchTerm]);

    const indexOfLastMeal = currentPage * mealsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
    const currentMeals = searchResults.slice(indexOfFirstMeal, indexOfLastMeal);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h1>Une idée de repas ?</h1>
            <div>
                <label htmlFor="searchTerm">Viens cherché ton bonheur :</label>
                <input
                    type="text"
                    id="searchTerm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {currentMeals.length > 0 && (
                <div className="meal-cards">
                    {Array.from({ length: Math.ceil(currentMeals.length / 4) }, (_, index) => (
                        <div key={index} className="meal-row">
                            {currentMeals.slice(index * 4, (index + 1) * 4).map((meal) => (
                                <Link key={meal.idMeal} to={`/meal/${meal.idMeal}`} className="meal-card">
                                <img src={meal.strMealThumb ? meal.strMealThumb : logo} alt={logo} />
                                <h3>{meal.strMeal}</h3>
                            </Link>
                            
                            ))}
                        </div>
                    ))}
                </div>
            )}

            <div className="pagination">
                {Array.from({ length: Math.ceil(searchResults.length / mealsPerPage) }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MealSearchPagination;
