import { RoomInfoType } from '@/types';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { FC, PropsWithChildren } from 'react';

type InfoDialogProps = {
  type: RoomInfoType;
  handleClose: () => void;
};

const InfoDialog: FC<PropsWithChildren<InfoDialogProps>> = ({
  children,
  handleClose,
  type
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Dialog fullScreen={fullScreen} open={!!type} onClose={handleClose}>
      <DialogTitle>
        {type === 'chat' ? 'In-call messages' : null}
        {type === 'details' ? 'Meeting details' : null}
        {type === 'people' ? 'People' : null}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500]
        })}
        title="close"
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box sx={{ width: 'full' }}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
