const hasNumber = value => {
    return new RegExp(/[0-9]/).test(value);
}

const hasSmallLetters = value => {
    return new RegExp(/[a-z]/).test(value);
}

const hasBigLetters = value => {
    return new RegExp(/[A-Z]/).test(value);
}

const hasSpecial = value => {
    return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
}

export const strengthIndicator = value => {
    let strengths = 0;
    if (value.length > 7)
        strengths++;
    if (hasNumber(value))
        strengths++;
    if (hasSpecial(value))
        strengths++;
    if (hasSmallLetters(value))
        strengths++;
    if (hasBigLetters(value))
        strengths++;
    return strengths;
}

export const strengthColor = count => {
    if (count > 4)
        return 'lightgreen';
    if (count > 2)
        return 'yellow';
    if (count > 0)
        return 'red';
    return 'black';
}

export const strengthPhrase = count => {
    if (count > 4)
        return 'Strong';
    if (count > 2)
        return 'Medium';
    if (count > 0)
        return 'Weak';
    return '';
}