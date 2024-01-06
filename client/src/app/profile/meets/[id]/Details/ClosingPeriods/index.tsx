import { ClosingPeriod } from '@/interfaces/meet';
import { Box } from '@chakra-ui/react';
import { FC, useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';
import PeriodInput from './Period';
interface Step3Props {
  values: ClosingPeriod[];
}

const ClosingPeriods: FC<Step3Props> = ({ values }) => {
  const [periods, setPeriods] = useState<ClosingPeriod[]>([]);

  useEffect(() => {
    if (values && values.length > 0) {
      console.log('asd', values);
      setPeriods(values);
    }
  }, [values]);

  const handleAddPeriod = (period: ClosingPeriod) => {
    const periodToAdd = {
      ...period,
      id: uuid(),
    };
    setPeriods((prev) => [...prev, periodToAdd]);
  };

  const hanleEditPeriod = (id: string, period: ClosingPeriod) => {
    setPeriods((prev) => prev.map((p) => (p.id === id ? period : p)));
  };

  const handleRemovePeriod = async (id: string) => {
    setPeriods((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <PeriodInput onAdd={handleAddPeriod} />
      {periods.length > 0 && (
        <Accordion mt={5} defaultIndex={[0]} allowMultiple>
          {periods.map((period: ClosingPeriod, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton borderRadius="10px" _expanded={{ bg: 'primary.500', color: 'white' }}>
                  <Box as="span" flex="1" textAlign="left">
                    {period.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <PeriodInput id={period.id} values={period} onEdit={hanleEditPeriod} onRemove={handleRemovePeriod} />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default ClosingPeriods;
