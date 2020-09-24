import React from "react";
import { useParams } from "react-router-dom";
import CategoryAddEdit from "../components/CategoryAddEdit";
import PageWrapper from '../layots/PageWrapper';

function CategoryEdit() {
  const { id } = useParams();
  return (
    <PageWrapper>
      <h2>Edit category</h2>
      <CategoryAddEdit id={id}/>
    </PageWrapper>
  )
};

export default CategoryEdit;