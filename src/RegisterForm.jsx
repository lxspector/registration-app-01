import { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = '';

    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      errorMsg = 'Введите корректный email';
    } else if (
      (name === 'password' || name === 'confirmPassword') &&
      value.length < 6
    ) {
      errorMsg = 'Пароль должен быть не менее 6 символов';
    } else if (name === 'confirmPassword' && value !== formData.password) {
      errorMsg = 'Пароли не совпадают';
    }

    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !Object.values(errors).some((error) => error) &&
      formData.email &&
      formData.password &&
      formData.confirmPassword
    ) {
      console.log(formData);
    }
  };

  const isFormValid = () => {
    return (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      Object.values(errors).every((error) => !error)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label>Повторите пароль:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <button type="submit" disabled={!isFormValid()}>
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
