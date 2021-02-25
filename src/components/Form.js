const Form = (props) => {
  const { disabled, values, change, submit, errors } = props;

  const onChange = (e) => {
    const { name, type } = e.target;
    const valueToUse = type === "checkbox" ? "checked" : "value";
    change(name, e.target[valueToUse]);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const newUser = { ...values };
    submit(newUser);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="errors">
        <div>{errors.name}</div>
        <div>{errors.email}</div>
        <div>{errors.password}</div>
        <div>{errors.acceptTerms}</div>
      </div>
      <div className="form-inputs">
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={values.name}
            onChange={onChange}
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            type="text"
            value={values.email}
            onChange={onChange}
          />
        </label>
        <label>
          Password:
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={onChange}
          />
        </label>
        <label>
          Terms of Service:
          <input
            name="acceptTerms"
            type="checkbox"
            checked={values.acceptTerms}
            onChange={onChange}
          />
        </label>
      </div>
      <button disabled={disabled}>submit</button>
    </form>
  );
};

export default Form;
