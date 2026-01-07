import React, { useState } from "react";
import styles from "./stepindicator.module.css";
import Navbar from "../Navbar";
import Step1Modal from "./basic";
import Step2Modal from "./step2";
import Step4Modal from "./step4";
import Step3Modal from "./step3";

export default function StepIndicator() {
  const [activeStep, setActiveStep] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
     step1: { gender: "", age: 0 },
      step2: { clothingTypes: "", seasons: [] },
       step3: { size: "", skinTone: "" },
    step4: { budget: "" },
    
  });

  const [completedSteps, setCompletedSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false
  });

  const handleStepClick = (step) => {
    setActiveStep(step);
    setIsModalOpen(true);
  };

  const handleSaveStep1 = (data) => {
    setFormData((prev) => ({
      ...prev,
      step1: data,
    }));
    setCompletedSteps((prev) => ({
      ...prev,
      step1: true,
    }));
    setIsModalOpen(false);
    setActiveStep(null);
  };

    const handleSaveStep2 = (data) => {
    setFormData((prev) => ({ ...prev, step2: data }));
    setCompletedSteps((prev) => ({ ...prev, step2: true }));
    setIsModalOpen(false);
    setActiveStep(null);
  };

  const handleSaveStep4 = (data) => {
    setFormData((prev) => ({ ...prev, step4: data }));
    setCompletedSteps((prev) => ({ ...prev, step4: true }));
    setIsModalOpen(false);
    setActiveStep(null);
  };

  const handleSaveStep3 = (data) => {
    setFormData((prev) => ({ ...prev, step3: data }));
    setCompletedSteps((prev) => ({ ...prev, step3: true }));
    setIsModalOpen(false);
    setActiveStep(null);
  };


  return (
    <div className={styles.stepindicator}>
      <Navbar />
      <h1>Create your own style</h1>

      <div className={styles.step_row}>
        <div className={styles.steps}>

          {/* STEP 1 */}
          <div
            className={`${styles.step_list1} 
              ${completedSteps.step1 ? styles.completed : ""}
              ${activeStep === 1 ? styles.active : ""}
            `}
            onClick={() => handleStepClick(1)}
          >
            <span>1</span>
            <h3>Personalize your style</h3>
            <p>Help us understand your taste</p>
          </div>

          {/* STEP 2 */}
          <div
            className={`${styles.step_list2} 
              ${completedSteps.step2 ? styles.completed : ""}
              ${activeStep === 2 ? styles.active : ""}
            `}
            onClick={() => handleStepClick(2)}
          >
            <span>2</span>
            <h3>Choose preferences</h3>
            <p>Styles you love most</p>
          </div>

          {/* STEP 3 */}
          <div
            className={`${styles.step_list3} 
              ${completedSteps.step3 ? styles.completed : ""}
              ${activeStep === 3 ? styles.active : ""}
            `}
            onClick={() => handleStepClick(3)}
          >
            <span>3</span>
            <h3>Fit & finish</h3>
            <p>Size and appearance</p>
          </div>

          {/* STEP 4 */}
          <div
            className={`${styles.step_list4} 
              ${completedSteps.step4 ? styles.completed : ""}
              ${activeStep === 4 ? styles.active : ""}
            `}
            onClick={() => handleStepClick(4)}
          >
            <span>4</span>
            <h3>Set your budget</h3>
            <p>Affordable fashion picks</p>
          </div>

        </div>

        
      </div>
      <div className={styles.buttonContainer}>
          <button>get my style picks ...</button>
          
        </div>


       {isModalOpen && activeStep === 1 && (
        <Step1Modal
          data={formData.step1} // optional, in case you want to prefill
          onSave={handleSaveStep1}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      
      {isModalOpen && activeStep === 2 && (
        <Step2Modal
          data={formData.step2}
          onSave={handleSaveStep2}
          onClose={() => setIsModalOpen(false)}
        />
      )}

       {isModalOpen && activeStep === 4 && (
        <Step4Modal
          data={formData.step4}
          onSave={handleSaveStep4}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isModalOpen && activeStep === 3 && (
        <Step3Modal
          data={formData.step3}
          onSave={handleSaveStep3}
          onClose={() => setIsModalOpen(false)}
        />
      )}

    </div>
  );
}
