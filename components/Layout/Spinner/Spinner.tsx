import classes from './Spinner.module.css'

interface SpinnerPropTypes {
    relative?: boolean
}

const Spinner = ({ relative }: SpinnerPropTypes) => (
  <div className={relative ? classes.SpinnerRelative : classes.Spinner}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
)

Spinner.defaultProps = {
  relative: false,
}

export default Spinner
