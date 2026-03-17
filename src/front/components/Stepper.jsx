import React, { Children, useState } from "react";
import "./Stepper.css";

export default function Stepper({
	children,
	initialStep = 1,
	onStepChange = () => {},
	onFinalStepCompleted = () => {},
	stepCircleContainerClassName = "",
	stepContainerClassName = "",
	contentClassName = "",
	footerClassName = "",
	backButtonProps = {},
	nextButtonProps = {},
	backButtonText = "Back",
	nextButtonText = "Continue",
	disableStepIndicators = false,
	renderStepIndicator,
	...rest
}) {
	const [currentStep, setCurrentStep] = useState(initialStep);
	const stepsArray = Children.toArray(children);
	const totalSteps = stepsArray.length;
	const isCompleted = currentStep > totalSteps;
	const isLastStep = currentStep === totalSteps;

	const updateStep = (newStep) => {
		setCurrentStep(newStep);
		if (newStep > totalSteps) {
			onFinalStepCompleted();
		} else {
			onStepChange(newStep);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) updateStep(currentStep - 1);
	};

	const handleNext = () => {
		if (!isLastStep) updateStep(currentStep + 1);
	};

	const handleComplete = () => {
		updateStep(totalSteps + 1);
	};

	return (
		<div className="outer-container" {...rest}>
			<div className={`step-circle-container ${stepCircleContainerClassName}`}>
				<div className={`step-indicator-row ${stepContainerClassName}`}>
					{stepsArray.map((_, index) => {
						const stepNumber = index + 1;
						const isNotLastStep = index < totalSteps - 1;
						return (
							<React.Fragment key={stepNumber}>
								{renderStepIndicator ? (
									renderStepIndicator({
										step: stepNumber,
										currentStep,
										onStepClick: (clicked) => updateStep(clicked)
									})
								) : (
									<StepIndicator
										step={stepNumber}
										disableStepIndicators={disableStepIndicators}
										currentStep={currentStep}
										onClickStep={(clicked) => updateStep(clicked)}
									/>
								)}
								{isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
							</React.Fragment>
						);
					})}
				</div>

				{!isCompleted && (
					<div className={`step-content-default ${contentClassName}`}>
						<div key={currentStep} className="step-content-animate">
							{stepsArray[currentStep - 1]}
						</div>
					</div>
				)}

				{!isCompleted && (
					<div className={`footer-container ${footerClassName}`}>
						<div className={`footer-nav ${currentStep !== 1 ? "spread" : "end"}`}>
							{currentStep !== 1 && (
								<button
									onClick={handleBack}
									className={`back-button ${currentStep === 1 ? "inactive" : ""}`}
									{...backButtonProps}
								>
									{backButtonText}
								</button>
							)}
							<button
								onClick={isLastStep ? handleComplete : handleNext}
								className="next-button"
								{...nextButtonProps}
							>
								{isLastStep ? "Complete" : nextButtonText}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export function Step({ children }) {
	return <div className="step-default">{children}</div>;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }) {
	const status = currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

	const handleClick = () => {
		if (step !== currentStep && !disableStepIndicators) onClickStep(step);
	};

	return (
		<div onClick={handleClick} className="step-indicator">
			<div className={`step-indicator-inner ${status}`}>
				{status === "complete" ? (
					<CheckIcon className="check-icon" />
				) : status === "active" ? (
					<div className="active-dot" />
				) : (
					<span className="step-number">{step}</span>
				)}
			</div>
		</div>
	);
}

function StepConnector({ isComplete }) {
	return (
		<div className="step-connector">
			<div className={`step-connector-inner ${isComplete ? "complete" : "incomplete"}`} />
		</div>
	);
}

function CheckIcon(props) {
	return (
		<svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
		</svg>
	);
}
