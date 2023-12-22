import PropTypes from 'prop-types';
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Textarea } from '@material-tailwind/react';

const CreateNewOrgDialog = ({ openState, handleOpen }) => {

	CreateNewOrgDialog.propTypes = {
		openState: PropTypes.bool.isRequired,
		handleOpen: PropTypes.func.isRequired
	};

  return (
    <Dialog
        size="xs"
        open={openState}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
			<Card className="mx-auto w-full max-w-[24rem]">
				<CardBody className="flex flex-col gap-4">
					<Typography variant="h4" color="blue-gray">
						Create Organization
					</Typography>
					<Typography
						className="mb-3 font-normal"
						variant="paragraph"
						color="gray"
					>
						Enter Organization Details.
					</Typography>
					<Input label="Organization Name" size="lg" />
					<Input label="Email" size="lg" />
					<Input label="Password" size="lg" />
					<Textarea label="Organization Description" size="lg" />
				</CardBody>
				<CardFooter className="pt-0">
					<Button variant="gradient" onClick={handleOpen} fullWidth>
						Submit
					</Button>
				</CardFooter>
			</Card>
		</Dialog>
  )
}

export default CreateNewOrgDialog;