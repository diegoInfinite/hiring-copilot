## Estructura de carpetas

    ai-service/
    app/
        __init__.py
        main.py

        api/
        __init__.py
        v1/
            __init__.py
            routes_evaluation.py   # score + feedback del candidato
            routes_questions.py    # preguntas de entrevista
            routes_assessments.py  # assessment / tarea técnica
            routes_health.py       # health checks

        core/
        __init__.py
        config.py
        logging_config.py
        errors.py

        models/
        __init__.py
        schemas_evaluation.py    # Requests/responses del modelo 1
        schemas_questions.py     # Requests/responses del modelo 2
        schemas_assessments.py   # Requests/responses del modelo 3
        domain.py                # Modelos internos compartidos (JobKeyInfo, CvKeyInfo, etc.)

        services/
        __init__.py

        # --- servicios compartidos (extracción, matching, etc.) ---
        job_posting_extractor.py
        cv_extractor.py
        matching_service.py
        scoring_service.py
        feedback_service.py

        # --- pipelines específicos de cada "modelo" ---
        evaluation_pipeline.py   # orquesta: extraer + match + score + feedback
        questions_service.py     # genera preguntas de entrevista
        assessments_service.py   # genera assessment / tarea anti-AI

        # --- clientes LLM (uno por modelo o uno genérico configurable) ---
        llm_evaluation_client.py # modelo usado para scoring/feedback
        llm_questions_client.py  # modelo usado para preguntas
        llm_assessments_client.py# modelo usado para assessments

        utils/
        __init__.py
        text_cleaning.py
        pdf_reader.py
        docx_reader.py