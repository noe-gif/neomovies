import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { _mock } from 'src/_mock';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function FaqsList() {
  const _faqs = [...Array(8)].map((_, index) => ({
    id: _mock.id(index),
    value: `panel${index + 1}`,
    heading: `Questions ${index + 1}`,
    detail: _mock.description(index),
  }));
  return (
    <div>
      {_faqs.map((accordion) => (
        <Accordion key={accordion.id}>
          <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
