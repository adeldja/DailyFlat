// MealDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/Blog/MealDetails.css'; 

const MealDetails = () => {
  const [mealDetails, setMealDetails] = useState(null);
  const { idMeal } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
          setMealDetails(data.meals[0]);
        } else {
          console.error(`Meal with ID "${idMeal}" not found`);
          setMealDetails(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [idMeal]);

  if (!mealDetails) {
    return <div>Meal not found</div>;
  }

  const {
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strYoutube,
    ...ingredients
  } = mealDetails;

  const ingredientsArray = Object.entries(ingredients)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => ({ ingredient: value, measure: ingredients[`strMeasure${key.slice(13)}`] }));

  // Configuration du slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="meal-details-page">
      <h1>{strMeal}</h1>
      <img src={strMealThumb} alt={strMeal} />
      <p>Category: {strCategory}</p>
      <p>Area: {strArea}</p>
      <h2 >Instructions</h2>
      <p style={{ textAlign: 'justify' }}>{strInstructions}</p>

      <h2 >Ingredients</h2>
      <Slider {...sliderSettings} className="container">
        {ingredientsArray.map((ingredient, index) => (
          <div key={index} className="ingredient-item">
            <img
              src={`https://www.themealdb.com/images/ingredients/${ingredient.ingredient}-Small.png`}
              alt={ingredient.ingredient}
              
            />
            <p>{ingredient.measure} {ingredient.ingredient}</p>
          </div>
        ))}
      </Slider>

      {strYoutube && (
        <div>
          <h2>Watch on YouTube:</h2>
          <iframe
            title={strMeal}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${strYoutube.slice(-11)}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MealDetails;
