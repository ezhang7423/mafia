import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    type:'light',
    primary: teal,
    secondary: red,
  },
  status: {
    danger: 'orange',
  },
});
theme.typography.h5 = {
    fontWeight: "600",
    fontSize:"1.5rem"
}
export default theme;