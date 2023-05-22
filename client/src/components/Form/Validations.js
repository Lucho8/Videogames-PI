
export const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
        case "name":
        if (value.trim() === "") {
            errorMessage = "Name is required.";
        } else {
            const nameRegex = /^[A-Za-z0-9\s]+$/;
            if (!value.match(nameRegex)) {
            errorMessage = "Name cannot contain special characters.";
            }
        }
        return errorMessage;
        case "description":
        if (value.trim() === "") {
            errorMessage = "Description is required.";
        }
        return errorMessage;
        case "image":
        if (value.trim() === "") {
            errorMessage = "Image URL is required.";
        }
        return errorMessage;
        case "rating":
            if (isNaN(value) || value < 0 || value > 5) {
                errorMessage = "The rating must be a number and it must be between 0 and 5";
                }
        return errorMessage
        case "releaseDate":
        if (value.trim() === "") {
            errorMessage = "Release date is required.";
        } else if (isNaN(Date.parse(value))) {
            errorMessage = "Release date must be a valid date.";
        } else {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!value.match(dateRegex)) {
                errorMessage = "Release date must be in the format 'YYYY-MM-DD'.";
            }
        }
        return errorMessage
        default:
            return errorMessage
    }
    };


export const validateForm = (game,setErrors) => {
    let isValid = true;
    const newErrors = {
        name: "",
        description: "",
        platforms: "",
        image: '',
        releaseDate: '',
        rating: '',
        genres: ""
    };

    // Name validation (no special characters and not empty)
    const nameRegex = /^[A-Za-z0-9\s]+$/;
    if (game.name.trim() === "" || !game.name.match(nameRegex)) {
        isValid = false;
        newErrors.name = game.name.trim() === "" ? "Name is required." : "Name cannot contain special characters.";
    }

    // Description validation (not empty)
    if (game.description.trim() === "") {
        isValid = false;
        newErrors.description = "Description is required.";
    }

    // Platforms validation (at least one selected)
    if (game.platforms.length === 0) {
        isValid = false;
        newErrors.platforms = "At least one platform must be selected.";
    }

    // Image validation (not empty)
    if (game.image.trim() === "") {
        isValid = false;
        newErrors.image = "Image URL is required.";
    }

    // Genres validation (at least one selected)
    if (game.genres.length === 0) {
        isValid = false;
        newErrors.genres = "At least one genre must be selected.";
    }

    // Rating validation (must be between 0 and 5)
    const rating = parseFloat(game.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
    isValid = false;
    newErrors.rating = "The rating must be a number and it must be between 0 and 5";
    }

    // Release date validation (YYYY-MM-DD format)
    if (game.releaseDate.trim() === "") {
        isValid = false;
        newErrors.releaseDate = "Release date is required.";
    } else if (isNaN(Date.parse(game.releaseDate))) {
        isValid = false;
        newErrors.releaseDate = "Release date must be a valid date.";
    } else {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!game.releaseDate.match(dateRegex)) {
            isValid = false;
            newErrors.releaseDate = "Release date must be in the format 'YYYY-MM-DD'.";
        }
    }

    setErrors(newErrors);
    return isValid;
    };