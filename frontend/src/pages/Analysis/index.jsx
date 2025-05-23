import React from "react";
import "./index.less"
import Stat from "./components/Stat"
import Category from "./components/Category"
import CVR from "./components/CVR"

function Analysis() {

  return (
    <div className="analysis-wrap">
      <Stat />
      <Category />
      <CVR />
    </div>
  )
}

export default Analysis;