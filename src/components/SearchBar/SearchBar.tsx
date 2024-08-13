import css from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import toast from "react-hot-toast";

type SearchBarProps = {
  onSubmit: (query: string) => void;
};

type FormValues = {
  query: string;
};

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const initialValues: FormValues = { query: "" };

  const handleSubmit = (values: FormValues, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }) => {
    if (values.query.trim() === "") {
      toast.error("Please enter a search query");
      setSubmitting(false);
      return;
    }
    onSubmit(values.query);
    setSubmitting(false);
    resetForm();
  };

  return (
    <header className={css.header}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className={css.searchForm}>
            <button
              className={css.searchButton}
              type="submit"
              disabled={isSubmitting}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <Field
              className={css.searchInput}
              type="text"
              name="query"
              placeholder="Search images and photos"
              autoComplete="off"
            />
            <FormikErrorMessage name="query" component="div" />
          </Form>
        )}
      </Formik>
    </header>
  );
}
