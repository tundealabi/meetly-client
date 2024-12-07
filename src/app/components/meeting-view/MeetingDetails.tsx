import { Box, Chip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import { FC, useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';

type MeetingDetailsProps = {
  roomId: string;
};

const MeetingDetails: FC<MeetingDetailsProps> = ({ roomId }) => {
  const [showToast, setShowToast] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();
  const textToCopy = `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${roomId}`;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography>Joining info</Typography>
      <Typography>{textToCopy}</Typography>
      <Chip
        icon={<ContentCopyIcon />}
        label="Copy joining info"
        onClick={() => {
          copyToClipboard(textToCopy).then((success) => {
            if (success) {
              setShowToast(true);
            } else {
              console.error('Failed to copy text to clipboard.');
            }
          });
        }}
        sx={{ alignSelf: 'flex-start', p: 2 }}
      />
      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
        message="Copied meeting link."
      />
    </Box>
  );
};

export default MeetingDetails;
