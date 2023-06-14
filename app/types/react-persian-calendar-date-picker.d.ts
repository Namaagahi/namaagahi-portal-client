declare module 'react-persian-calendar-date-picker' {
    import { Moment } from 'moment';
  
    interface DatePickerProps {
      value?: Moment;
      onChange?: (date: Moment) => void;
      inputPlaceholder?: string;
      shouldHighlightWeekends?: boolean;
      className?: string;
    }
  
    const DatePicker: React.FC<DatePickerProps>;
  
    export default DatePicker;
  }