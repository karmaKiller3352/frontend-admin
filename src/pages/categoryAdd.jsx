import React from "react";
import CategoryAddEdit from "../components/CategoryAddEdit";
import PageWrapper from '../layots/PageWrapper';

function CategoryAdd() {
  return (
    <PageWrapper>
      <h2>Edit category</h2>
      <CategoryAddEdit/>
    </PageWrapper>
  )
};

export default CategoryAdd;