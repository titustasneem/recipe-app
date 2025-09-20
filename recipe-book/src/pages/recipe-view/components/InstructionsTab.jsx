import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InstructionsTab = ({ instructions }) => {
  const [completedSteps, setCompletedSteps] = useState({});
  const [activeTimers, setActiveTimers] = useState({});

  const handleStepComplete = (index, completed) => {
    setCompletedSteps(prev => ({
      ...prev,
      [index]: completed
    }));
  };

  const startTimer = (stepIndex, duration) => {
    const endTime = Date.now() + (duration * 60 * 1000);
    setActiveTimers(prev => ({
      ...prev,
      [stepIndex]: { endTime, duration }
    }));
  };

  const stopTimer = (stepIndex) => {
    setActiveTimers(prev => {
      const newTimers = { ...prev };
      delete newTimers?.[stepIndex];
      return newTimers;
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const TimerComponent = ({ stepIndex, duration }) => {
    const [timeLeft, setTimeLeft] = useState(duration * 60);
    const [isActive, setIsActive] = useState(false);

    React.useEffect(() => {
      let interval = null;
      if (isActive && timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft(timeLeft => timeLeft - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        setIsActive(false);
        // Timer finished - could add notification here
      }
      return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => {
      setIsActive(!isActive);
    };

    const resetTimer = () => {
      setTimeLeft(duration * 60);
      setIsActive(false);
    };

    return (
      <div className="flex items-center space-x-2 mt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTimer}
          iconName={isActive ? "Pause" : "Play"}
          iconPosition="left"
        >
          {isActive ? 'Pause' : 'Start'} Timer
        </Button>
        <span className="font-mono text-sm">
          {formatTime(timeLeft)}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetTimer}
          className="h-8 w-8 p-0"
        >
          <Icon name="RotateCcw" size={14} />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {instructions?.map((step, index) => (
        <div
          key={index}
          className={`p-6 rounded-lg border transition-all duration-200 ${
            completedSteps?.[index] 
              ? 'bg-success/10 border-success/20' :'bg-card border-border'
          }`}
        >
          <div className="flex items-start space-x-4">
            {/* Step Number */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-sm ${
              completedSteps?.[index]
                ? 'bg-success text-success-foreground'
                : 'bg-primary text-primary-foreground'
            }`}>
              {completedSteps?.[index] ? (
                <Icon name="Check" size={16} />
              ) : (
                index + 1
              )}
            </div>

            <div className="flex-1 space-y-4">
              {/* Step Content */}
              <div className="space-y-3">
                <p className={`font-body text-foreground leading-relaxed ${
                  completedSteps?.[index] ? 'line-through opacity-60' : ''
                }`}>
                  {step?.instruction}
                </p>

                {/* Step Image */}
                {step?.image && (
                  <div className="w-full max-w-md">
                    <Image
                      src={step?.image}
                      alt={`Step ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Timer */}
                {step?.timer && (
                  <TimerComponent stepIndex={index} duration={step?.timer} />
                )}

                {/* Tips */}
                {step?.tip && (
                  <div className="p-3 bg-accent/20 rounded-lg border-l-4 border-accent">
                    <div className="flex items-start space-x-2">
                      <Icon name="Lightbulb" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground italic">
                        <strong>Tip:</strong> {step?.tip}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Step Actions */}
              <div className="flex items-center justify-between">
                <Button
                  variant={completedSteps?.[index] ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleStepComplete(index, !completedSteps?.[index])}
                  iconName={completedSteps?.[index] ? "RotateCcw" : "Check"}
                  iconPosition="left"
                >
                  {completedSteps?.[index] ? 'Mark Incomplete' : 'Mark Complete'}
                </Button>

                {step?.temperature && (
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Icon name="Thermometer" size={14} />
                    <span className="font-mono">{step?.temperature}°F</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Progress Summary */}
      <div className="mt-8 p-4 bg-accent/20 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-muted-foreground">
            Progress: {Object.values(completedSteps)?.filter(Boolean)?.length} of {instructions?.length} steps completed
          </span>
          <div className="w-32 bg-muted rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(Object.values(completedSteps)?.filter(Boolean)?.length / instructions?.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsTab;